import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    label: { type: String, required: true },
    shortDescription: { type: [String], required: true },
    longDescription: { type: [String], required: true },
    liveLinks: { type: [String] },
    assetLinks: { type: [String] },
    sortOrder: { type: Number, required: true },
  },
  { _id: false },
);

const personalInfoSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    heading: { type: [String], required: true },
    subHeading: { type: [String], required: true },
    email: { type: [String], required: true },
  },
  { _id: false },
);

const contactDetailSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false },
);

const profileSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
  },
  { _id: false },
);

const portfolioSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    works: [workSchema],
    personalInfo: personalInfoSchema,
    contactDetails: [contactDetailSchema],
    profiles: [profileSchema],
    skills: { type: [String], required: true },
  },
  { timestamps: true },
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
