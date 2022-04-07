import client from "../../client";

export default {
	Query: {
		seeCategories: async (_, {lastId}) => {
			const categories = await client.category.findMany({
				take: 5,
				skip: lastId ? 1 : 0,
				...(lastId && {cursor: {id: lastId}})
			});
			return categories
		}
	}
};