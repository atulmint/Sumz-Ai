import BgGradient from "@/components/common/bg-gradient";
import { MotionDiv } from "@/components/common/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { itemVariants } from "@/utils/constants";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Page not found | SumzAI",
  description: "The page you are looking for does not exist or has been removed.",
  openGraph: {
    images: [{ url: "/opengraph-image.png" }],
  },
};

const Custom404: React.FC = () => {
  return (
    <>
      <BgGradient />
      <div className="flex items-center justify-center h-[70vh] flex-col">
        <MotionDiv
          variants={itemVariants}
          className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-blue-200 to-blue-800 animate-gradient-x group"
        >
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200"
          >
            <p className="text-blue-600">Error 404</p>
          </Badge>
        </MotionDiv>
        <p className="font-bold py-6 text-center text-4xl sm:text-5xl lg:text-6xl flex flex-wrap justify-center gap-x-2 gap-y-3">
          Oops! Page not found.
        </p>
        <p>
          <Link
            href="/"
            className="text-blue-500 text-lg font-medium underline mt-8"
            aria-label="Back to homepage"
          >
            Back to homepage
          </Link>
        </p>
      </div>
    </>
  );
};

export default Custom404;
