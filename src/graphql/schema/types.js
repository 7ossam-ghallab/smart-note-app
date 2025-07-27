/**
 * @fileoverview Defines GraphQL object types for User, Note, and PaginatedNotes in the Smart Note App.
 */

import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList, GraphQLInt } from "graphql";

/**
 * @constant {GraphQLObjectType} UserType - GraphQL type for representing a user.
 * @description Defines the structure of a User object in GraphQL queries.
 * @field {GraphQLID} _id - The unique ID of the user.
 * @field {GraphQLString} name - The user's name.
 * @field {GraphQLString} email - The user's email address.
 */
export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

/**
 * @constant {GraphQLObjectType} NoteType - GraphQL type for representing a note.
 * @description Defines the structure of a Note object in GraphQL queries.
 * @field {GraphQLID} _id - The unique ID of the note.
 * @field {GraphQLString} title - The title of the note.
 * @field {GraphQLString} content - The content of the note.
 * @field {GraphQLString} createdAt - The creation date of the note.
 * @field {UserType} ownerId - The user who owns the note.
 */
export const NoteType = new GraphQLObjectType({
  name: "Note",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    ownerId: { type: UserType },
  }),
});

/**
 * @constant {GraphQLObjectType} PaginatedNotesType - GraphQL type for representing a paginated list of notes.
 * @description Defines the structure for paginated note query results.
 * @field {GraphQLList<NoteType>} notes - Array of notes.
 * @field {GraphQLInt} totalCount - Total number of notes matching the query.
 * @field {GraphQLInt} currentPage - Current page number.
 * @field {GraphQLInt} totalPages - Total number of pages.
 */
export const PaginatedNotesType = new GraphQLObjectType({
  name: "PaginatedNotes",
  fields: () => ({
    notes: { type: new GraphQLList(NoteType) },
    totalCount: { type: GraphQLInt },
    currentPage: { type: GraphQLInt },
    totalPages: { type: GraphQLInt },
  }),
});