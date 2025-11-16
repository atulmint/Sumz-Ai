import { Badge } from "@/components/ui/badge";
import { getUserPlan } from "@/lib/user";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

export default async function PlanBadge() {
  const userPlan = await getUserPlan();
  console.log("userPlan", userPlan);
  return (
    <Badge
      variant="outline"
      className={cn(
        "ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center justify-center",
        !userPlan && "from-red-100 to-red-200 border-red-300",
      )}
    >
      <Crown
        className={cn(
          "w-3 h-3 mr-1 text-amber-600",
          !userPlan && "text-red-600",
        )}
      />
      {userPlan === "pro"
        ? "Pro"
        : userPlan === "basic"
          ? "Basic"
          : "Purchase a plan"}
    </Badge>
  );
}
