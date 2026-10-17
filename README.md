# Intermix AI website

Next.js implementation recovered from `intermix-site-v1.zip` and updated around the September AI Adoption Review and Executive Introduction Guide. This is a local implementation, not a deployed or fully verified launch.

## Run

Node 22 or later:

```bash
npm ci
npm run dev
```

Production and verification:

```bash
npm run build
npm run typecheck
npm run test
python3 scripts/check-http.py
npm start
```

The HTTP check launches a temporary production server and checks the unconfigured integration state. It expects no live contact-delivery environment variables.

## Source and scope

Local branch: `feat/executive-website`. Original archive baseline: `recovery/source-archive`. There is no authenticated or verified GitHub remote in this checkout. Do not treat this branch as pushed.

Core routes: Home, AI Adoption Review (`/services`), About, FAQ and Contact. Methodology and audience appear on Home. A factual website data notice is at `/privacy`. Older paths redirect to current content. Unavailable framework downloads return 410.

The primary structured content is `content/site.json`; page-specific copy is in `src/app`. Visual tokens and responsive rules are in `src/app/globals.css`. No external fonts, stock imagery, animation package, client portal, analytics or invented proof points are included.

## Deployment to the existing project

1. Retrieve the actual repository and inspect its branch, history and unrelated work. Compare this recovery baseline with it before applying the change. The included bundle retains both original and modified code; do not overwrite the remote repository wholesale.
2. Apply the change on an appropriate feature branch and push it to GitHub. Reuse the existing Vercel project and its repository integration for a preview deployment.
3. Configure the variables in `.env.example`. Keep `ALLOW_INDEXING=false` for preview. Set `SITE_URL` to the approved public origin; Vercel preview URLs can also be inferred from `VERCEL_URL`.
4. Verify a real 45-minute event, booking through confirmation, intake delivery and rendered mobile/desktop behavior before release.

## Booking integration

`BOOKING_URL` must be the actual HTTPS Calendly event URL, with the event configured for 45 minutes. The widget loads on visitor request, with a direct-link fallback. Calendly owns its booking confirmation; iframe loading never produces an Intermix AI success state. The provider, event URL, availability, booking questions and confirmation email have not been verified.

## Contact delivery contract

`CONTACT_DELIVERY_URL` and `CONTACT_DELIVERY_TOKEN` configure a fixed HTTPS receiver. The server sends validated fields with bearer authentication and an `Idempotency-Key`. The receiver must durably accept the inquiry, enforce persistent rate limits, deduplicate retries and return:

```json
{"accepted": true, "receiptId": "a-real-durable-receipt"}
```

Only this explicit acknowledgment produces success. An HTTP 200 alone does not. The receiver is not implemented or provisioned in this package. It should connect to the founder’s approved inbox/CRM through the existing delivery stack. The adapter’s mocked acceptance test does not establish real delivery. Missing configuration returns 503, upstream failure returns 502, and upstream throttling returns 429. No form bodies are logged by this application.

The supplied data notice describes the code’s behavior. Final provider, business contact and retention details must be aligned with the actual operating setup before public launch.

See `DECISIONS.md` and `VALIDATION.md` for the reconciliation and exact verification limits.
