"use client";

import { useParams } from "next/navigation";

export default function BlogDetailsPage() {
  const { blogID } = useParams(); // Extract blogID from URL

  // Mock data
  const blogs = [
    { id: 1, title: "Understanding React", content: "React is a JavaScript library for building UIs..." },
    { id: 2, title: "Next.js for Beginners", content: "Next.js is a React framework with SSR features..." },
    { id: 3, title: "Styling in Tailwind CSS", content: "Tailwind CSS is a utility-first CSS framework..." },
    { id: 4, title: "Getting Started with MongoDB", content: "MongoDB is a NoSQL database that scales..." },
  ];

  // Find blog by ID
  const blog = blogs.find((blog) => blog.id === parseInt(blogID, 10));

  if (!blog) {
    return <p className="text-center text-red-600">Blog post not found!</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-50">{blog.content}</p>
    </div>
  );
}
