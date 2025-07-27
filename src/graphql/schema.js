/**
 * @fileoverview Defines the GraphQL schema for the Smart Note App, specifying the root query.
 */

import { GraphQLSchema } from "graphql";
import { RootQuery } from "./schema/queries.js";

/**
 * @constant {GraphQLSchema} schema - The GraphQL schema instance for the application.
 * @description Defines the schema with the root query type for handling GraphQL requests.
 */
export const schema = new GraphQLSchema({
  query: RootQuery,
});