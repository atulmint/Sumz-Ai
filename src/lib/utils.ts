import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines Tailwind classes and resolves conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formats a file name from a URL: removes extension, replaces hyphens/underscores with spaces, and capitalizes words
export function formatFileName(url: string): string {
  const fileName = url.split("/").pop() || "";

  return fileName
    .replace(/\.[^.]+$/, "") // Remove file extension
    .replace(/[-_]/g, " ") // Replace hyphens and underscores with spaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(" ");
}
