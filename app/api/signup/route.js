import connect from "@/app/lib/connectionFile";
import User from "@/app/lib/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export const POST = async (request) => {
  try {
    // (Grab data from attached with request body) ~ (default role=user)
    const body = await request.json();

    // (destructuring data comming from client)
    const { email, password } = body;
    // Set role  for admin and user
    const role = email === "admin@gmail.com" ? "admin" : "user";
    // (See data is reaching in  variables)
    console.log("data is reaching to signup route. ", email, password, role);

    await connect(); // req connection with db.

    // (checking for already user exist)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response("User already exists.", { status: 400 });
    }

    // (convert password into hash then pass to db. avoid plain password)
    // Hash the password before storing it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("salt + hash password..", salt, hashedPassword);

    //   (creating user account using Schema.)
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    //   (storing  user account in db)
    await newUser.save();

    //   (returning success response back if all goes well)
    return NextResponse.json(
      { message: "Signup successful😀", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error during signup try block: " + error.message },
      { status: 500 }
    );
  }
};
