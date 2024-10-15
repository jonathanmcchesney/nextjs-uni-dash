import { IClass } from "@/types/timetable";
import mongoose, { Schema, Document } from "mongoose";

export interface ITimetable extends Document {
  userId: string;
  timetable: IClass[];
}

const TimetableSchema: Schema = new Schema({
  userId: { type: String, required: true },
  timetable: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      day: { type: String, required: true },
      category: { type: String, required: true },
    },
  ],
});

export const Timetable =
  mongoose.models.Timetable ||
  mongoose.model<ITimetable>("Timetable", TimetableSchema);
