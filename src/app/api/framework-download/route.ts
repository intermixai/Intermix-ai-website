import { NextRequest, NextResponse } from "next/server";

// NOTE: This route currently only validates and logs the submission.
// Per spec Section 31.9, it must forward to the firm's CRM/email via a
// transactional email service. That requires a service (e.g. Resend,
// Postmark, SendGrid) and API key, which have not been provided yet.
// Wire the TODO below once credentials are available in Vercel env vars.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, role, website, frameworkSlug, frameworkTitle } = body;

    // Honeypot check
    if (website) {
      return NextResponse.json({ ok: true }); // silently drop spam
    }

    if (!name || !email || !company || !role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // TODO: forward via transactional email service once
    // process.env.EMAIL_SERVICE_API_KEY is configured.
    console.log("Framework download lead:", {
      name,
      email,
      company,
      role,
      frameworkSlug,
      frameworkTitle,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
