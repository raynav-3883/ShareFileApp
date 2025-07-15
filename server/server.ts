import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';

import cors from 'cors';
import connectDB from './config/db';
import fileRoute from "./routes/files";

import { v2 as cloudinary } from 'cloudinary';

const app = express();
console.log("CLOUDINARY_CLOUD_NAME:", JSON.stringify(process.env.CLOUDINARY_CLOUD_NAME));
console.log("CLOUDINARY_API_KEY:", JSON.stringify(process.env.CLOUDINARY_API_KEY));
console.log("CLOUDINARY_API_SECRET:", JSON.stringify(process.env.CLOUDINARY_API_SECRET));


cloudinary.config({
cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
api_key:process.env.CLOUDINARY_API_KEY,
api_secret:process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB
console.log("MONGO_URI:", process.env.MONGO_URI);

connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/files", fileRoute);

// Port
const PORT = process.env.PORT;

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port ${PORT}`);
});
