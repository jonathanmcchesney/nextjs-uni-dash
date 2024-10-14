import { POST } from "../route";
import { initializeApollo } from "../../../../../lib/apollo/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("../../../../../lib/apollo/client", () => ({
  initializeApollo: jest.fn(),
}));

jest.mock("bcrypt");
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(() => {
      const res = {
        cookies: {
          set: jest.fn(),
        },
      };
      return res;
    }),
  },
}));

describe("POST handler", () => {
  const mockUsers = [
    { email: "john@example.com" },
    { email: "jane@example.com" },
  ];

  const mockApolloClient = {
    query: jest
      .fn()
      .mockResolvedValue({ data: { getUsersForAuth: mockUsers } }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (initializeApollo as jest.Mock).mockReturnValue(mockApolloClient);
  });
  const mockNextRequest = (body: any = {}) => {
    return {
      method: "POST",
      json: jest.fn().mockResolvedValue(body),
    } as any;
  };

  it("should return success and set a token if valid credentials are provided", async () => {
    const req = mockNextRequest({
      email: "john@example.com",
      password: "john@example.com",
    });

    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed-password");
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("mock-token");

    await POST(req);

    expect(initializeApollo).toHaveBeenCalled();
    expect(mockApolloClient.query).toHaveBeenCalledWith({
      query: expect.any(Object),
    });

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "john@example.com",
      expect.any(String)
    );
    expect(jwt.sign).toHaveBeenCalledWith(
      { email: "john@example.com" },
      process.env.JWT_SECRET || "fake-secret-key",
      { expiresIn: "1h" }
    );
  });
});
