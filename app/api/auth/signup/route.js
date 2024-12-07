import { connect } from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const body = await request.json(); // Grab data passed by client.

    // (display to insure data in body appraoching to Server.)
    console.log('data in signup route: ',body);
    
    await connect(); // calling connection file

    // (before Post data in db check data is reaching again and for now using destructuring)
    const {} = body;
  } catch (error) {}
};
