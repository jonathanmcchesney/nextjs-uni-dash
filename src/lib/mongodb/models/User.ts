import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../../../types/user";

// Extend the existing IUser interface but omit the 'id' from Document to avoid conflict
export interface IUserDocument extends Omit<Document, "id">, IUser {
  _id: string; // MongoDB _id field - ObjectId
}

const UserSchema: Schema = new Schema({
  id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  major: { type: String },
  universityId: { type: String },
});

export const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);
