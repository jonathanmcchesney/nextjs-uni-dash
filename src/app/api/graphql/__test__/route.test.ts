import { ApolloServer } from "@apollo/server";
import { createMocks } from "node-mocks-http";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { GET, POST } from "../route";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

jest.mock("@as-integrations/next", () => ({
  startServerAndCreateNextHandler: jest.fn(),
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

describe("GraphQL API Route", () => {
  let mockHandler: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    mockHandler = jest.fn((req, res) =>
      res.status(200).json({ data: "mock response" })
    );

    (startServerAndCreateNextHandler as jest.Mock).mockResolvedValue(
      mockHandler
    );
  });

  it("should handle GET requests successfully (Apollo Playground)", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await GET(req, res);

    expect(startServerAndCreateNextHandler).toHaveBeenCalledWith(
      expect.any(ApolloServer),
      expect.objectContaining({ context: expect.any(Function) })
    );

    expect(mockHandler).toHaveBeenCalledWith(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual(JSON.stringify({ data: "mock response" }));
  });

  it("should handle POST requests successfully (GraphQL query)", async () => {
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

    expect(startServerAndCreateNextHandler).toHaveBeenCalledWith(
      expect.any(ApolloServer),
      expect.objectContaining({ context: expect.any(Function) })
    );

    expect(mockHandler).toHaveBeenCalledWith(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual(JSON.stringify({ data: "mock response" }));
  });

  it("should extract a valid JWT token from cookies and set user in context", async () => {
    (cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue({ value: "valid-token" }),
    });

    (jwt.verify as jest.Mock).mockReturnValue({
      id: "user-1",
      name: "John Doe",
    });

    const { req, res } = createMocks({ method: "POST" });

    await POST(req, res);

    const contextFunction = (startServerAndCreateNextHandler as jest.Mock).mock
      .calls[0][1].context;
    const context = await contextFunction();

    expect(cookies).toHaveBeenCalled();
    expect(jwt.verify).toHaveBeenCalledWith("valid-token", expect.any(String));
    expect(context.user).toEqual({ id: "user-1", name: "John Doe" });
  });

  it("should handle an invalid JWT token", async () => {
    (cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue({ value: "invalid-token" }),
    });

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    const { req, res } = createMocks({ method: "POST" });

    await POST(req, res);

    const contextFunction = (startServerAndCreateNextHandler as jest.Mock).mock
      .calls[0][1].context;
    const context = await contextFunction();

    expect(cookies).toHaveBeenCalled();
    expect(jwt.verify).toHaveBeenCalledWith(
      "invalid-token",
      expect.any(String)
    );
    expect(context.user).toBeNull();
  });

  it("should return no user in context if no token is provided", async () => {
    (cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    const { req, res } = createMocks({ method: "POST" });

    await POST(req, res);

    const contextFunction = (startServerAndCreateNextHandler as jest.Mock).mock
      .calls[0][1].context;
    const context = await contextFunction();

    expect(cookies).toHaveBeenCalled();
    expect(context.user).toBeNull();
  });
});
