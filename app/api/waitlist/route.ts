import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, intent } = await request.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Placeholder: persist email/intent in your CRM or datastore.
  console.log("Waitlist submission", { email, intent });

  return NextResponse.json({
    message: "You're on the list. We'll be in touch soon."
  });
}

