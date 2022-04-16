import { gql } from "mercurius-codegen";
import { app } from "../index";
import * as request from "supertest";

describe(`Integration`, () => {
    const successResponse = (response: object): { data: object } => ({ data: response });

    beforeEach(async () => {
        await app.ready();
    });

    /**
     * GraphQL Query and Mutation: author(...)
     */
    describe(`Query author(...)`, () => {
        it(`Should return correct response`, async () => {
            const query = gql`
                query {
                    authors(pgSize: 1) {
                        name
                        genre
                        author {
                            name
                        }
                    }
                }
            `;
            const expectedResponse = successResponse({ authors: [] });

            await request(app.server)
                .post("/playground")
                .send({
                    query,
                })
                .expect(200, expectedResponse);
        });
    });

    /**
     * GraphQL Query and Mutation:  book(...)
     */
    describe(`Query books(...)`, () => {
        it(`Should return correct response`, async () => {
            const query = gql`
                query {
                    books(pgSize: 1) {
                        name
                        genre
                        author {
                            name
                        }
                    }
                }
            `;
            const expectedResponse = successResponse({ sub: 1 });

            await request(app.server)
                .post("/playground")
                .send({
                    query,
                })
                .expect(200, expectedResponse);
        });
    });
});
