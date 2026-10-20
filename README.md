# Zakariye Mohamed — Engineering Portfolio

Next.js 16 portfolio with Sanity Studio, Tailwind, Motion animations, theme switching, and an optional Clerk-authenticated AI Twin.

The current interface follows the owner's cyberpunk reference: plum backgrounds, neon pink/lime panels, cyan details, angular surfaces, and monospace labels. The default theme is dark; light and system themes remain available. The new theme preference uses `portfolio-cyber-theme` in browser storage. The hero's engineering graphic is built in React/CSS and does not require image assets.

## Development

Use Node.js 22.18+ or 24 and pnpm 10. On Windows, use `npx.cmd` if PowerShell restricts the script launcher.

```sh
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Open http://localhost:3000. Studio remains at `/studio`. The example uses verified public identifiers for the existing Sanity dataset; use your own values for an isolated deployment. Do not import `Data/` into production: it contains dummy seed records.

## Content ownership

See [the audit](docs/portfolio-audit.md) and [project evidence](docs/project-evidence.md).

- `lib/portfolio.ts` owns reviewed branding, about text, skills, experience, education, projects, supplemental credentials, and contribution descriptions. `components/FloatingDock.tsx` owns navigation anchors. These local editorial choices override older CMS content without changing documents.
- Sanity supplies profile name, contact details, profile image, existing certifications, achievements, services, and blog content. The owner-provided eCornell credential is a local supplement. Live content and draft previews remain enabled for these sections.
- Revise curated sections through a reviewed PR. Editing corresponding older Studio records will not update those sections until an explicit CMS migration is implemented.
- TaskMesh was excluded at the owner's request; Housing Price MLOps fills its featured slot. Redis Clone is described from the latest verified C implementation, including TCP, RESP, key expiration, and string/list operations.
- Contributions are plain engineering summaries without individual PR links or status badges. Redis Clone and Abyss appear once in Featured Projects. More Projects contains the two unique secondary projects: QuickBite and Amazon Prime CI/CD. Abyss links to the owner-provided `zakiscoding/abysss` fork and retains team attribution.
- Abyss has an authentic local fixture-replay screenshot; QuickBite has a deployed sign-in screenshot; Amazon Prime uses its repository pipeline diagram. The remaining cards use explicitly labeled source-based architecture diagrams. Image previews open at full size. Kash returned HTTP 403, so its demo link is omitted.

## Configuration

`NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are required for CMS reads. Keep write tokens and OpenAI keys in server-only variables.

When `SANITY_API_TOKEN` has create permission, the contact form stores a `contact` document in the configured dataset. Success means the message was saved in Studio; server email delivery is not configured. Without that token, the form becomes an email-draft composer: it validates input and opens the visitor's email app with the draft. The visitor must send it there. No successful submission is claimed, and input is retained.

The optional AI Twin requires `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, and `OPENAI_API_KEY`. Configure Clerk deployment domains as well. `OPENAI_TWIN_MODEL` optionally overrides the tested `gpt-4.1-mini` default. The assistant calls the Responses API server-side with reviewed portfolio content and bounded conversation history. No Agent Builder workflow is required. The launcher is hidden until credentials exist; chat loads on first open. Conversation state and drafts survive panel closure on desktop and mobile; they reset when the signed-in user changes. Answers are rendered as text; empty responses and connection failures show a retryable error and restore the visitor's draft. Chat turns are encrypted in the owner analytics store when configured, with a visible notice in chat. OpenAI API requests continue to use `store: false`.

For draft previews, configure `SANITY_VIEWER_TOKEN`, the Studio URL, and preview origin. No browser token is passed to `defineLive`.

## Checks

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm start
```

Lint uses the existing Biome setup; there is no ESLint configuration. Generated Sanity output is excluded. Tests cover contact validation and email-draft encoding, including malformed addresses, missing fields, oversized input, file values, special characters, and multiline subjects. See [verification results](docs/verification.md) for browser checks and configuration limits.

Deploy through the existing Next.js/Vercel integration with the existing Sanity dataset and production environment settings. This branch does not migrate CMS data or publish a new hosting target.

Navigation and theme controls live in the sticky page header, with a mobile disclosure menu and Escape handling. There are no floating bottom controls covering project text. Project cards show two concise highlights; native Engineering details disclosures retain the complete accomplishments, stack and additional source links.


The AI Twin runner shares high scores through Sanity (`runnerScore` documents). `/api/runner` assigns persistent guest identities with an HTTP-only cookie, uses Clerk names for authenticated players, and only updates a player's personal best. Public responses contain display names, scores, and opaque identifiers. A Sanity write token is required to save scores; reads and writes bypass caches, and the browser refreshes the shared top five every 30 seconds.


Private analytics live at `/analytics` (`/dashboard` redirects there). Owner access requires a verified Clerk address matching `ANALYTICS_OWNER_EMAIL` (default: `mon245365@gmail.com`, the owner's GitHub sign-in address). `ANALYTICS_ENCRYPTION_KEY` must be a stable 32-byte key encoded as 64 hex characters; keep the same key in deployment environments that share this dataset. It was generated in local `.env.local` and must be configured on Vercel before deploying. Never rotate it without migrating encrypted records. Analytics store encrypted visit and observed sign-in-session events in Sanity; no IP addresses or device memory are collected. Guest unique counts are cookie-based estimates, not a count of identified people. The dashboard shows 7/30-day totals and up to the latest 5,000 events; it is not historical Clerk audit data.


Owner analytics also summarize chat attempts/successes/failures and response latency, approximate chat topics, game starts/completed runs and scores, project-link clicks, and resume-download clicks. Conversation turns are captured from the chat endpoint, encrypted with the existing analytics key, grouped by user and conversation, and displayed only after the owner access check. Chat displays a storage notice. Old messages and activity are not backfilled; game completions count successful score submissions. Analytics writes run after API responses and failures do not prevent chat or gameplay.
