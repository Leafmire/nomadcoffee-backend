import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
	  username: String!
	  email: String!
    name: String!
    location: String
    avatarURL: String
    githubUsername: String
    coffeeShops: [CoffeeShop]
    followings(lastId: Int): [User]
    followers(lastId: Int): [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    createdAt:  String!
    updatedAt:  String!
  }
`;