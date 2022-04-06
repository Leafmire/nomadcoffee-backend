import client from "../client";

export default {
  CoffeeShop: {
    user: ({ userId }) =>
      client.user.findUnique({
        where: {
          id: userId
        }
      }),
    categories: ({ id }) =>
      client.category.findMany({
        where: {
          shops: {
            some: {
              id,
            }
          }
        }
      }),
    photos: ({ id }) =>
      client.coffeeShopPhoto.findMany({
        where: {
          coffeeShopId: id
        }
      }),
  },

  Category: {
    shops: ({ id }, {lastId}) =>
      client.coffeeShop.findMany({
        where: {
          categories: {
            some: {
              id
            }
          }
        },
        take: 5,
        skip: lastId ? 1:0,
        ...(lastId && {cursor: {id: lastId}}),
      }),
    totalShops: ({ id }) =>
      client.coffeeShop.count({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      })
  },
};