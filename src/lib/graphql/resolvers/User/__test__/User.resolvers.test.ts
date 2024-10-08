import { resolvers as userResolvers } from "../User.resolvers.ts";
import { v4 as uuidv4 } from "uuid";

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

describe("User Resolvers", () => {
  test("should fetch all users", () => {
    const result = userResolvers.Query.getUsers();
    expect(result).toEqual([
      {
        id: "d47ffe3f-3b5a-430c-88a5-d4bcf4c875f1",
        name: "John Doe",
        email: "john@example.com",
        age: 25,
      },
      {
        id: "d47ffe3f-3b5a-430c-88a5-d4bcf4c875f2",
        name: "Jane Smith",
        email: "jane@example.com",
        age: 30,
      },
    ]);
  });

  test("should fetch a user by id", () => {
    const result = userResolvers.Query.getUser(null, {
      id: "d47ffe3f-3b5a-430c-88a5-d4bcf4c875f1",
    });
    expect(result).toEqual({
      id: "d47ffe3f-3b5a-430c-88a5-d4bcf4c875f1",
      name: "John Doe",
      email: "john@example.com",
      age: 25,
    });
  });

  test("should create a new user", () => {
    (uuidv4 as jest.Mock).mockReturnValue("mocked-uuid-value");

    const result = userResolvers.Mutation.createUser(null, {
      name: "Alice",
      email: "alice@example.com",
      age: 22,
    });
    expect(result).toEqual({
      id: "mocked-uuid-value",
      name: "Alice",
      email: "alice@example.com",
      age: 22,
    });
  });
});
