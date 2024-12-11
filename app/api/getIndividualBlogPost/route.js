import { NextResponse } from "next/server";
import connect from "@/app/lib/connectionFile"; // MongoDB connection
import BlogPostSchema from "@/app/lib/models/BlogPostSchema"; // Blog schema

export const GET = async (req) => {
  try {
    // Extract the blog ID from the query parameters
    const url = new URL(req.url);
    const blogID = url.searchParams.get("id");

    await connect(); // Connect to the database

    // Fetch the blog by ID
    const blog = await BlogPostSchema.findById(blogID);

    if (!blog || blog.status !== "Published") {
      return NextResponse.json({ error: "Blog post not found!" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching individual blog post:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch the blog post." },
      { status: 500 }
    );
  }
};
