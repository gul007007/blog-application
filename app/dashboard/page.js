"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  // State to manage blogs
  const [blogs, setBlogs] = useState([]);
  // (mock data)
  // ({ id: 1, title: "Understanding React", status: "Published" },
  //   { id: 2, title: "Next.js for Beginners", status: "Draft" },
  //   { id: 3, title: "Styling in Tailwind CSS", status: "Published" },)

  const [editingBlog, setEditingBlog] = useState(null); // Holds the blog being edited when you want to edit any blog post.

  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Add new blog post handler (newBlog => object)
  const handleAddBlog = (newBlog) => {
    setBlogs((prevBlogs) => {
      const blogIndex = prevBlogs.findIndex((blog) => blog._id === newBlog._id);

      if (blogIndex !== -1) {
        // Update the existing blog
        const updatedBlogs = [...prevBlogs];
        updatedBlogs[blogIndex] = newBlog;
        return updatedBlogs;
      } else {
        // Add a new blog
        return [...prevBlogs, { ...newBlog, _id: prevBlogs.length + 10 }];
      }
    });

    setShowModal(false); // Close the modal after adding
  };

  // (Edit particular blog post handler)
  const handleEditBlogPost = (id) => {
    console.log("testing edit button with respective id ?..", id);

    const blogToEdit = blogs.find((blog) => blog._id === id);
    setEditingBlog(blogToEdit);
    setShowModal(true);
  };

  // (Delete particular blog post)
  const handleDeleteBlogPost = async (id) => {
    try {
      const response = await fetch(`/api/dashboardData`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      if (response.ok) {
        // Remove the deleted blog from the state
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        alert("Blog post deleted successfully!");
      } else {
        const error = await response.json();
        alert(error.message || "Failed to delete the blog post.");
      }
    } catch (error) {
      console.error("Error deleting blog post:", error.message);
      alert("An error occurred while deleting the blog post.");
    }
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
                <button
                  className="text-blue-600 hover:underline mr-4"
                  onClick={() => {
                    handleEditBlogPost(blog._id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => {
                    handleDeleteBlogPost(blog._id);
                  }}
                >
                  Delete
                </button>
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
            {/* (passing editingBlog that carry edit data to modal) */}
            <AddBlogPostForm
              onSave={handleAddBlog}
              onClose={() => setShowModal(false)}
              blog={editingBlog}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// (function executed when 'Add New Blog Post' button is clicked at dashboard)

function AddBlogPostForm({ onSave, onClose, blog }) {
  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");
  const [status, setStatus] = useState(blog?.status || "Draft");

  // (this will pass dashboard data to backend.)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatingBlog = { _id: blog?._id, title, content, status };
    // onSave(newBlog);
    // (making POST request using api/dashboardData to save it in db.)
    try {
      const response = await fetch("/api/dashboardData", {
        method: blog ? "PUT" : "POST", // PUT for editing, POST for adding
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatingBlog),
      });

      // (to show admin what is going on in backend.)
      if (response.ok) {
        alert(
          blog
            ? "Blog post updated successfully!"
            : "Blog post added successfully!"
        );
        onSave(updatingBlog);
      } else {
        const errorFromServer = await response.json();
        alert(errorFromServer.error || "Operation failed!");
      }
    } catch (error) {
      alert("An error occurred in dashboard try block.");
      console.error("Error blog post adding or editing :", error.message);
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
