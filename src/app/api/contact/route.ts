import { handleContact } from "@/lib/contact-handler";
import { siteOrigin } from "@/lib/site";
export const runtime = "nodejs";
export async function POST(request: Request) {
  return handleContact(request, {
    url: process.env.CONTACT_DELIVERY_URL,
    token: process.env.CONTACT_DELIVERY_TOKEN,
    allowedOrigins: [
      siteOrigin(),
      ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ],
  });
}
