# Validation and remaining work

Status as of September 16, 2026: implemented locally, not deployed. The definition of done remains unmet because no Vercel preview or real external submission has been verified.

## Passed

- Production build with Next.js 16.3.5 and React 19.3.0, including TypeScript.
- Twelve intake handler tests: required fields and email, whitespace, enum validation, malformed JSON, oversized request, wrong content type, honeypot, origin checks, hosting-proxy public origin, missing credentials, non-HTTPS receiver, network failure, upstream rejection, missing/false receipt, throttling, accepted receipt and stable retry key. Several tests cover multiple cases.
- All six core/data-notice routes return HTTP 200. One H1 and page descriptions, canonical/OG/Twitter metadata are present on each.
- All rendered internal links and fragment targets resolve.
- Legacy route redirects resolve to current content. Unknown pages return 404.
- SVG favicon, generated 1200×630 PNG social card, robots and sitemap endpoints return successfully.
- Preview defaults are noindex/nofollow, robots disallow indexing and the sitemap is empty.
- All contact fields have associated labels. Required attributes, visible error associations, a skip link, focus styles and reduced-motion CSS are implemented.
- Calculated contrast for the main foreground/background combinations exceeds 4.5:1, including gold labels on cream/paper, dark body text, dark-section text, button text and errors.
- Real local HTTP contact submission without configured integration returns 503 and `ok:false`.
- No runtime errors appeared during the production HTTP route checks.
- `git diff --check` passes.

## Not verified

- Rendered desktop/mobile layouts, keyboard menu behavior, client-side form loading/error/success focus and JavaScript console. The available review browser could not open the isolated local preview (`ERR_BLOCKED_BY_CLIENT`). Static/HTTP checks do not substitute for visual or interaction QA.
- Live GitHub repository state, push, pull request and Vercel preview deployment. GitHub and Vercel access were unavailable and the suggested connections were declined.
- The actual scheduling provider/event, 45-minute configuration, availability, booking intake fields, timezone handling and confirmation/email behavior. Calendly access was declined and no event URL was available.
- Real inbox/CRM delivery, durable acceptance, upstream idempotency and persistent rate limiting. The receiver is still an integration requirement. Unit tests use a mock receiver; they are not a live send.
- Final production domain/indexing and data-notice alignment with the actual provider/retention setup.

## Required continuation

Open the existing repository in an authenticated development workspace with its Vercel project available. Inspect current remote work, integrate this branch, configure the approved event and delivery receiver, then verify the deployed preview on desktop/mobile and complete one authorized test booking and message through confirmation.
