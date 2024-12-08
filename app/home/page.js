"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function BlogListingPage() {
  // Mock blog data
  const blogs = [
    {
      id: 1,
      title: "Understanding React",
      snippet: "React makes it painless to create interactive UIs.",
    },
    {
      id: 2,
      title: "Next.js for Beginners",
      snippet: "Learn why Next.js is a game-changer for developers.",
    },
    {
      id: 3,
      title: "Styling in Tailwind CSS",
      snippet: "Utility-first CSS framework packed with classes.",
    },
    {
      id: 4,
      title: "Getting Started with MongoDB",
      snippet: "NoSQL database that scales seamlessly.",
    },
    {
      id: 5,
      title: "JavaScript ES6 Features",
      snippet: "Explore the new features in ES6.",
    },
    {
      id: 6,
      title: "How to Deploy with Vercel",
      snippet: "Deploy your Next.js apps with ease.",
    },
    {
      id: 7,
      title: "Why Choose TypeScript?",
      snippet: "Strong typing for safer code.",
    },
    {
      id: 8,
      title: "Introduction to GraphQL",
      snippet: "Query your APIs with flexibility.",
    },
  ];

  const blogsPerPage = 4; // Number of blogs per page
  const searchParams = useSearchParams(); // Access query parameters
  console.log("seachParams from home page: ", useSearchParams());

  const router = useRouter();

  // Get the current page from the URL, default to page 1
  const currentPage = parseInt(searchParams.get("page") || "1", 10); // ( 10 means base 10)

  // Calculate the blogs to display
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const displayedBlogs = blogs.slice(startIndex, endIndex);

  // Total pages
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  // Handle pagination click
  const handlePageChange = (page) => {
    console.log('page value from function => ',page);
    
    if (page > 0 && page <= totalPages) {
      router.push(`/home?page=${page}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Main Heading */}
      <h1 className="text-3xl font-bold text-center my-8">Blog Listing Page</h1>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {displayedBlogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.id}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-400">
              {blog.title}
            </h2>
            <p className="text-gray-600">{blog.snippet}</p>
          </Link>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center items-center gap-2">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-200"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>

        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>

        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-200"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
