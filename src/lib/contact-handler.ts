import { createHash } from "node:crypto";
import { contactSchema } from "./contact-schema";
const MAX_BYTES = 12000;
type DeliveryConfig = {
  url?: string;
  token?: string;
  allowedOrigins?: string[];
};
const error = (
  message: string,
  status: number,
  extra: Record<string, unknown> = {},
) =>
  Response.json(
    { ok: false, error: message, ...extra },
    { status, headers: { "Cache-Control": "no-store" } },
  );
export async function handleContact(
  request: Request,
  config: DeliveryConfig,
  send: typeof fetch = fetch,
) {
  const origin = request.headers.get("origin");
  const allowedOrigins = [
    new URL(request.url).origin,
    ...(config.allowedOrigins || []),
  ];
  if (!origin || !allowedOrigins.includes(origin))
    return error("Please send your message from this website.", 403);
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    return error("Unsupported request format.", 415);
  if (Number(request.headers.get("content-length")) > MAX_BYTES)
    return error("Message is too large.", 413);
  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return error("Enter your details.", 400);
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        return error("Message is too large.", 413);
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return error("Please check your details and try again.", 400);
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success)
    return error("Please check the highlighted fields.", 400, {
      fields: parsed.error.flatten().fieldErrors,
    });
  if (!config.url || !config.token)
    return error(
      "Messaging is temporarily unavailable. Please try again later.",
      503,
    );
  let endpoint: URL;
  try {
    endpoint = new URL(config.url);
    if (
      endpoint.protocol !== "https:" ||
      endpoint.username ||
      endpoint.password
    )
      throw new Error();
  } catch {
    return error(
      "Messaging is temporarily unavailable. Please try again later.",
      503,
    );
  }
  const { website: _honeypot, requestId, ...contact } = parsed.data;
  // The receiver must enforce durable rate limits and deduplicate this key.
  // A retry after a timeout retains the key; changing the content creates a new one.
  const key = createHash("sha256")
    .update(JSON.stringify({ requestId, ...contact }))
    .digest("hex");
  try {
    const response = await send(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.token}`,
        "Idempotency-Key": key,
      },
      body: JSON.stringify({ type: "intermix.contact", requestId, ...contact }),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
      cache: "no-store",
    });
    if (response.status === 429)
      return error(
        "Too many messages. Please wait a few minutes before trying again.",
        429,
      );
    if (!response.ok)
      return error("We could not confirm delivery. Please try again.", 502);
    const receipt = await response.json();
    if (
      receipt.accepted !== true ||
      typeof receipt.receiptId !== "string" ||
      !receipt.receiptId.trim() ||
      receipt.receiptId.length > 200
    )
      return error("We could not confirm delivery. Please try again.", 502);
    return Response.json(
      { ok: true, receiptId: receipt.receiptId },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return error("We could not confirm delivery. Please try again.", 502);
  }
}
