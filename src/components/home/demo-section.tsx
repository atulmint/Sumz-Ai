import { DEMO_SUMMARY } from "@/utils/demo-summary";
import { Clock } from "lucide-react";
import BgGradient from "../common/bg-gradient";
import { MotionDiv, MotionH3 } from "../common/motion-wrapper";
import { SummaryViewer } from "../summaries/summary-viewer";

export default function DemoSection() {
    return (
        <section className="relative">
            <BgGradient />
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8
            lg:pt-12">
                <div></div>
                <div className="flex items-center gap-2 flex-col
                text-center space-y-4">
                    <div className="inline-flex items-center justify-center
                    p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20
                    mb-4">
                        <Clock className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="text-center mb-16">
                        <MotionH3 whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">
                            With SumzAI,{" "}
                            <span className="bg-linear-to-r
                        from-blue-500 to-blue-800 bg-clip-text text-transparent">
                                creating summaries
                            </span>{" "}
                            has never been easier.
                        </MotionH3>
                    </div>
                </div>
                <div className="flex items-center px-2 justify-center sm:px-4 lg:px-6">
                    <MotionDiv initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <SummaryViewer summary={DEMO_SUMMARY} />
                    </MotionDiv>
                </div>
            </div>
        </section>
    );
}
