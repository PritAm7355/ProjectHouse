// routes/cloudinary.js
import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("🔐 Cloudinary Config:");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET);
// routes/cloudinary.js
// ✅ server.js or controller


router.post("/generate-signature", (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "projectzips";

  const paramsToSign = {
    timestamp,
    folder,
  };

  const queryString = Object.keys(paramsToSign)
    .sort()
    .map((key) => `${key}=${paramsToSign[key]}`)
    .join("&");

  const signature = crypto
    .createHash("sha1")
    .update(queryString + process.env.CLOUDINARY_API_SECRET)
    .digest("hex");

  res.json({
    timestamp,
    signature,
    folder,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
});


export default router;
