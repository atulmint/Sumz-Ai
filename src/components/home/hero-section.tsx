import { verifyUserPayment } from "@/actions/user-actions";
import { containerVariants, itemVariants } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import {
    MotionDiv,
    MotionH1,
    MotionH2,
    MotionSection,
    MotionSpan,
} from "../common/motion-wrapper";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const buttonVariants = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300, damping: 10 },
};

export default async function HeroSection() {
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress || null;
    const userPlan = userEmail ? await verifyUserPayment(userEmail) : null;

    return (
        <MotionSection
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative mx-auto flex flex-col items-center justify-center z-0 py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl"
        >
            <MotionDiv
                variants={itemVariants}
                className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-blue-200 to-blue-800 animate-gradient-x group"
            >
                <Badge
                    variant={"secondary"}
                    className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200"
                >
                    <Sparkles size={20} className="mr-2 text-blue-600 animate-pulse" />
                    <p className="text-blue-600">AI Integrated</p>
                </Badge>
            </MotionDiv>

            <MotionH1
                variants={itemVariants}
                className="font-bold py-6 text-center text-4xl sm:text-5xl lg:text-6xl flex flex-wrap justify-center gap-x-2 gap-y-3"
            >
                <span className="relative inline-flex items-center">
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.6,
                                delay: 0.2,
                                type: "spring",
                                stiffness: 200,
                            },
                        }}
                        className="mr-1 text-3xl animate-zigzag"
                    >
                        ⚡
                    </MotionDiv>
                    Generate
                </span>

                <span className="relative inline-flex items-center">powerful</span>

                <span className="relative inline-block">
                    <MotionSpan
                        whileHover={buttonVariants}
                        className="relative z-10 px-2"
                    >
                        Summaries 🚀
                    </MotionSpan>
                    <span
                        className="absolute inset-0 bg-blue-200/50 -rotate-2 rounded-lg transform -skew-y-1"
                        aria-hidden="true"
                    ></span>
                </span>
                <span className="relative inline-flex items-center">with your</span>

                <span className="relative inline-flex items-center">PDFs
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.6,
                                delay: 0.2,
                                type: "spring",
                                stiffness: 200,
                            },
                        }}
                        className="mr-1 text-3xl animate-float rotate-6"
                    >
                        📑
                    </MotionDiv>
                </span>
            </MotionH1>

            <MotionH2
                variants={itemVariants}
                className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600"
            >
                Summarize any PDF in seconds
            </MotionH2>

            <MotionDiv variants={itemVariants} whileHover={buttonVariants}>
                <Link
                    href={userEmail ? "/upload" : "/sign-in"}
                    className="flex gap-2 items-center"
                >
                    <Button
                        variant={"link"}
                        className="text-white mt-6 text-base sm:text-lg lg:text-xl 
                    rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r group hover:no-underline
                    from-slate-900 to-blue-800 hover:to-slate-900 hover:from-blue-800 font-bold shadow-lg transition-all duration-300"
                    >
                        Try it now
                        <ArrowRight size={20} className="animate-pulse" />
                    </Button>
                </Link>
            </MotionDiv>
        </MotionSection>
    );
}
