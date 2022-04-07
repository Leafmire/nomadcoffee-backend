import fs from "fs";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { GraphQLUpload } from "graphql-upload";
import { uploadToS3, delPhotoS3 } from "../../shared/shared.utils";

export default {
	Upload: GraphQLUpload,

	Mutation: {
		editCoffeeShop: protectedResolver(
			async (
				_,
				{
					id,
					name,
					latitude,
					longitude,
					photo,
					category
				},
				{ loggedInUser }
			) => {
				const oldCoffeeShop = await client.coffeeShop.findFirst({
					where: {
						id
					},
					include: {
						categories: {
							select: {
								name: true,
							}
						}
					}
				});
				if (!oldCoffeeShop) {
					return {
						ok: false,
						error: "Coffeeshop not found."
					}
				}

				// 카테고리 파싱
				let categoryObj = [];
				if (category) {
					const categories = category.match(/#[\w]+/g);
					categoryObj = categories.map((category) => ({
						where: { name:category },
						create: { 
							name:category,
							slug:category
						},
					}));
				}

				// 카페 사진 업로드
				let photoUrls = [];
				let photoObj = [];
				if (photo) {
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
				}

				const updatedCoffeeShop = await client.coffeeShop.update({
					where:{ id },
					data: {
						name,
						latitude,
						longitude,
						photos: {
							connectOrCreate: photoObj,
						},
						categories: {
							disconnect: oldCoffeeShop.categories,
							connectOrCreate: categoryObj,
						}
					},
				});

				if (updatedCoffeeShop.id) {
					return {
						ok: true,
					};
				} else {
					return {
						ok: false,
						error: "Can not update.",
					};
				}
			}
		),
	},
};
