import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: [
      {
        url: {
          type: String,
          required: true,
        },
        index: {
          type: Number,
          required: true,
        },
      },
    ],
    slug: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const Category = mongoose.model("Category", categorySchema);
