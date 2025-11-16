  import BgGradient from "@/components/common/bg-gradient";
  import { Skeleton } from "@/components/ui/skeleton";
  import LoadingSkeleton from "@/components/upload/loading-skeleton";
  // import { cn } from "@/lib/utils";
  import { FileText } from "lucide-react";

  function HeaderSkeleton() {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <Skeleton className="h-8 w-32 rounded-full bg-white/80" />
          <Skeleton className="h-5 w-40 rounded-full bg-white/80" />
        </div>
        <Skeleton className="h-12 w-3/4 rounded-full bg-white/80" />
      </div>
    );
  }

  export default function LoadingSummary() {
    return (
      <div className="min-h-screen relative">
        <BgGradient className="bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200" />
        <div className="container mx-auto flex flex-col gap-4">
          <div className="px-4 sm:px-6 lg:px-8 sm:py-12 lg:py-24">
            <div className="flex flex-col gap-8">
              <HeaderSkeleton />
              <div className="relative overflow-hidden">
                <div className="relative p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-blue-50/30 to-transparent opacity-50 rounded-2xl" />
                  <div className="absolute top-4 right-4 text-blue-300/20">
                    <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                  </div>
                  <div className="relative">
                    <LoadingSkeleton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
