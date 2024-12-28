import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

export async function dbConnect() {
  try {
    if (connection.isConnected) return;

    const db = await mongoose.connect(
      process.env.DB!.replace("%PASSWORD%", process.env.DB_PASSWORD!),
      { dbName: "tripma" }
    );

    connection.isConnected = db.connections[0].readyState;

    console.log("connection successful");
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
