import mongoose from "mongoose";

let connection = null; // Persistent connection variable

export default async function dbConnect() {
    if (connection && mongoose.connection.readyState === 1) {
        console.log("Using existing database connection");
        return connection;
    }

    try {
        connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected");
        return connection;
    } catch (error) {
        console.error("Database connection failed:", error);
        // process.exit(1);
    }
}
