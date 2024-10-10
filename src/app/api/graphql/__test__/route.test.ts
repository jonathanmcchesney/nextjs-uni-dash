import { ApolloServer } from "@apollo/server";
import { createMocks } from "node-mocks-http";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { GET, POST } from "../route";

jest.mock("@as-integrations/next", () => ({
  startServerAndCreateNextHandler: jest.fn(),
}));

describe("GraphQL API Route", () => {
  let mockHandler: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    jest.resetModules();

    mockHandler = jest.fn((req, res) =>
      res.status(200).json({ data: "mock response" })
    );

    (startServerAndCreateNextHandler as jest.Mock).mockResolvedValue(
      mockHandler
    );
  });

  it("should handle GET requests successfully", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await GET(req, res);

    expect(startServerAndCreateNextHandler).toHaveBeenCalledWith(
      expect.any(ApolloServer)
    );

    expect(mockHandler).toHaveBeenCalledWith(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual(JSON.stringify({ data: "mock response" }));
  });

  it("should handle POST requests successfully", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        query: `
          query {
            getUsers {
              id
              name
            }
          }
        `,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    await POST(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual(JSON.stringify({ data: "mock response" }));
  });
});
