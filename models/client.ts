import mongoose, { Schema, models } from "mongoose";

const clientSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

      unique: true,
    },

    companyName: {
      type: String,
    },

    companyDescription: {
      type: String,
    },

    companyWebsite: {
      type: String,
    },

    industry: {
      type: String,
    },

    location: {
      type: String,
    },

    logo: {
      type: String,
    },
  },

  {
    timestamps: true,
  },
);

const Client = models.Client || mongoose.model("Client", clientSchema);

export default Client;
