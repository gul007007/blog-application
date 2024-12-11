"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  // State to manage blogs
  const [blogs, setBlogs] = useState([]);
  // (mock data)
  // ({ id: 1, title: "Understanding React", status: "Published" },
  //   { id: 2, title: "Next.js for Beginners", status: "Draft" },
  //   { id: 3, title: "Styling in Tailwind CSS", status: "Published" },)

  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Add new blog post handler
  const handleAddBlog = (newBlog) => {
    setBlogs((prevBlogs) => {
      console.log("prevBlogs....", prevBlogs);
      return [...prevBlogs, { ...newBlog, _id: prevBlogs.length + 10 }];
    });

    setShowModal(false); // Close the modal after adding
  };

  // Fetch blog posts on page load
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/dashboardData", { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts.");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      }
    };

    fetchBlogs();
  }, []);

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
            <tr key={blog._id}>
              {console.log("all blogs from db.", blogs)}
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

// (function executed when 'Add New Blog Post' button is clicked at dashboard)

function AddBlogPostForm({ onSave, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Draft");

  // (this will pass dashboard data to backend.)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = { title, content, status };
    onSave(newBlog);
    // (making POST request using api/dashboardData to save it in db.)
    try {
      const response = await fetch("/api/dashboardData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, status }),
      });

      // (to show admin what is going on in backend.)
      if (response.ok) {
        alert("Blog post added successful!");
      } else {
        const errorFromServer = await response.json();
        alert(errorFromServer.error || "Blog post adding failed!");
      }
    } catch (error) {
      alert("An error occurred in dashboard try block.");
      console.error("Error while adding blog post:", error.message);
    }

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
        className="border rounded px-4 py-2 text-gray-500"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Blog Content"
        rows="5"
        required
        className="border rounded px-4 py-2 text-gray-500"
      ></textarea>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded px-4 py-2 text-gray-500"
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
