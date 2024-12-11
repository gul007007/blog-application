import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
    author: { type: String, required: false }, // Optional, for future enhancements
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

export default mongoose.models.BlogPost ||
  mongoose.model("BlogPost", BlogPostSchema);
