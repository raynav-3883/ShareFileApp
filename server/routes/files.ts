import express from "express";
import multer from "multer";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import File from "../models/File"; // adjust path if needed
import https from "https"
const router = express.Router();

// ✅ Multer config
const storage = multer.diskStorage({});
const upload = multer({ storage });

// ✅ POST route
router.post("/upload", upload.single("myFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Hey bro! We need the file" });
    }

    console.log("File received:", req.file);

    let uploadedFile: UploadApiResponse;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "sharemeRK", // Your desired folder name
        resource_type: "auto",
      });
    } catch (error: any) {
      console.log("Cloudinary error:", error?.message || error);
      return res.status(400).json({
        message: "Cloudinary error",
        error: error?.message || error,
      });
    }

    const { originalname } = req.file;
    const { secure_url, bytes, format } = uploadedFile;

    const file = await File.create({
      filename: originalname,
      sizeInBytes: bytes,
      secure_url,
      format,
    });

    res.status(200).json({ 
      id: file._id,
      downloadPageLink: `${process.env.API_BASE_ENDPOINT_CLIENT}download/${file._id}`,
    });
  } catch (error: any) {
    console.log("Server error:", error?.message);
    res.status(500).json({ message: "Server error :(", error: error?.message });
  }
});

// ✅ GET route
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const file = await File.findById(id);
    if (!file) {
      return res.status(400).json({ message: "File does not exist" });
    }
    const { filename, format, sizeInBytes } = file;
    return res.status(200).json({
      name: filename,
      sizeInBytes,
      format,
      id,
    });
  } catch (error: any) {
    return res.status(500).json({ message: "server error", error: error?.message });
  }
});
router.get("/:id/download", async (req, res) => {
  try {
    const id = req.params.id;
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ message: "File does not exist" });
    }

    https.get(file.secure_url,(fileStream) => fileStream.pipe(res))


  } catch (error: any) {
    return res.status(500).json({ message: "server error", error: error?.message });
  }
});


export default router;
