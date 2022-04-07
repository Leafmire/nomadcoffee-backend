import fs from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { GraphQLUpload } from "graphql-upload";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Upload: GraphQLUpload,

  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          username,
          email,
          name,
          location,
          githubUsername,
          avatarURL,
          password: newPassword,
        },
        { loggedInUser }
      ) => {
        let avatarUrl = null;
        if (avatarURL) {
          avatarUrl = await uploadToS3(avatarURL, loggedInUser.id, "avatars");
        }
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            name,
            username,
            email,
            location,
            githubUsername,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatarUrl && { avatarURL: avatarUrl }),
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update profile",
          };
        }
      }
    ),
  },
};
