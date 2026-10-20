# Portfolio audit — 2026-10-19

Recorded before implementation on `feat/backend-infrastructure-portfolio`.

## Content and production

- Next.js 16 App Router; server section components query Sanity with `sanityFetch`. Tailwind, Motion, ripple background, floating dock, theme toggle and chat sidebar define the current visual identity.
- The deployed portfolio at https://zakariye-mohamed.vercel.app identifies Sanity project `ixgn95yg`, dataset `develop`. A read-only published-document query confirmed the actual profile, 3 experiences, 1 education, 22 skills, 10 projects and 9 navigation records. No credentials are present in this checkout.
- `Data/README.md` explicitly labels its NDJSON as dummy data. Do not import it into production. No dataset mutations are part of this change.
- Current production branding is full-stack, IBM is still current, and InComm, Cornell and Georgia Tech are absent. Skills use arbitrary percentages. Project cards show only a tagline and four technologies. There is no contributions section.
- The task's requested, verified editorial content will live in `lib/portfolio.ts`, with source evidence here and in `docs/project-evidence.md`. Sanity remains authoritative for profile identity, contact details, images and other existing sections. The updated sections deliberately use reviewed local content rather than silently writing CMS records. Updating those sections in Studio will not override the editorial file; a future CMS migration must be explicit.

## Functional findings

- Both app layouts render html/body and ClerkProvider, producing invalid nested document roots.
- Chat is fetched/rendered even when the sidebar is closed. Authentication/configuration errors can surface as generic server-component failures; no unavailable state is provided.
- `defineLive` passes `SANITY_API_TOKEN` as `browserToken`. Remove this setting; privileged tokens must remain server-only.
- Contact submission accepts untyped/unbounded fields, has no email validation or configuration check, returns the whole created record, and its client lacks exception handling and accessible status feedback.
- Navigation comes from CMS and may refer to missing sections. Preserve the dock and explicitly include valid primary anchors and contributions.
- There is no test runner or ESLint configuration; lint uses Biome. Dependencies must be installed before baseline checks.

## Evidence constraints

- All nine user-supplied resume PDFs were read. Base AI/Infra/Software variants agree on role dates. Underscore variants add Georgia Tech admission and May 2028 completion; use the task's explicit enrollment-after-May-2027 wording without asserting a graduation date. Role summaries can now be drawn from the resumes.
- Redis repository default branch contains only `README.md`. Resume describes C/C++, TCP, TTL and an event loop, but source verification cannot substantiate those features. Keep its requested card transparent about unavailable source rather than invent accomplishments.
- TaskMesh is a fork of `joshualamerton/TaskMesh`; inspected code implements only in-memory FIFO submit/claim and an empty-queue `None`. Capability routing, persistence, priority and retries are roadmap ideas, not implemented features. Verify actual authored PRs before claiming ownership.
- GitHub API confirms 11 merged Abyss PRs by `zakiscoding`: #1, #3–#12. Team attribution is required.
- Homelab repositories are private. Publish only high-level architecture and technologies; do not copy internal addresses, hostnames or secrets. Repository links must identify that access is required.
- Repo Intel is a fork with authored upstream PRs #5 and #6 currently open, not merged. Show accurate status and contributions rather than claiming the whole project.

## Implementation plan

Reuse existing section styling and animation components; add six honest project cards, four expandable secondary cards, evidence-linked contributions, resume-based experience and education, and categorized skills. Repair layout roots, lazy chat configuration/error handling and validated contact submission. Preserve Sanity configuration and documents. Run typecheck, Biome, production build and browser responsive/accessibility checks where supported; document limitations and open a feature-branch PR.

## Findings resolved during implementation

The owner requested that TaskMesh be skipped; verified Housing Price MLOps replaces it. A final Redis upstream recheck found a force update from the initial README-only revision to `8c3036d553ebeaca10e750c2bb79682b123bb504`, which contains the C implementation. Its features were inspected before updating the card; see project evidence for the exact source and supported claims. The original observations above record the pre-implementation audit, not the final repository state.
