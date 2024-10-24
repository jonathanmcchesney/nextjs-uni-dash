import mongoose, { Schema, Document, Model } from "mongoose";

interface IHealthResource extends Document {
  name: string;
  description: string;
  contact: string;
}

const HealthResourceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  contact: { type: String, required: true },
});

export const HealthResource: Model<IHealthResource> =
  mongoose.models.HealthResource ||
  mongoose.model<IHealthResource>("HealthResource", HealthResourceSchema);
