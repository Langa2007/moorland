import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";

export function isCloudinaryConfigured() {
  return Boolean(env.cloudinaryCloudName && env.cloudinaryApiKey && env.cloudinaryApiSecret);
}

export async function uploadImage(file) {
  if (!isCloudinaryConfigured()) {
    return null;
  }

  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret
  });

  const result = await cloudinary.uploader.upload(file.path, {
    folder: env.cloudinaryFolder,
    resource_type: "image",
    use_filename: true,
    unique_filename: true,
    overwrite: false
  });

  await fs.unlink(file.path).catch(() => {});

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes
  };
}

export async function deleteImage(publicId) {
  if (!publicId || !isCloudinaryConfigured()) return null;
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret
  });
  return cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}
