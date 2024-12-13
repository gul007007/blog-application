"use client";

import Link from "next/link";

export default function AdminNavigation() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-end gap-4">
        <li>
          <Link href="/auth/signup" className="text-white hover:text-gray-300">
            Signup
          </Link>
        </li>
        <li>
          <Link href="/auth/signin" className="text-white hover:text-gray-300">
            Signin
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className="text-white hover:text-gray-300">
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
}
