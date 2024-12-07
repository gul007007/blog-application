import mongoose from "mongoose";
const connectionStr = process.env.connection_str;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;
  console.log("connection state to db: ", connectionState);

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
      dbName: "blogDB",
      bufferCommands: true,
    });
    console.log("db Connected");
  } catch (err) {
    console.log("Error: ", err);
  }
};

export default connect;
