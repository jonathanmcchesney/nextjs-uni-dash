import { resolvers } from "../User.resolvers";
import { users } from "../../__data__/user.mocks";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "new-uuid"),
}));

describe("User Resolvers", () => {
  beforeEach(() => {
    users.length = 0;
    users.push(
      { id: "user-1", name: "John Doe", email: "john@example.com", age: 25 },
      { id: "user-2", name: "Jane Doe", email: "jane@example.com", age: 30 }
    );
  });

  describe("getUsersForAuth", () => {
    it("should return all users without authentication", () => {
      const result = resolvers.Query.getUsersForAuth(null, null, null);
      expect(result).toEqual(users);
    });
  });

  describe("getUsers", () => {
    it("should return users when authenticated", () => {
      const context = { user: { id: "user-1" } };
      const result = resolvers.Query.getUsers(null, null, context);
      expect(result).toEqual(users);
    });

    it("should throw an error when not authenticated", () => {
      const context = { user: null };
      expect(() => resolvers.Query.getUsers(null, null, context)).toThrow(
        "Not authenticated"
      );
    });
  });

  describe("getUser", () => {
    it("should return a user by ID when authenticated", () => {
      const context = { user: { id: "user-1" } };
      const result = resolvers.Query.getUser(null, { id: "user-1" }, context);
      expect(result).toEqual(users[0]);
    });

    it("should throw an error when not authenticated", () => {
      const context = { user: null };
      expect(() =>
        resolvers.Query.getUser(null, { id: "user-1" }, context)
      ).toThrow("Not authenticated");
    });

    it("should throw an error if the user is not found", () => {
      const context = { user: { id: "user-1" } };
      expect(() =>
        resolvers.Query.getUser(null, { id: "non-existent" }, context)
      ).toThrow("User not found");
    });
  });

  describe("createUser", () => {
    it("should create a new user when authenticated", () => {
      const context = { user: { id: "user-1" } };
      const args = {
        name: "New User",
        email: "newuser@example.com",
        age: 28,
        major: "Physics",
        universityId: "uni-123",
      };

      const result = resolvers.Mutation.createUser(null, args, context);
      expect(result).toEqual({
        id: "new-uuid",
        ...args,
      });

      expect(users).toContainEqual({
        id: "new-uuid",
        ...args,
      });
    });

    it("should throw an error when not authenticated", () => {
      const context = { user: null };
      expect(() =>
        resolvers.Mutation.createUser(
          null,
          {
            id: "user-1",
            name: "",
            email: "",
            age: 20,
            major: "",
            universityId: "",
          },
          context
        )
      ).toThrow("Not authenticated");
    });
  });

  describe("updateUser", () => {
    it("should update an existing user when authenticated", () => {
      const context = { user: { id: "user-1" } };
      const args = {
        id: "user-1",
        name: "Updated Name",
        email: "updated@example.com",
        age: 35,
      };

      const result = resolvers.Mutation.updateUser(null, args, context);
      expect(result).toEqual({
        ...users[0],
        ...args,
      });

      expect(users[0]).toEqual({
        ...users[0],
        ...args,
      });
    });

    it("should throw an error if the user is not found", () => {
      const context = { user: { id: "user-1" } };
      const args = {
        id: "non-existent",
        name: "Updated Name",
        email: "",
        age: 20,
        major: "",
        universityId: "",
      };
      expect(() => resolvers.Mutation.updateUser(null, args, context)).toThrow(
        "User not found"
      );
    });

    it("should throw an error when not authenticated", () => {
      const context = { user: null };
      expect(() =>
        resolvers.Mutation.updateUser(
          null,
          {
            id: "",
            name: "",
            email: "",
            age: 20,
            major: "",
            universityId: "",
          },
          context
        )
      ).toThrow("Not authenticated");
    });
  });

  describe("deleteUser", () => {
    it("should delete a user when authenticated", () => {
      const context = { user: { id: "user-1" } };
      const args = { id: "user-1" };

      const userToBeDeleted = users.find((user) => user.id === "user-1");
      expect(users).toContainEqual(userToBeDeleted);

      const result = resolvers.Mutation.deleteUser(null, args, context);
      expect(result).toEqual(userToBeDeleted);

      expect(users).not.toContainEqual(userToBeDeleted);
    });

    it("should return null if the user is not found", () => {
      const context = { user: { id: "user-1" } };
      const args = { id: "non-existent" };

      const result = resolvers.Mutation.deleteUser(null, args, context);
      expect(result).toBeNull();
    });

    it("should throw an error when not authenticated", () => {
      const context = { user: null };
      expect(() =>
        resolvers.Mutation.deleteUser(null, { id: "user-1" }, context)
      ).toThrow("Not authenticated");
    });
  });
});
