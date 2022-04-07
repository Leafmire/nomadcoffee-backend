import { gql } from "apollo-server-express";

export default gql`
  type Query {
	seeCategories(lastId: Int): [Category]
  }
`;