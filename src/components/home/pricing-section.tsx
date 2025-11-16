import { getUserPlan } from "@/lib/user";
import { cn } from "@/lib/utils";
import {
  containerVariants,
  itemVariants,
  pricingPlans,
} from "@/utils/constants";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import { MotionDiv, MotionSection } from "../common/motion-wrapper";

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

export default function PricingSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden"
      id="pricing"
    >
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <MotionDiv
          variants={itemVariants}
          className="flex justify-center items-center w-full pb-12 "
        >
          <h2 className="font-bold text-xl uppercase mb-8 text-blue-500">
            Pricing
          </h2>
        </MotionDiv>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

const listVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
    },
  },
};

const PricingCard = async ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: PriceType) => {
  const userPlan = await getUserPlan();
  return (
    <MotionDiv
      variants={listVariants}
      whileHover={{ scale: 1.02 }}
      className="relative w-full max-w-lg hover:scale-105 transition-all duration-300"
    >
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl",
          id === "pro" && "border-blue-500 gap-5 border-2"
        )}
      >
        {/* Highlight "Pro" plan */}
        <MotionDiv
          variants={listVariants}
          className="flex justify-between items-center gap-4"
        >
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </MotionDiv>

        <MotionDiv variants={listVariants} className="flex gap-2">
          <p className="text-5xl tracking-tighter font-extrabold">
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 1,
            })}
          </p>
          <div className="flex flex-col gap-1 justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">Rs</p>
            <p className="text-xs">/month</p>
          </div>
        </MotionDiv>

        <MotionDiv
          variants={listVariants}
          className="space-y-2.5 leading-relaxed text-base"
        >
          <ul>
            {items.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckIcon
                  size={16}
                  strokeWidth={1.5}
                  className="text-green-500"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </MotionDiv>

        <MotionDiv
          variants={listVariants}
          className="space-y-2 flex justify-center w-full"
        >
          <Link
            href={userPlan === id ? "/dashboard" : paymentLink}
            rel="noopener noreferrer"
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-blue-600 hover:to-blue-600 hover:from-blue-900 transition-all duration-500 h-12 text-white font-semibold text-lg",
              id === "pro"
                ? "border-blue-900"
                : "border-blue-200 from-blue-400 to-blue-500"
            )}
          >
            {userPlan === id ? (
              "You already have this plan"
            ) : (
              <>
                Buy Now{" "}
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="text-white"
                />
              </>
            )}
          </Link>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};
