import { isDev } from "./helpers";

export const pricingPlans = [
  {
    name: "Basic",
    price: 49,
    description: "For occasional users",
    items: ["Storage for 5 summaries", "Standard processing", "Email support"],
    id: "basic",
    paymentLink: "https://buy.stripe.com/test_4gM5kCeQk2kbbWwbuNgnK01",
    priceId:  "price_1RifIaCLB6Cc89BsPP3IiqHV",
  },
  {
    name: "Pro",
    price: 149,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 support",
    ],
    id: "pro",
    paymentLink: "https://buy.stripe.com/test_cNicN48rW0c35y8dCVgnK00",
    priceId: "price_1RifIaCLB6Cc89Bs8BDkuTPa",
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    transition: { type: "spring", stiffness: 50, damping: 15, duration: 0.8 },
  },
};
