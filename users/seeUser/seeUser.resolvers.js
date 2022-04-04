import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
        const ok = await client.user.findUnique({where:{username}, select: {id: true}});
        if(!ok) {
            return {
                ok: false,
                error: "That user does not exist. Check the username"
            }
        }
        const following = await client.user
        .findUnique({ where: { username } })
        .following({
            take: 5,
            skip: lastId ? 1 : 0,
            ...(lastId && {cursor: {id: lastId}})
        });
        return {
            ok: true,
            following,
        }
    },
	seeFollowers: async (_, { username, lastId }) => {
        const ok = await client.user.findUnique({where:{username}, select: {id: true}});
        if(!ok) {
            return {
                ok: false,
                error: "That user does not exist. Check the username"
            }
        }
        const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
            take: 5,
            skip: lastId ? 1 : 0,
            ...(lastId && {cursor: {id: lastId}})
        });
        return {
            ok: true,
            followers,
        }
    },
  },
};