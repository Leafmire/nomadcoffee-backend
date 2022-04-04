import { gql } from "apollo-server-express";

export default gql`
  scalar Upload

  type Mutation {
    editProfile(
      username: String
      email: String
      name:String
      password: String
      location: String
      avatarURL: String
      githubUsername: String
    ): MutationResponse!
  }
`;
