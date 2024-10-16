import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface IWellness extends Document {
  userId: string;
  mood: number;
  sleep: number;
  stress: number;
  date: Date;
}

const WellnessSchema: Schema = new Schema({
  id: { type: String, default: uuidv4 },
  userId: { type: String, required: true },
  mood: { type: Number, required: true },
  sleep: { type: Number, required: true },
  stress: { type: Number, required: true },
  date: { type: Date, required: true },
});

export const Wellness: Model<IWellness> =
  mongoose.models.Wellness ||
  mongoose.model<IWellness>("Wellness", WellnessSchema);
