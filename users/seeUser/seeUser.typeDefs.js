import { gql } from "apollo-server-express";

export default gql `
    type SeeFollowingsResult {
        ok: Boolean!
        error: String
        following: [User]
    }

    type SeeFollowersResult {
        ok: Boolean!
        error: String
        followers: [User]
        totalPages: Int
    }

    type Query {
        seeFollowing(username: String!, lastId: Int): SeeFollowingsResult
		seeFollowers(username: String!, page: Int!): SeeFollowersResult
    }
`