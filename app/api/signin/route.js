import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import connect from "@/app/lib/connectionFile";
import User from "@/app/lib/models/User";

// const SECRET_KEY = process.env.JWT_SECRET;

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

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("hash and plain password equal ? ..", isMatch);
    
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials!" },
        { status: 401 }
      );
    }

    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    console.log("SECRET KEY in backend", secretKey);

    
    // Create JWT token using jose
    const token = await new SignJWT({ id: user._id, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("15m")
      .sign(secretKey);

    // (to match token of backend with middleware)
    console.log("token in backend ", token);

    // (setting token in browser cookie via backend)
    // Store token in an HttpOnly cookie
    return new Response(JSON.stringify({ role: user.role }), {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Path=/; Secure; SameSite=None;`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error during sign-in: " + error.message },
      { status: 500 }
    );
  }
};
