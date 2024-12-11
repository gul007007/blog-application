import { NextResponse } from "next/server";
import connect from "@/app/lib/connectionFile"; // MongoDB connection
import BlogPostSchema from "@/app/lib/models/BlogPostSchema"; // Blog schema

export const GET = async () => {
  try {
    await connect(); // Connect to the database
    const publishedBlogs = await BlogPostSchema.find({ status: "Published" }); // Retrieve only published blogs
    return NextResponse.json(publishedBlogs, { status: 200 }); // Send response with blogs
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
};
