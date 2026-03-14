"use client";

import {
    generatePdfSummary,
    generatePdfText,
    storePdfSummaryAction,
} from "@/actions/upload-actions";
import addUploadToCount from "@/actions/user-actions";
import UploadFormInput from "@/components/upload/upload-form-input";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useUploadThing } from "../../utils/uploadthing";
import LoadingSkeleton from "./loading-skeleton";

const schema = z.object({
    file: z
        .instanceof(File, { message: "Invalid file" })
        .refine(
            (file) => file.size <= 24 * 1024 * 1024,
            "File must be less than 24MB",
        )
        .refine(
            (file) => file.type === "application/pdf",
            "File must be a PDF",
        ),
});

export default function UploadForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { user } = useUser();

    const formRef = useRef<HTMLFormElement>(null);
    const { startUpload } = useUploadThing("pdfUploader", {
        onClientUploadComplete: () => {
            console.log("Upload completed");
        },
        onUploadError: (error: Error) => {
            console.error("Upload error:", error);
            toast.error(`Upload failed: ${error.message}`);
            setIsLoading(false);
        },
        onUploadBegin: () => {
            console.log("Uploading...");
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            console.log("submitted");
            const formData = new FormData(e.currentTarget);
            const file = formData.get("file") as File;

            // Validate file
            const validatedFields = schema.safeParse({ file });
            if (!validatedFields.success) {
                const errorMessage =
                    validatedFields.error.errors?.[0]?.message || "Something went wrong!";
                toast.error(errorMessage);
                setIsLoading(false);
                return;
            }

            toast.info("📄 Uploading file...");

            const response = await startUpload([file]);
            if (!response || response.length === 0) {
                toast.error(
                    "Upload failed. Check your connection and try again. Ensure UPLOADTHING_TOKEN is set in Vercel.",
                );
                setIsLoading(false);
                return;
            }

            toast.info("File uploaded! Our AI is reading your file... ✨");

            let storeResult: any;

            const formattedFileName = formatFileNameAsTitle(file.name);

            const result = await generatePdfText(response[0].serverData.file.url);

            if (!result?.success || !result.data?.pdfText) {
                toast.error(result?.error ?? "Failed to read PDF. Try a different file.");
                setIsLoading(false);
                return;
            }

            toast.info("Generating PDF summary... ✨");

            const summaryResult = await generatePdfSummary({
                pdfText: result.data.pdfText,
                fileName: formattedFileName,
            });

            toast.info("Summary generated! ✨");

            const { data = null } = summaryResult || {};

            if (!data?.summary) {
                toast.error(summaryResult?.error ?? "Failed to generate summary. Check API keys (GEMINI_API_KEY) in Vercel.");
                setIsLoading(false);
                return;
            }

            toast.info("Saving your summary... ✨");

            storeResult = await storePdfSummaryAction({
                fileUrl: response[0].serverData.file.url,
                summary: data.summary,
                title: formattedFileName,
                fileName: file.name,
            });

            toast.success("✨ Summary successfully generated!");

            const primaryEmail = user?.emailAddresses?.[0]?.emailAddress;
            if (primaryEmail) {
                await addUploadToCount(primaryEmail);
            }

            formRef.current?.reset();
            router.push(`/summaries/${storeResult.data.id}`);
        } catch (error) {
            console.error("Error uploading file", error);
            toast.error(
                error instanceof Error ? error.message : "Something went wrong. Try again.",
            );
            formRef.current?.reset();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
            <UploadFormInput
                isLoading={isLoading}
                ref={formRef}
                onSubmit={handleSubmit}
            />
            {isLoading && (
                <>
                    <div className="relative">
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            aria-hidden="true"
                        >
                            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                        </div>
                        <div className="relative flex justify-center mt-4">
                            <span className="bg-transparent px-3 py-1.5 text-muted-foreground text-sm">
                                Processing
                            </span>
                        </div>
                    </div>
                    <LoadingSkeleton />
                </>
            )}
        </div>
    );
}
