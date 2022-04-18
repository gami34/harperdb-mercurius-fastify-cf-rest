import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

async function bookRoutes(app: FastifyInstance<Server, IncomingMessage, ServerResponse>, options: any) {
    app.get("/books", async (req, res) => {
        const { graphiqlString } = req.body as unknown as { graphiqlString: string };
        return res.graphql(graphiqlString);
    });

    app.get("/book", async (req, res) => {
        const { graphiqlString } = req.body as unknown as { graphiqlString: string };
        return res.graphql(graphiqlString);
    });
    app.post("/book", async (req, res) => {
        const { graphiqlString } = req.body as unknown as { graphiqlString: string };
        return res.graphql(graphiqlString);
    });
    app.patch("/book", async (req, res) => {
        const { graphiqlString } = req.body as unknown as { graphiqlString: string };
        return res.graphql(graphiqlString);
    });
    app.delete("/book", async (req, res) => {
        const { graphiqlString } = req.body as unknown as { graphiqlString: string };
        return res.graphql(graphiqlString);
    });
}

export default bookRoutes;
