import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      // Getting the authentication token from Clerk
      const user = await currentUser();

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload completed for user id", metadata.userId);
      console.log("File URL", file.url);

      return {
        userId: metadata.userId,
        file: {
          name: file.name,
          size: file.size,
          type: file.type,
          customId: file.customId,
          key: file.key,
          url: file.url,
        },
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
