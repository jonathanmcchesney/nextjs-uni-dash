import { IContactInfo, IFaculty, IProgram, IResourceLink } from "@/types/university";
import mongoose, { Schema, Document } from "mongoose";

export interface IUniversity extends Document {
  name: string;
  description?: string;
  address?: string;
  faculty: IFaculty[];
  contact: IContactInfo;
  programs: IProgram[];
  resourceLinks: IResourceLink[];
}

const ContactInfoSchema: Schema = new Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const FacultySchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  contact: ContactInfoSchema,
});

const CourseSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  credits: { type: Number, required: true },
});

const ProgramSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  courses: [CourseSchema],
});

const ResourceLinkSchema: Schema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: false },
});

const UniversitySchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  address: { type: String },
  faculty: [FacultySchema],
  contact: ContactInfoSchema,
  programs: [ProgramSchema],
  resourceLinks: [ResourceLinkSchema],
});

export const University =
  mongoose.models.University ||
  mongoose.model<IUniversity>("University", UniversitySchema);
