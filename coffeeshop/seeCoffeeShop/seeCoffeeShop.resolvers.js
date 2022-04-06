import client from "../../client";

export default {
	Query: {
		seeCoffeeShop: async (_, {id}) => {
			const coffeeShop = await client.coffeeShop.findUnique({
				where:{
					id
				}
			});
			return coffeeShop
		}
	}
}