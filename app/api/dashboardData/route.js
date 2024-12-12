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

// PUT: update a blog post data
export async function PUT(request) {
  try {
    const { _id, title, content, status } = await request.json();
    await connect();

    const updatedBlog = await BlogPostSchema.findByIdAndUpdate(
      _id,
      { title, content, status },
      { new: true }
    );

    if (!updatedBlog) {
      return new Response(JSON.stringify({ error: "Blog post not found!" }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedBlog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Delete: delete particular blog post from db.

export async function DELETE(request) {
  try {
    const { _id } = await request.json();
    await connect();

    const deletedBlog = await BlogPostSchema.findByIdAndDelete(_id);

    if (!deletedBlog) {
      return new Response(JSON.stringify({ error: "Blog post not found!" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Blog post deleted successfully!" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
