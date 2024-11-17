const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    experiences: [
      {
        jobTitle: { type: String, required: true },
        company: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        responsibilities: { type: String },
        location: { type: String },
      },
    ],
    education: [
      {
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        grade: { type: String },
      },
    ],
    skills: [
      {
        type: String,
        required: true,
      },
    ],
    certifications: [
      {
        name: { type: String, required: true },
        institution: { type: String, required: true },
        date: { type: Date },
        url: { type: String },
      },
    ],
    projects: [
      {
        title: { type: String, required: true },
        description: { type: String },
        technologies: [{ type: String }],
        link: { type: String },
      },
    ],
    languages: [
      {
        language: { type: String, required: true },
        proficiency: { type: String },
      },
    ],
    volunteerExperience: [
      {
        role: { type: String },
        organization: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
    interests: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
