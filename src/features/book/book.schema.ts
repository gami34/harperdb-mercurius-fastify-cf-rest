import { gql } from "mercurius-codegen";
import { authorsdata, booksdata } from "../../seed";
import AuthorModel from "../author/author.model";
import BookModel from "./book.model";

/**
 * Type Definitions
 */
export const BookType = gql`
    type Query {
        books(pgNumber: Int, pgSize: Int): [Book]
        book(id: ID!): Book
    }

    type Mutation {
        addBook(name: String!, genre: String!, authorId: ID!): Book!
    }

    type Book {
        id: ID!
        name: String!
        genre: String!
        author: Author
    }
`;

// instance of the book model

const bookInstance = new BookModel();
const authorInstance = new AuthorModel();
export const BookResolvers = {
    Query: {
        books(_: any, { pgNumber, pgSize }: any) {
            // it has pgsize and pagenumber parameter : Paginator
            return bookInstance.find({ pgNumber, pgSize });
        },
        book: (_parent: any, { id }: any) => {
            return bookInstance.findOne({ id });
        },
    },
    Mutation: {
        async addBook(_: any, { name, genre, authorId }: any) {
            return bookInstance.save({ name, genre, authorId });
        },
    },
    Book: {
        async author(user: { authorId: any }) {
            return authorInstance.findOne({ id: user.authorId });
            // return authorInstance.find((item) => item.id === user.authorId);
        },
    },
};
