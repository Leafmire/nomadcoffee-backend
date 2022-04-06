import { gql } from "apollo-server-express";

export default gql`
  scalar Upload

  type Mutation {
	createCoffeeShop(
    	name:       String!
    	latitude:   String!
    	longitude:  String!
		photo:		[Upload]!
		category:	String!
    ): MutationResponse!
  }
`;