import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

async function authorRoutes(app: FastifyInstance<Server, IncomingMessage, ServerResponse>, options: any) {
    app.get("/authors", async (req, res) => {
        const { graphiqlString } = req.body as unknown as { graphiqlString: string };
        return res.graphql(graphiqlString);
    });

    app.get("/author", async (req, res) => {
        const { graphiqlString } = req.body as unknown as { graphiqlString: string };
        return res.graphql(graphiqlString);
    });
    app.post("/authors", async (req, res) => {
        const { graphiqlString } = req.body as unknown as { graphiqlString: string };
        return res.graphql(graphiqlString);
    });
}

export default authorRoutes;
