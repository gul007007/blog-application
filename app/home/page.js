"use client";

// import Link from "next/link";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState, Suspense } from "react";
// import UserNavigation from "../components/UserNavigation";

// export default function BlogListingPage() {
//   // Mock blog data
//   // const blogs = [
//   //   {
//   //     id: 1,
//   //     title: "Understanding React",
//   //     snippet: "React makes it painless to create interactive UIs.",
//   //   },
//   //   {
//   //     id: 2,
//   //     title: "Next.js for Beginners",
//   //     snippet: "Learn why Next.js is a game-changer for developers.",
//   //   },
//   //   {
//   //     id: 3,
//   //     title: "Styling in Tailwind CSS",
//   //     snippet: "Utility-first CSS framework packed with classes.",
//   //   },
//   //   {
//   //     id: 4,
//   //     title: "Getting Started with MongoDB",
//   //     snippet: "NoSQL database that scales seamlessly.",
//   //   },
//   //   {
//   //     id: 5,
//   //     title: "JavaScript ES6 Features",
//   //     snippet: "Explore the new features in ES6.",
//   //   },
//   //   {
//   //     id: 6,
//   //     title: "How to Deploy with Vercel",
//   //     snippet: "Deploy your Next.js apps with ease.",
//   //   },
//   //   {
//   //     id: 7,
//   //     title: "Why Choose TypeScript?",
//   //     snippet: "Strong typing for safer code.",
//   //   },
//   //   {
//   //     id: 8,
//   //     title: "Introduction to GraphQL",
//   //     snippet: "Query your APIs with flexibility.",
//   //   },
//   // ];

//   const [allBlogPosts, setAllBlogPosts] = useState([]);

//   const blogsPerPage = 4; // Number of blogs per page
//   const searchParams = useSearchParams(); // Access query parameters
//   console.log("seachParams from home page: ", useSearchParams());

//   const router = useRouter();

//   // Get the current page from the URL, default to page 1
//   const currentPage = parseInt(searchParams.get("page") || "1", 10); // ( 10 means base 10)

//   // Calculate the blogs to display
//   const startIndex = (currentPage - 1) * blogsPerPage;
//   const endIndex = startIndex + blogsPerPage;
//   const displayedBlogs = allBlogPosts.slice(startIndex, endIndex);

//   // Total pages
//   const totalPages = Math.ceil(allBlogPosts.length / blogsPerPage);

//   // Handle pagination click
//   const handlePageChange = (page) => {
//     console.log("page value from function => ", page);

//     if (page > 0 && page <= totalPages) {
//       router.push(`/home?page=${page}`);
//     }
//   };

//   // (Fetching all blog posts from db via backend)
//   useEffect(() => {
//     // Fetch blogs data from backend
//     const fetchBlogs = async () => {
//       try {
//         const response = await fetch("/api/allBlogPosts");
//         if (!response.ok) {
//           throw new Error("Failed to fetch blogs.");
//         }
//         const data = await response.json();
//         setAllBlogPosts(data);
//       } catch (error) {
//         console.error("Error fetching blogs:", error.message);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   return (
//     <>
//       <UserNavigation />

//       <div className="max-w-4xl mx-auto p-4">
//         {/* Main Heading */}
//         <h1 className="text-3xl font-bold text-center my-8">
//           Blog Listing Page
//         </h1>

//         {/* Blog Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
//           {displayedBlogs.map((blog) => (
//             <Link
//               key={blog._id}
//               href={`/blog/${blog._id}`}
//               className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
//             >
//               <h2 className="text-xl font-semibold mb-2 text-gray-400">
//                 {blog.title}
//               </h2>
//               <p className="text-gray-600 line-clamp-3">{blog.content}</p>
//             </Link>
//           ))}
//         </div>

//         {/* Pagination Buttons */}
//         <div className="flex justify-center items-center gap-2">
//           <button
//             className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-200"
//             disabled={currentPage === 1}
//             onClick={() => handlePageChange(currentPage - 1)}
//           >
//             Previous
//           </button>

//           <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>

//           <button
//             className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-200"
//             disabled={currentPage === totalPages}
//             onClick={() => handlePageChange(currentPage + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// new code

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserNavigation from "../components/UserNavigation";

function BlogContent({ allBlogPosts, currentPage, blogsPerPage, handlePageChange }) {
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const displayedBlogs = allBlogPosts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(allBlogPosts.length / blogsPerPage);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {displayedBlogs.map((blog) => (
          <Link
            key={blog._id}
            href={`/blog/${blog._id}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-400">{blog.title}</h2>
            <p className="text-gray-600 line-clamp-3">{blog.content}</p>
          </Link>
        ))}
      </div>

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
    </>
  );
}

export default function BlogListingPage() {
  const [allBlogPosts, setAllBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Use local state instead of search params
  const blogsPerPage = 4;
  const router = useRouter();

  const handlePageChange = (page) => {
    if (page > 0 && page <= Math.ceil(allBlogPosts.length / blogsPerPage)) {
      setCurrentPage(page); // Update the current page
      router.push(`/home?page=${page}`); // Update URL
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/allBlogPosts");
        const data = await response.json();
        if (response.ok) {
          setAllBlogPosts(data);
        } else {
          throw new Error("Failed to fetch blogs.");
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchBlogs();

    // Sync page number from URL on mount
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page") || "1", 10);
    setCurrentPage(page);
  }, []);

  return (
    <>
      <UserNavigation />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center my-8">Blog Listing Page</h1>
        <BlogContent
          allBlogPosts={allBlogPosts}
          currentPage={currentPage}
          blogsPerPage={blogsPerPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
}
