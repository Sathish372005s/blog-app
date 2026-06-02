import mongoose, { Schema, models } from "mongoose";

const projectSchema = new Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Client",

      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    skillsRequired: [
      {
        type: String,
      },
    ],

    experienceLevel: {
      type: String,

      enum: ["junior", "mid", "senior"],
    },

    projectType: {
      type: String,

      enum: ["fixed", "hourly"],
    },

    duration: {
      type: String,
    },

    status: {
      type: String,

      enum: ["open", "in-progress", "completed", "cancelled"],

      default: "open",
    },
  },

  {
    timestamps: true,
  },
);

const Project = models.Project || mongoose.model("Project", projectSchema);

export default Project;
