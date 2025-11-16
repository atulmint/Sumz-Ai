import { verifyReachedUploadLimit } from "@/actions/user-actions";
import BgGradient from "@/components/common/bg-gradient";
import {
    MotionDiv,
    MotionH1,
    MotionP,
} from "@/components/common/motion-wrapper";
import EmptySummaryState from "@/components/summaries/empty-summary-state";
import SummaryCard from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { hasReachedUploadLimit } from "@/lib/user";
import { itemVariants } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Your Summaries | SumzAI",
    description: "Transform your PDFs into concise insights",
    openGraph: {
        images: [{ url: "/opengraph-image.png" }],
    },
};

export default async function DashboardPage() {
    const user = await currentUser();
    if (!user) {
        redirect("/sign-in");
    }

    const reachedUploadLimit = await verifyReachedUploadLimit(
        user.emailAddresses[0].emailAddress,
    );
    const userId = user?.id;

    const { hasReachedLimit, uploadLimit } = await hasReachedUploadLimit(userId);
    const summaries = await getSummaries(userId);

    // forcing variables to be boolean
    const isDisabled = !!hasReachedLimit || !!reachedUploadLimit;

    return (
        <main className="min-h-screen">
            <BgGradient className="bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200" />
            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto flex flex-col gap-4"
            >
                <div className="px-2 py-12 sm:py-24">
                    <div className="flex gap-4 mb-8 justify-between">
                        <div className="flex flex-col gap-2">
                            <MotionH1
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-600 to-gray-900 text-transparent bg-clip-text mb-6"
                            >
                                Your Summaries
                            </MotionH1>
                            <MotionP
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                className="text-gray-600"
                            >
                                Transform your PDFs into concise insights
                            </MotionP>
                        </div>
                        <MotionDiv
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ scale: 1.05 }}
                            className="self-start"
                        >
                            <Button
                                disabled={isDisabled}
                                variant="link"
                                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white hover:scale-105 transition-all duration-300 group hover:no-underline"
                            >
                                <Link href="/upload" className="flex items-center text-white">
                                    <Plus className="w-5 h-5 mr-2" />
                                    New Summary
                                </Link>
                            </Button>
                        </MotionDiv>
                    </div>

                    {hasReachedLimit && (
                        <MotionDiv
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className="mb-6"
                        >
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
                                <p>
                                    You have reached the limit of {uploadLimit} summaries on the
                                    Basic plan.{" "}
                                    <Link
                                        href="/#pricing"
                                        className="text-blue-900 hover:text-blue-800 underline font-medium underline-offset-4 inline-flex items-center gap-1"
                                    >
                                        Click here to upgrade to the PRO plan{" "}
                                        <ArrowRight className="w-4 h-4 inline-block" />
                                    </Link>
                                    to create unlimited summaries.
                                </p>
                            </div>
                        </MotionDiv>
                    )}

                    {reachedUploadLimit && (
                        <MotionDiv
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className="mb-6"
                        >
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
                                <p>
                                    You have reached the limit of 3 summaries per day.{" "}
                                    <Link
                                        href="/#pricing"
                                        className="text-blue-900 hover:text-blue-800 underline font-medium underline-offset-4 inline-flex items-center gap-1"
                                    >
                                        Click here to purchase a plan{" "}
                                        <ArrowRight className="w-4 h-4 inline-block" />
                                    </Link>
                                    to create unlimited summaries.
                                </p>
                            </div>
                        </MotionDiv>
                    )}

                    {summaries.length === 0 ? (
                        <EmptySummaryState />
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
                            {summaries.map((summary, index) => (
                                <SummaryCard key={index} summary={summary} />
                            ))}
                        </div>
                    )}
                </div>
            </MotionDiv>
        </main>
    );
}
