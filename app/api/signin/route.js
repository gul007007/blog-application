import { NextResponse } from "next/server";

import { SignJWT } from "jose";
import connect from "@/app/lib/connectionFile";
import User from "@/app/lib/models/User";

const SECRET_KEY = process.env.JWT_SECRET;

export const POST = async (request) => {
  try {
    const { email, password } = await request.json();
    await connect();

    // Find user by email
    const user = await User.findOne({ email });
    console.log("user from signin:", user);

    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    console.log("SECRET KEY in backend", secretKey);

    // Create JWT token using jose
    const token = await new SignJWT({ id: user._id, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2h")
      .sign(secretKey);

    // (to match token of backend with middleware)
    console.log("token in backend ", token);

    // (setting token in browser cookie via backend)
    // Store token in an HttpOnly cookie
    return new Response(JSON.stringify({ role: user.role }), {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Path=/; Secure; SameSite=Strict;`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error during sign-in: " + error.message },
      { status: 500 }
    );
  }
};
