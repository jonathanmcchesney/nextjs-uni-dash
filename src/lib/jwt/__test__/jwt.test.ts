import { generateToken, verifyToken } from "../jwt";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("JWT Utility Functions", () => {
  const SECRET_KEY = "fake-secret-key";
  const mockUser = { id: "user-123" };
  const mockToken = "mocked-jwt-token";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("generateToken", () => {
    it("should generate a token for a valid user", () => {
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const token = generateToken(mockUser);

      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser.id },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      expect(token).toBe(mockToken);
    });
  });

  describe("verifyToken", () => {
    it("should verify a valid token", () => {
      const decodedToken = { userId: mockUser.id };

      (jwt.verify as jest.Mock).mockReturnValue(decodedToken);

      const result = verifyToken(mockToken);

      expect(jwt.verify).toHaveBeenCalledWith(mockToken, SECRET_KEY);
      expect(result).toEqual(decodedToken);
    });

    it("should throw an error for an invalid or expired token", () => {
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error("Invalid or expired token");
      });

      expect(() => verifyToken(mockToken)).toThrow("Invalid or expired token");

      expect(jwt.verify).toHaveBeenCalledWith(mockToken, SECRET_KEY);
    });
  });
});
