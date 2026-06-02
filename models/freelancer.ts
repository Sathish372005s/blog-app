import mongoose, { Schema, models } from "mongoose";

const freelancerSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      required: true,
    },

    services: [
    {
        name: {
            type: String,
            required: true,
        },

        rate: {
            type: Number,
            required: true,
        },

        description: {
            type: String,
        },
    },
    ],
    experience: {
      type: String,
        enum: [
            "junior",
            "mid",
            "senior"
        ],
    },
    skills: [
        {
            type: String,
        }
    ],

    availability: {
        type: String,
        enum: [
            "full-time",
            "part-time",
            "not-available"
        ],
        default: "full-time",
    },

    links: {
      linkedin: {
        type: String,
      },

      portfolio: {
        type: String,
      },
    },
    profileimage : {
       type: String, 
    },
  },
  {
    timestamps: true,
  }
);

const Freelancer =models.Freelancer || mongoose.model("Freelancer", freelancerSchema);

export default Freelancer;