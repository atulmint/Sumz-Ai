import BgGradient from "@/components/common/bg-gradient";
import { MotionDiv, MotionH1, MotionP } from "@/components/common/motion-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { itemVariants } from "@/utils/constants";

const HeaderSkeleton = () => (
  <div className="flex gap-4 mb-8 justify-between">
    <div className="flex flex-col gap-2">
      <MotionH1 {...motionProps} className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-600 to-gray-900 text-transparent bg-clip-text mb-6">
        <Skeleton className="h-10 w-48" />
      </MotionH1>
      <MotionDiv {...motionProps} className="text-gray-600">
        <Skeleton className="h-6 w-96" />
      </MotionDiv>
    </div>
    <MotionDiv {...motionProps} className="self-start">
      <Skeleton className="h-10 w-32" />
    </MotionDiv>
  </div>
);


const SummaryCardSkeleton = () => (
  <MotionDiv {...motionProps} className="rounded-lg border bg-card text-card-foreground shadow-sm">
    <Skeleton className="h-48 w-full rounded-lg" />
  </MotionDiv>
);

const motionProps = {
  variants: itemVariants,
  initial: "hidden",
  animate: "visible",
};

export default function LoadingSummaries() {
  return (
    <div className="min-h-screen relative">
      <BgGradient className="bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200" />
      <section className="container mx-auto py-24 px-4 sm:px-6 lg:px-10">
        <HeaderSkeleton />
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <SummaryCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
