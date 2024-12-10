import { NextResponse } from "next/server";

import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  console.log("Token Value in Middleware:", token);

  if (!token) {
    // If no token, redirect to the sign-in page
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);
    console.log("Decoded Token:", payload);

    const role = payload.role; // Extract role from the payload
    const urlPath = req.nextUrl.pathname;
    
    // Route checks
    if (role === "user" && urlPath.startsWith("/dashboard")) {
      // Redirect user to home if attempting to access admin routes
      return NextResponse.redirect(new URL("/home", req.url));
    }

    if (role === "admin" && urlPath.startsWith("/home")) {
      // Redirect admin to dashboard if attempting user-only routes
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next(); // Allow route access if all checks pass
  } catch (error) {
    console.error("jose Verification Failed in Middleware:", error.message);
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}

export const config = {
  matcher: ["/home", "/blog/:path*", "/dashboard"], // Protect these routes
};
