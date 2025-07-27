/**
 * @fileoverview Defines the root query for GraphQL in the Smart Note App, specifying available queries.
 */

import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from "graphql";
import { PaginatedNotesType } from "./types.js";
import { getNotes } from "../resolvers/note.resolver.js";

/**
 * @constant {GraphQLObjectType} RootQuery - The root query type for GraphQL queries.
 * @description Defines the entry point for querying notes with filtering and pagination.
 * @field {PaginatedNotesType} notes - Query to retrieve paginated notes with optional filters.
 */
export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    /**
     * @field notes
     * @description Retrieves a paginated list of notes based on provided filters.
     * @type {PaginatedNotesType}
     * @args {Object} args - Arguments for filtering and pagination.
     * @args {string} args.userId - Optional user ID to filter notes by owner.
     * @args {string} args.title - Optional title to filter notes (partial match, case-insensitive).
     * @args {string} args.from - Optional start date for filtering by creation date.
     * @args {string} args.to - Optional end date for filtering by creation date.
     * @args {number} args.page - Page number for pagination (optional).
     * @args {number} args.limit - Number of notes per page (optional).
     * @resolve {Function} Calls getNotes resolver to fetch the notes.
     */
    notes: {
      type: PaginatedNotesType,
      args: {
        userId: { type: GraphQLString },
        title: { type: GraphQLString },
        from: { type: GraphQLString },
        to: { type: GraphQLString },
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
      resolve: (_, args) => getNotes(args),
    },
  },
});