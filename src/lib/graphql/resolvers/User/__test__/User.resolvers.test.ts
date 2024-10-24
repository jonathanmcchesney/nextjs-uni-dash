import { resolvers } from "../User.resolvers";
import { User } from "../../../../../lib/mongodb/models/User";

jest.mock("../../../../../lib/mongodb/models/User");

describe("User Resolvers", () => {
  const mockUsers = [
    { id: "user-1", name: "John Doe", email: "john@example.com", age: 25 },
    { id: "user-2", name: "Jane Doe", email: "jane@example.com", age: 30 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUsersForAuth", () => {
    it("should return all users with id and email", async () => {
      (User.find as jest.Mock).mockResolvedValue(mockUsers);

      const result = await resolvers.Query.getUsersForAuth();
      expect(User.find).toHaveBeenCalledWith({}, "id email");
      expect(result).toEqual(mockUsers);
    });
  });

  describe("getUsers", () => {
    it("should return users when authenticated", async () => {
      const context = { user: { id: "user-1" } };
      (User.find as jest.Mock).mockResolvedValue(mockUsers);

      const result = await resolvers.Query.getUsers(null, null, context);
      expect(User.find).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });

    it("should throw an error when not authenticated", async () => {
      const context = { user: null };
      await expect(
        resolvers.Query.getUsers(null, null, context)
      ).rejects.toThrow("Not authenticated");
    });
  });

  describe("getUser", () => {
    it("should return a user by ID when authenticated", async () => {
      const context = { user: { id: "user-1" } };
      (User.findOne as jest.Mock).mockResolvedValue(mockUsers[0]);

      const result = await resolvers.Query.getUser(
        null,
        { id: "user-1" },
        context
      );
      expect(User.findOne).toHaveBeenCalledWith({ id: "user-1" });
      expect(result).toEqual(mockUsers[0]);
    });

    it("should throw an error when not authenticated", async () => {
      const context = { user: null };
      await expect(
        resolvers.Query.getUser(null, { id: "user-1" }, context)
      ).rejects.toThrow("Not authenticated");
    });

    it("should throw an error if the user is not found", async () => {
      const context = { user: { id: "user-1" } };
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        resolvers.Query.getUser(null, { id: "non-existent" }, context)
      ).rejects.toThrow("User not found");
    });
  });

  describe("createUser", () => {
    it("should create a new user when authenticated", async () => {
      const context = { user: { id: "user-1" } };
      const args = {
        name: "New User",
        email: "newuser@example.com",
        age: 28,
        major: "Physics",
        universityId: "uni-123",
      };

      const mockSavedUser = { id: "new-uuid", ...args };
      (User.prototype.save as jest.Mock).mockResolvedValue(mockSavedUser);

      const result = await resolvers.Mutation.createUser(null, args, context);
      expect(result).toEqual(mockSavedUser);
    });

    it("should throw an error when not authenticated", async () => {
      const context = { user: null };
      const args = {
        name: "New User",
        email: "newuser@example.com",
        age: 28,
        major: "Physics",
        universityId: "uni-123",
      };

      await expect(
        resolvers.Mutation.createUser(null, args, context)
      ).rejects.toThrow("Not authenticated");
    });
  });

  describe("updateUser", () => {
    it("should update an existing user when authenticated", async () => {
      const context = { user: { id: "user-1" } };
      const args = {
        id: "user-1",
        name: "Updated Name",
        email: "updated@example.com",
        age: 35,
      };

      const mockUpdatedUser = { ...mockUsers[0], ...args };
      (User.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedUser);

      const result = await resolvers.Mutation.updateUser(null, args, context);
      expect(User.findOneAndUpdate).toHaveBeenCalledWith(
        { id: "user-1" },
        { name: "Updated Name", email: "updated@example.com", age: 35 },
        { new: true, runValidators: true }
      );
      expect(result).toEqual(mockUpdatedUser);
    });

    it("should throw an error if the user is not found", async () => {
      const context = { user: { id: "user-1" } };
      (User.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

      const args = {
        id: "non-existent",
        name: "Updated Name",
        email: "updated@example.com",
        age: 35,
      };

      await expect(
        resolvers.Mutation.updateUser(null, args, context)
      ).rejects.toThrow("User not found");
    });

    it("should throw an error when not authenticated", async () => {
      const context = { user: null };
      const args = {
        id: "user-1",
        name: "Updated Name",
        email: "updated@example.com",
        age: 35,
      };

      await expect(
        resolvers.Mutation.updateUser(null, args, context)
      ).rejects.toThrow("Not authenticated");
    });
  });

  describe("deleteUser", () => {
    it("should delete a user when authenticated", async () => {
      const context = { user: { id: "user-1" } };
      const args = { id: "user-1" };

      (User.findOneAndDelete as jest.Mock).mockResolvedValue(mockUsers[0]);

      const result = await resolvers.Mutation.deleteUser(null, args, context);
      expect(User.findOneAndDelete).toHaveBeenCalledWith({ id: "user-1" });
      expect(result).toEqual(mockUsers[0]);
    });

    it("should throw an error if the user is not found", async () => {
      const context = { user: { id: "user-1" } };
      const args = { id: "non-existent" };

      (User.findOneAndDelete as jest.Mock).mockResolvedValue(null);

      await expect(
        resolvers.Mutation.deleteUser(null, args, context)
      ).rejects.toThrow("User not found");
    });

    it("should throw an error when not authenticated", async () => {
      const context = { user: null };
      const args = { id: "user-1" };

      await expect(
        resolvers.Mutation.deleteUser(null, args, context)
      ).rejects.toThrow("Not authenticated");
    });
  });
});
