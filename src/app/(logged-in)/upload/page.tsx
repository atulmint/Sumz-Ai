import { verifyReachedUploadLimit } from "@/actions/user-actions";
import BgGradient from "@/components/common/bg-gradient";
import { MotionDiv } from "@/components/common/motion-wrapper";
import UploadForm from "@/components/upload/upload-form";
import UploadHeader from "@/components/upload/upload-header";
import { hasReachedUploadLimit } from "@/lib/user";
import { containerVariants } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function UploadPage() {
    const user = await currentUser();

    if (!user?.id) {
        return redirect("/sign-in");
    }

    const userId = user.id;
    const userEmail = user.emailAddresses?.[0]?.emailAddress;

    // Check upload limits by user ID and email
    const [{ hasReachedLimit }, reachedUploadLimit] = await Promise.all([
        hasReachedUploadLimit(userId),
        verifyReachedUploadLimit(userEmail),
    ]);

    if (hasReachedLimit || reachedUploadLimit) {
        return redirect("/dashboard");
    }

    return (
        <section className="min-h-screen">
            <BgGradient />
            <MotionDiv
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12"
            >
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                    <UploadHeader />
                    <UploadForm />
                </div>
            </MotionDiv>
        </section>
    );
}
