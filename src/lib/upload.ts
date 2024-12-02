import { put } from "@vercel/blob";
import { nanoid } from "nanoid";

export async function uploadImage(file: File): Promise<string> {
  try {
    // Generate a unique filename using nanoid
    const filename = `${nanoid()}-${file.name}`;

    // Upload to Vercel Blob
    const { url } = await put(filename, file, {
      access: "public",
      addRandomSuffix: true, // Adds an additional random suffix for uniqueness
    });

    return url;
  } catch (error) {
    console.error("Error uploading to Vercel Blob:", error);
    throw new Error("Failed to upload image");
  }
}

// Helper function to handle multiple image uploads
export async function uploadImages(files: File[]): Promise<string[]> {
  try {
    const uploadPromises = files.map((file) => uploadImage(file));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error uploading multiple images:", error);
    throw new Error("Failed to upload images");
  }
}
