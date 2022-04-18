import fastify, { FastifyInstance } from "fastify";
import { ExecutionResult } from "graphql";
import { Server, IncomingMessage, ServerResponse } from "http";
import mercurius from "mercurius";
import schema from "./features";
import LibraryModel from "./features/library.model";
import fastifyEnv from "fastify-env";
import authorRoutes from "./features/author/author.service";
import bookRoutes from "./features/book/book.service";

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: false });

const options = {
    dotenv: {
        path: `${__dirname}/.env`,
        debug: true,
    },
    schema: {
        type: "object",
        required: ["HARPER_API_URI", "HARPER_API_KEY"],
        properties: {
            HARPER_API_URI: {
                type: "string",
            },
            HARPER_API_KEY: {
                type: "string",
            },
        },
    },
};

app.register(fastifyEnv, options).ready((err) => {
    if (err) console.error("you need to setup your HarperDB environmental variable, see format on the .env.exmaple file");
});

function errorFormatter(err: ExecutionResult<{ [key: string]: any }, { [key: string]: any }>, ctx: any) {
    const response = mercurius.defaultErrorFormatter(err, ctx);
    response.statusCode = 200;
    return response;
}

app.register(mercurius, {
    schema,
    errorFormatter,
    graphiql: "playground",
    federationMetadata: true,
});

// register the routes for API calls
app.register(authorRoutes);
app.register(bookRoutes);

const port = process.env.PORT || 8080;

const start = async (): Promise<void> => {
    try {
        await app.listen(port, "0.0.0.0");
        await LibraryModel.setupDB();
        console.log(`Listening on port ${port}`);
    } catch (err: any) {
        app.log.error(err);
        process.exit(1);
    }
};

start();

export { app };
