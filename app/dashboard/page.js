"use client";

import { useState } from "react";

export default function AdminDashboard() {
  // State to manage blogs
  const [blogs, setBlogs] = useState([
    { id: 1, title: "Understanding React", status: "Published" },
    { id: 2, title: "Next.js for Beginners", status: "Draft" },
    { id: 3, title: "Styling in Tailwind CSS", status: "Published" },
  ]);

  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Add new blog post handler
  const handleAddBlog = (newBlog) => {
    setBlogs((prevBlogs) => [
      ...prevBlogs,
      { ...newBlog, id: prevBlogs.length + 1 },
    ]);
    setShowModal(false); // Close the modal after adding
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Main Heading */}
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

      {/* Add New Blog Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Blog Post
        </button>
      </div>

      {/* Blog List Table */}
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td className="border border-gray-300 px-4 py-2">{blog.title}</td>
              <td className="border border-gray-300 px-4 py-2">
                {blog.status}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="text-blue-600 hover:underline mr-4">
                  Edit
                </button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Blog Post Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add New Blog Post</h2>
            <AddBlogPostForm
              onSave={handleAddBlog}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function AddBlogPostForm({ onSave, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Draft");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = { title, content, status };
    onSave(newBlog);
    setTitle("");
    setContent("");
    setStatus("Draft");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog Title"
        required
        className="border rounded px-4 py-2"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Blog Content"
        rows="5"
        required
        className="border rounded px-4 py-2"
      ></textarea>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded px-4 py-2"
      >
        <option value="Draft">Draft</option>
        <option value="Published">Published</option>
      </select>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}
