import fs from "fs";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { GraphQLUpload } from "graphql-upload";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
	Upload: GraphQLUpload,

	Mutation: {
		createCoffeeShop: protectedResolver(
			async (
				_,
				{
					name,
					latitude,
					longitude,
					photo,
					category
				},
				{ loggedInUser }
			) => {
				// 카테고리 파싱
				let categoryObj = [];
				const categories = category.match(/#[\w]+/g);
				categoryObj = categories.map((category) => ({
					where: { name:category },
					create: { 
						name:category,
						slug:category
					 },
				}));

				// 카페 사진 업로드
				let photoUrls = [];
				let photoObj = [];
				for (let index = 0; index < photo.length; index++) {
					const url = await uploadToS3(photo[index], loggedInUser.id, "photos")
					photoUrls.push(url);
				}
				photoObj = photoUrls.map((photo) => ({
					where: { url:photo },
					create: { 
						url:photo,
					 }
				}));

				const createdCoffeeShop = await client.coffeeShop.create({
					data: {
						name,
						latitude,
						longitude,
						user: {
							connect: {
							  id: loggedInUser.id,
							},
						},
						photos: {
							connectOrCreate: photoObj,
						},
						categories: {
							connectOrCreate: categoryObj,
						}
					},
				});

				if (createdCoffeeShop.id) {
					return {
						ok: true,
					};
				} else {
					return {
						ok: false,
						error: "Can not create.",
					};
				}
			}
		),
	},
};
