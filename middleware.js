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

    return NextResponse.next();
  } catch (error) {
    console.error("JWT Verification Failed in Middleware:", error.message);
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}

export const config = {
  matcher: ["/home", "/blog/:path*"], // Protect these routes
};
