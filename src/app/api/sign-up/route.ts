import { getDbConnection } from "@/lib/db";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export const POST = async (req: Request) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;
  const headerPayload = await headers();

  const svix_id = headerPayload.get("svix-id") as string;
  const svix_timestamp = headerPayload.get("svix-timestamp") as string;
  const svix_signature = headerPayload.get("svix-signature") as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing headers" }, { status: 400 });
  }

  const payload = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }

  const eventType = evt.type;
  const data = evt.data;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = data;

    if (!email_addresses || email_addresses.length === 0) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 400 },
      );
    }

    const supabase = await getDbConnection();

    try {
      const { error } = await supabase.from("users").insert({
        email: email_addresses[0].email_address,
        full_name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      });
      if (error) throw error;
      console.log("User saved successfully:", {
        email: email_addresses[0].email_address,
        full_name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      });
    } catch (error) {
      console.error("Error saving user:", error);
      return NextResponse.json(
        { error: "Error saving user" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    { message: "Webhook processed successfully" },
    { status: 200 },
  );
};
