import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "fake-secret-key";

export const generateToken = (user: any) => {
  return jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    throw new Error("Invalid or expired token");
  }
};
