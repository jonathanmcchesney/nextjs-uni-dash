import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { schema } from "../../../lib/graphql";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "../../../lib/mongodb/mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "fake-secret-key";

const server = new ApolloServer({
  schema,
  introspection: process.env.NODE_ENV !== "production",
  plugins: [
    process.env.NODE_ENV !== "production"
      ? ApolloServerPluginLandingPageLocalDefault({ embed: true })
      : ApolloServerPluginLandingPageProductionDefault(),
  ],
});

let serverHandler: any;

async function initServer() {
  // we cache the server when running in dev or production, but don't cache when testing, for easier unit testing
  if (!serverHandler || process.env.NODE_ENV === "test") {
    serverHandler = startServerAndCreateNextHandler(server, {
      context: async () => {
        // Connect to MongoDB
        await dbConnect();

        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value || null;

        let user = null;

        if (token) {
          try {
            user = jwt.verify(token, JWT_SECRET);
          } catch (error) {
            if (error instanceof Error) {
              console.error("Invalid token:", error.message);
            } else {
              console.error("Unknown error during token verification");
            }
          }
        }

        return { user };
      },
    });
  }
  return serverHandler;
}

// Handler for GET requests (Apollo Playground or introspection)
export const GET = async (req: any, res: any) => {
  const handler = await initServer();
  return handler(req, res);
};

// Handler for POST requests (GraphQL query operations)
export const POST = async (req: any, res: any) => {
  const handler = await initServer();
  return handler(req, res);
};
