import BgGradient from "@/components/common/bg-gradient";
import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In | SumzAI",
    description:
        "Access your account and start using SumzAI to generate PDF summaries with artificial intelligence.",
    openGraph: {
        images: [{ url: "/opengraph-image.png" }],
    },
};

export default function Page() {
    return (
        <section className="flex justify-center items-center lg:min-h-[40vh]">
            <div
                className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8
            lg:pt-12"
            >
                <BgGradient />
                <SignIn />
            </div>
        </section>
    );
}
