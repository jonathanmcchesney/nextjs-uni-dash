import mongoose, { Schema, Document, Model } from "mongoose";

interface IMindfulnessTip extends Document {
  title: string;
  description: string;
}

const MindfulnessTipSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export const MindfulnessTip: Model<IMindfulnessTip> =
  mongoose.models.MindfulnessTip ||
  mongoose.model<IMindfulnessTip>("MindfulnessTip", MindfulnessTipSchema);
