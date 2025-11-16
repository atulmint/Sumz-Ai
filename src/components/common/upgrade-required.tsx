import { ArrowRight, Sparkles } from "lucide-react";
import BgGradient from "./bg-gradient";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UpgradeRequired() {
  return (
    <div className="relative min-h-[70vh]">
      <BgGradient className="from-blue-500 to-purple-500" />
      <div className="container px-8 py-16">
        <div className="flex flex-col items-center justify-center gap-8 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-blue-500">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-wide">Premium Feature</span>
          </div>
          <h1 className="text-4xl tracking-tight font-bold bg-linear-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
            Subscribe to a plan to continue
          </h1>
          <p className="text-lg leading-8 text-gray-600 border-2 border-blue-200 rounded-lg p-6 border-dashed max-w-xl backdrop-blur-xs bg-white/50">
            You need to subscribe to the Basic or Pro plan to access this feature 😊
          </p>
          <Button
            asChild
            className="bg-linear-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
          >
            <Link href="/#pricing" className="flex gap-2 items-center">
              View Plans <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
