import mongoose from "mongoose";
// Get connection string from .env.local file
const connectionStr = process.env.connection_str;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;
  console.log("connection state: ", connectionState);

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    mongoose.connect(connectionStr, {
      dbName: "AllBlog",
      bufferCommands: true,
    });
    console.log("db Connected with backend.");
  } catch (err) {
    console.log("Error: ", err);
  }
};

export default connect;
