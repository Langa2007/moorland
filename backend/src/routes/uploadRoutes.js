import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "../db/index.js";
import { env } from "../config/env.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { AppError, asyncHandler, notFound } from "../utils/errors.js";
import { createId, now } from "../utils/ids.js";
import { deleteImage, uploadImage } from "../services/cloudinaryService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, "../../uploads");

const blockedMimeTypes = new Set(["image/svg+xml"]);
const extensionByMimeType = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
  "image/gif": ".gif",
  "image/bmp": ".bmp",
  "image/tiff": ".tiff",
  "image/heic": ".heic",
  "image/heif": ".heif"
};

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadsDir),
  filename: (_req, file, callback) => {
    const ext = path.extname(file.originalname).toLowerCase() || extensionByMimeType[file.mimetype] || ".jpg";
    callback(null, `${Date.now()}-${createId("img")}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (!file.mimetype?.startsWith("image/") || blockedMimeTypes.has(file.mimetype)) {
      return callback(new AppError("Upload a valid picture file: JPG, JPEG, PNG, WebP, AVIF, GIF, BMP, TIFF, HEIC, or HEIF.", 422));
    }
    return callback(null, true);
  }
});

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.post("/image", upload.single("image"), asyncHandler(async (req, res, next) => {
  if (!req.file) return next(new AppError("Image file is required", 422));

  const cloudinaryImage = await uploadImage(req.file);
  const record = await db.insert("uploads", {
    id: createId("upload"),
    originalName: req.file.originalname,
    fileName: req.file.filename,
    mimeType: req.file.mimetype,
    size: cloudinaryImage?.bytes || req.file.size,
    url: cloudinaryImage?.url || `${env.publicBaseUrl}/uploads/${req.file.filename}`,
    publicId: cloudinaryImage?.publicId || "",
    width: cloudinaryImage?.width || null,
    height: cloudinaryImage?.height || null,
    provider: cloudinaryImage ? "cloudinary" : "local",
    createdAt: now(),
    updatedAt: now()
  });

  return res.status(201).json({ success: true, data: record });
}));

router.get("/", asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await db.get("uploads") });
}));

router.delete("/:id", asyncHandler(async (req, res, next) => {
  const record = await db.remove("uploads", req.params.id);
  if (!record) return next(notFound("Upload not found"));
  await deleteImage(record.publicId).catch(() => null);
  return res.json({ success: true, data: record });
}));

export default router;
