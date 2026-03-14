import "dotenv/config";
import { Server } from "node:http";
import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;

const server: Server = app.listen(PORT, async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        console.log("Connected to MongoDB");
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
});

const handleShutdown = async () => {
    console.log("Shutting down server...");

    // Close the server and disconnect from MongoDB
    server.close(async () => {
        console.log("Server closed");
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
        process.exit(0);
    });

    // Force shutdown if not closed within 10 seconds
    setTimeout(() => {
        console.error("Forcing shutdown...");
        process.exit(1);
    }, 10000);
};

process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);