import { ICourse } from "@/types/university";
import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IProgramDocument extends Document {
  id: string;
  name: string;
  courses: ICourse[];
  userId: string;
}

const CourseSchema: Schema = new Schema({
  id: { type: String, default: uuidv4 },
  title: { type: String, required: true },
  description: { type: String },
  credits: { type: Number },
});

const ProgramSchema: Schema = new Schema({
  id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  userId: { type: String, required: true },
  courses: [CourseSchema],
});

export const Program: Model<IProgramDocument> =
  mongoose.models.Program ||
  mongoose.model<IProgramDocument>("Program", ProgramSchema);
