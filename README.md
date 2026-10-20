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
- Contributions are plain engineering summaries without individual PR links or status badges. Redis Clone and Abyss appear once in Featured Projects. More Projects contains the two unique secondary projects: QuickBite and Amazon Prime CI/CD. Abyss links to the owner-provided `zakiscoding/abysss` fork and retains team attribution.
- Abyss has an authentic local fixture-replay screenshot; QuickBite has a deployed sign-in screenshot; Amazon Prime uses its repository pipeline diagram. The remaining cards use explicitly labeled source-based architecture diagrams. Image previews open at full size. Kash returned HTTP 403, so its demo link is omitted.

## Configuration

`NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are required for CMS reads. Keep write tokens and OpenAI keys in server-only variables.

When `SANITY_API_TOKEN` has create permission, the contact form stores a `contact` document in the configured dataset. Success means the message was saved in Studio; server email delivery is not configured. Without that token, the form becomes an email-draft composer: it validates input and opens the visitor's email app with the draft. The visitor must send it there. No successful submission is claimed, and input is retained.

The optional AI Twin requires `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `OPENAI_API_KEY`, and `NEXT_PUBLIC_CHATKIT_WORKFLOW_ID`. Configure Clerk deployment domains and ChatKit domain settings as well. The public portfolio works without these settings. The AI Twin launcher and sidebar are hidden until all required settings exist; a profile image is displayed without a chat action in that state. Sessions are created server-side for authenticated Clerk users. Chat loads only when the sidebar opens.

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
