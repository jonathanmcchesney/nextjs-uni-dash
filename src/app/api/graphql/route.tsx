import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { ApolloServer } from "@apollo/server";
import { schema } from "../../../lib/graphql";

import { startServerAndCreateNextHandler } from "@as-integrations/next";

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
  if (!serverHandler) {
    serverHandler = startServerAndCreateNextHandler(server);
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
