import client from "../client";

export default {
  User: {
    followings: ({id}, {lastId}) =>
      client.user.findMany({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && {cursor: {id: lastId}})
      }),

    followers: ({id}, {lastId}) =>
      client.user.findMany({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && {cursor: {id: lastId}})
      }),

    // 자신을 팔로우 중인 인원을 리턴
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    // 자신이 팔로우 중인 인원을 리턴
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    // 현재 유저가 자신인지 아닌지 리턴
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    // 현재 유저가 자신이 팔로우 중인지 아닌지 리턴
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
    coffeeShops: ({id}) => client.user.findUnique({where: {id}}).coffeeshops()
  },
};
