import { getUserPlan } from "@/lib/user";
import { ExternalLink, FileText } from "lucide-react";
import { Button } from "../ui/button";
import DownloadSummaryButton from "./download-summary-button";

export default async function SourceInfo({
    fileName,
    originalFileUrl,
    title,
    summaryText,
    createdAt,
}: {
    fileName: string;
    originalFileUrl: string;
    title: string;
    summaryText: string;
    createdAt: string;
}) {
    const userPlan = await getUserPlan();
    const isPro = userPlan === "pro";
    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
                <FileText className="h-4 w-4 text-blue-400" />
                <span>Source: {fileName}</span>
            </div>
            <div className="flex gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    asChild
                >
                    <a href={originalFileUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View original
                    </a>
                </Button>
                {isPro && (
                    <DownloadSummaryButton
                        title={title}
                        summaryText={summaryText}
                        fileName={fileName}
                        createdAt={createdAt}
                    />
                )}
            </div>
        </div>
    );
}
