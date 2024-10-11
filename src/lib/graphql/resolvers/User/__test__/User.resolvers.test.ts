import { v4 as uuidv4 } from "uuid";
import { resolvers as userResolvers } from "../User.resolvers";
import { users } from "../../__data__/user.mocks";

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

describe("User Resolvers", () => {
  const mockUsers = [
    {
      id: "d47ffe3f-3b5a-430c-88a5-d4bcf4c875f1",
      name: "John Doe",
      email: "john@example.com",
      age: 25,
      major: "Computer Science",
      universityId: "u123",
    },
    {
      id: "d47ffe3f-3b5a-430c-88a5-d4bcf4c875f2",
      name: "Jane Smith",
      email: "jane@example.com",
      age: 30,
      major: "Mathematics",
      universityId: "u124",
    },
  ];

  beforeEach(() => {
    users.length = 0;
    users.push(...mockUsers);
  });

  it("should fetch all users", () => {
    const result = userResolvers.Query.getUsers();
    expect(result).toEqual(mockUsers);
  });

  it("should fetch a user by id", () => {
    const result = userResolvers.Query.getUser(null, {
      id: "d47ffe3f-3b5a-430c-88a5-d4bcf4c875f1",
    });
    expect(result).toEqual(mockUsers[0]);
  });

  it("should create a new user", () => {
    (uuidv4 as jest.Mock).mockReturnValue("mocked-uuid-value");

    const result = userResolvers.Mutation.createUser(null, {
      name: "Alice",
      email: "alice@example.com",
      age: 22,
      major: "Physics",
      universityId: "u125",
    });

    expect(result).toEqual({
      id: "mocked-uuid-value",
      name: "Alice",
      email: "alice@example.com",
      age: 22,
      major: "Physics",
      universityId: "u125",
    });

    expect(users.length).toBe(3);
  });

  it("should update an existing user", () => {
    const updatedUser = userResolvers.Mutation.updateUser(null, {
      id: "d47ffe3f-3b5a-430c-88a5-d4bcf4c875f1",
      name: "John Updated",
      email: "john_updated@example.com",
      age: 26,
      major: "Data Science",
      universityId: "u126",
    });

    expect(updatedUser).toEqual({
      id: "d47ffe3f-3b5a-430c-88a5-d4bcf4c875f1",
      name: "John Updated",
      email: "john_updated@example.com",
      age: 26,
      major: "Data Science",
      universityId: "u126",
    });

    const result = userResolvers.Query.getUser(null, {
      id: "d47ffe3f-3b5a-430c-88a5-d4bcf4c875f1",
    });
    expect(result).toEqual(updatedUser);
  });

  it("should delete a user by id", () => {
    const result = userResolvers.Mutation.deleteUser(null, {
      id: "d47ffe3f-3b5a-430c-88a5-d4bcf4c875f1",
    });

    expect(result).toEqual(mockUsers[0]);
    expect(users.length).toBe(1);
  });
});
