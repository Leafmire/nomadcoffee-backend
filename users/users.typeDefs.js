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
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    createdAt:  String!
    updatedAt:  String!
  }
`;