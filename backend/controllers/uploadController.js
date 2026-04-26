const cloudinary = require('cloudinary').v2;

const uploadVideo = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    resource_type: "video",
    folder: "sticker_stories",
    // YE HAI COMPRESSION LOGIC:
    transformation: [
      { width: 720, crop: "limit" }, // Resolution control
      { quality: "auto:low" },       // Sabse zyada compression
      { fetch_format: "mp4" }        // Standard format
    ]
  });
};