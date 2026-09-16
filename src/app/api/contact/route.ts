import { NextRequest, NextResponse } from "next/server";

// NOTE: See same TODO as /api/framework-download — needs a transactional
// email service + API key configured in Vercel before this forwards
// real submissions anywhere.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      company,
      title,
      companySize,
      primaryInterest,
      message,
      website,
    } = body;

    if (website) {
      return NextResponse.json({ ok: true }); // honeypot - silently drop
    }

    if (!name || !email || !company) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    console.log("Contact form submission:", {
      name,
      email,
      company,
      title,
      companySize,
      primaryInterest,
      message,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
