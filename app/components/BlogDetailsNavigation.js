"use client";

import Link from "next/link";

export default function BlogDetailsNavigation() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-end gap-4">
        <li>
          <Link href="/home" className="text-white hover:text-gray-300">
            Blogs
          </Link>
        </li>
      </ul>
    </nav>
  );
}
