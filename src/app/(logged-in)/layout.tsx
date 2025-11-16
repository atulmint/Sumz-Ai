import { verifyReachedUploadLimit } from "@/actions/user-actions";
import { getUserFromDb, getUserPlan, hasActivePlan } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Upload PDF 📄 | SumzAI",
  description: "Upload your PDF and generate a summary with AI",
  openGraph: {
    images: [{ url: "/opengraph-image.png" }],
  },
};

export default async function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  // The check seems redundant since the user is already verified above. But it's a double check.
  const userExistsInDatabase = await getUserFromDb(user.emailAddresses[0].emailAddress);
  if (!userExistsInDatabase) {
    redirect("/sign-in");
  }

  // const hasActiveSubscription = await hasActivePlan(
  //   user.emailAddresses[0].emailAddress,
  // );
  // const reachedUploadLimit = await verifyReachedUploadLimit(
  //   user.emailAddresses[0].emailAddress,
  // );

  // if (!hasActiveSubscription ) {
  //   return <UpgradeRequired />;
  // }

  return <section className="min-h-screen">{children}</section>;
}
