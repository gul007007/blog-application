import { NextResponse } from "next/server";
import BlogPostSchema from "@/app/lib/models/BlogPostSchema";
import connect from "@/app/lib/connectionFile";

// POST: Add a new blog post
export const POST = async (request) => {
  try {
    const { title, content, status } = await request.json();
    await connect();

    // (checking data fields with respect to Schema File.)
    const newBlog = new BlogPostSchema({ title, content, status });

    const savedBlog = await newBlog.save();

    return NextResponse.json(
      { message: "Blog added successfully!", blog: savedBlog },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error adding blog: " + error.message },
      { status: 500 }
    );
  }
};


// GET: Fetch all blog posts
export const GET = async () => {
  try {
    await connect();
    const blogs = await BlogPostSchema.find();

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching blogs: " + error.message }, { status: 500 });
  }
};