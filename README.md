# Zakariye Mohamed — Engineering Portfolio

Next.js 16 portfolio with Sanity Studio, Tailwind, Motion animations, theme switching, and an optional Clerk-authenticated ChatKit AI Twin.

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
- Contributions are plain engineering summaries without individual PR links or status badges. More Projects includes Redis Clone and Abyss in place of MyCalibrator RE and Repo Intel, as requested by the owner. Abyss links to the owner-provided `zakiscoding/abysss` fork and retains team attribution.
- QuickBite's preview is an authentic screenshot of its deployed sign-in page. Other cards use decorative code headers. Kash returned HTTP 403, so its demo link is omitted.

## Configuration

`NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are required for CMS reads. Keep write tokens and OpenAI keys in server-only variables.

The contact form creates a `contact` document in the configured dataset. Set `SANITY_API_TOKEN` with the necessary create permission. Success means a message was saved in Studio; no email delivery is configured. Missing credentials and network failures produce visible feedback while retaining the message.

The optional AI Twin requires `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `OPENAI_API_KEY`, and `NEXT_PUBLIC_CHATKIT_WORKFLOW_ID`. Configure Clerk deployment domains and ChatKit domain settings as well. The public portfolio works without these settings and shows an unavailable message when chat is opened. Sessions are created server-side for authenticated Clerk users. Chat loads only when the sidebar opens.

For draft previews, configure `SANITY_VIEWER_TOKEN`, the Studio URL, and preview origin. No browser token is passed to `defineLive`.

## Checks

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm start
```

Lint uses the existing Biome setup; there is no ESLint configuration. Generated Sanity output is excluded. Tests cover contact validation, including malformed addresses, missing fields, oversized input, and file values. See [verification results](docs/verification.md) for browser checks and configuration limits.

Deploy through the existing Next.js/Vercel integration with the existing Sanity dataset and production environment settings. This branch does not migrate CMS data or publish a new hosting target.
