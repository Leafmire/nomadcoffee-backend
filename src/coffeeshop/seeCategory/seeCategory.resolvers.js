import client from "../../client";

export default {
	Query: {
		seeCategory: async (_, {name}) => {
			const category = await client.category.findUnique({
				where:{
					name
				}
			});
			return category
		}
	}
}