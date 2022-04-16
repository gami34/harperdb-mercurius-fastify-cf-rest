import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { AuthorResolvers, AuthorType } from "./author/author.schema";
import { BookResolvers, BookType } from "./book/book.schema";
import { authorsdata } from "../seed";

const RootEntry = makeExecutableSchema({
    // Merge type definitions from different sources
    typeDefs: mergeTypeDefs([BookType, AuthorType]),
    // Merge resolvers from different sources
    resolvers: mergeResolvers([AuthorResolvers, BookResolvers]),
});

export default RootEntry;
