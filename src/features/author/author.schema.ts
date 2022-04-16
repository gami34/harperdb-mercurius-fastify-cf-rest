import { gql } from "mercurius-codegen";
import { authorsdata, booksdata } from "../../seed";
import AuthorModel from "./author.model";
import BookModel from "../book/book.model";

/**
 * Type Definitions
 */
export const AuthorType = gql`
    type Author {
        id: ID!
        name: String!
        age: Int!
        books: [Book]
    }

    type Query {
        authors(pgNumber: Int, pgSize: Int): [Author]
        author(id: ID!): Author
    }

    type Mutation {
        addAuthor(name: String!, age: Int!): Author!
    }
`;

const authorInstance = new AuthorModel();
const bookInstance = new BookModel();

export const AuthorResolvers = {
    Query: {
        authors(_: any, { pgNumber, pgSize }: any) {
            return authorInstance.find({ pgNumber, pgSize });
        },
        author: (_parent: any, { id }: any) => {
            return authorInstance.findOne({ id });
        },
    },
    Author: {
        async books(user: { id: any }) {
            return bookInstance.find({ condition: `authorId = ${user.id}` });
        },
    },
    Mutation: {
        async addAuthor(user: any, { name, age }: { name: string; age: number }) {
            return authorInstance.save({ name, age });
        },
    },
};
