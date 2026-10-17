import { test } from "node:test";
import assert from "node:assert/strict";
import { handleContact } from "../src/lib/contact-handler";
const valid = {
  name: "Test Executive",
  email: "executive@example.com",
  company: "Example",
  title: "COO",
  companySize: "$50M–$100M revenue",
  primaryInterest: "AI Adoption Review",
  message: "Website QA only",
  website: "",
  source: "/contact",
  requestId: "798e19ba-4148-4c95-81bd-d6df78311885",
  utm: { utm_source: "qa" },
};
const config = {
  url: "https://delivery.example.test/intake",
  token: "test-only-token",
};
function request(body: unknown = valid, origin = "http://localhost:3000") {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify(body),
  });
}
function upstream(status: number, body: unknown) {
  return (async () => Response.json(body, { status })) as typeof fetch;
}
test("missing delivery configuration never reports success", async () => {
  const res = await handleContact(request(), {});
  assert.equal(res.status, 503);
  assert.equal((await res.json()).ok, false);
});
test("invalid email, missing role, unknown interest and whitespace names are rejected before delivery", async () => {
  for (const patch of [
    { email: "bad" },
    { title: "" },
    { primaryInterest: "invented" },
    { name: "  " },
  ]) {
    let called = false;
    const res = await handleContact(
      request({ ...valid, ...patch }),
      config,
      (async () => {
        called = true;
        throw Error();
      }) as typeof fetch,
    );
    assert.equal(res.status, 400);
    assert.equal(called, false);
  }
});
test("cross-origin request is rejected", async () => {
  const res = await handleContact(
    request(valid, "https://unrelated.example"),
    config,
  );
  assert.equal(res.status, 403);
});
test("honeypot never receives false success", async () => {
  const res = await handleContact(
    request({ ...valid, website: "spam" }),
    config,
  );
  assert.equal(res.status, 400);
});
test("oversized bodies are rejected", async () => {
  assert.equal(
    (
      await handleContact(
        request({ ...valid, message: "x".repeat(13000) }),
        config,
      )
    ).status,
    413,
  );
});
test("malformed JSON and unsupported content types are rejected", async () => {
  const bad = new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      Origin: "http://localhost:3000",
      "Content-Type": "application/json",
    },
    body: "{",
  });
  assert.equal((await handleContact(bad, config)).status, 400);
  const wrong = new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { Origin: "http://localhost:3000", "Content-Type": "text/plain" },
    body: "a",
  });
  assert.equal((await handleContact(wrong, config)).status, 415);
});
test("upstream failure, missing receipt and misleading ok do not report success", async () => {
  for (const [status, body] of [
    [500, { error: "down" }],
    [200, { ok: true }],
    [200, { accepted: true }],
    [200, { accepted: true, receiptId: "" }],
    [200, { accepted: false, receiptId: "id" }],
  ] as const) {
    const res = await handleContact(request(), config, upstream(status, body));
    assert.equal(res.status, 502);
    assert.equal((await res.json()).ok, false);
  }
});
test("rate limiting is passed through with retryable feedback", async () => {
  assert.equal(
    (
      await handleContact(
        request(),
        config,
        upstream(429, { error: "limited" }),
      )
    ).status,
    429,
  );
});
test("network errors never report success", async () => {
  const res = await handleContact(request(), config, (async () => {
    throw new Error("network down");
  }) as typeof fetch);
  assert.equal(res.status, 502);
});
test("non-HTTPS delivery configuration fails closed", async () => {
  assert.equal(
    (await handleContact(request(), { url: "http://bad.test", token: "x" }))
      .status,
    503,
  );
});
test("only explicit durable acceptance produces success; retry key is stable", async () => {
  const sent: RequestInit[] = [];
  const send = (async (_url: unknown, init: RequestInit) => {
    sent.push(init);
    return Response.json({ accepted: true, receiptId: "qa-receipt" });
  }) as typeof fetch;
  for (let i = 0; i < 2; i++) {
    const res = await handleContact(request(), config, send);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { ok: true, receiptId: "qa-receipt" });
  }
  const headers = sent.map((s) => new Headers(s.headers));
  assert.equal(
    headers[0].get("Idempotency-Key"),
    headers[1].get("Idempotency-Key"),
  );
  assert.equal(headers[0].get("Authorization"), "Bearer test-only-token");
  const body = JSON.parse(String(sent[0].body));
  assert.equal(body.type, "intermix.contact");
  assert.equal("website" in body, false);
  assert.equal(body.source, "/contact");
});
test("configured public origin is accepted behind a hosting proxy", async () => {
  const res = await handleContact(
    request(valid, "https://preview.example.com"),
    { ...config, allowedOrigins: ["https://preview.example.com"] },
    upstream(200, { accepted: true, receiptId: "qa-receipt" }),
  );
  assert.equal(res.status, 200);
});
