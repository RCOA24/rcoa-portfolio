# UI/UX Optimization Iteration Log

## 2026-08-31 — SEO, discovery, and social trust

### Problem

The redesigned portfolio had a useful title, description, canonical URL, and basic `Person` structured data, but search discovery and sharing were incomplete:

- no root `robots.txt`;
- no XML sitemap;
- no explicit `ProfilePage` or `WebSite` entity graph;
- social metadata used a generic square identity logo rather than a purpose-built preview;
- image dimensions and MIME type were not declared in Open Graph metadata;
- the currently deployed Netlify site still returned outdated, keyword-stuffed pre-redesign content.

### Audiences

- Recruiters and HR reviewers receiving the portfolio through search, messaging, or the resume
- Engineering managers and technical interviewers verifying identity and professional positioning
- Clients and founders reviewing a shared portfolio link
- Search crawlers and social-sharing crawlers

### Hypothesis

A consistent metadata set, explicit crawl files, representative social image, and accurate profile-page schema will make the portfolio easier to discover, understand, verify, and share without changing the visible experience or adding keyword-heavy copy.

### Changes

- Set the document language to `en-PH`.
- Expanded robots preview directives while preserving indexing.
- Added an explicit sitemap link.
- Added `public/robots.txt` with the production sitemap location.
- Added a minimal root `public/sitemap.xml` containing the canonical page.
- Replaced the basic `Person` JSON-LD object with a connected graph containing:
  - `WebSite`
  - `ProfilePage`
  - `ImageObject`
  - `Person`
- Preserved only verified employment, education, profile, technology, award, and contact facts.
- Added a dedicated 1200×630 Open Graph/Twitter image using Rodney's existing portrait, official RA mark, and verified positioning.
- Added social-image type, width, height, and accessible description metadata.
- Removed the temporary render template after generating the final image.
- Updated the completed redesign review to reflect the simplified hero and resolved social-image finding.

### Files

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/rodney-austria-portfolio-og.png`
- `docs/final-redesign-review.md`
- `docs/ui-ux-iteration-log.md`

### Validation

- Baseline lint: passed
- Baseline production build: passed
- Final lint: passed
- Final production build: passed
- JSON-LD parsed successfully from production HTML
- JSON-LD graph types verified: `WebSite`, `ProfilePage`, `ImageObject`, `Person`
- Canonical tag count: one
- Page title count: one
- Primary `og:image` tag count: one
- Sitemap canonical URL verified
- `robots.txt` sitemap reference verified
- Social image verified at exactly 1200×630 pixels
- Local production server returned HTTP 200 for:
  - `/`
  - `/robots.txt`
  - `/sitemap.xml`
  - `/rodney-austria-portfolio-og.png`
- Rendered desktop portfolio inspected after the metadata changes; visible layout remained unchanged
- Production HTML checked for old keyword-stuffed phrases; none remain

### Before and after

Before, crawlers had only page-level metadata and a standalone `Person` object, while shared links used the square RA logo. After, the canonical page has explicit crawl discovery, connected identity/profile schema, richer preview controls, and a branded wide social preview using real portfolio assets.

### Multi-role review

- Recruiter/HR: The search result identity and shared-link presentation are consistent with the current portfolio.
- Technical interviewer: Structured identity, current employment, technical scope, and professional profiles are connected without adding unsupported claims.
- Client/founder: Shared links now present a clear professional role and product-engineering focus.
- Senior front-end engineer: No runtime dependency or JavaScript was added; CSS and JavaScript bundles are unchanged.
- Product designer: The social card matches the dark-first teal system and uses the same identity mark and portrait as the portfolio.
- Accessibility reviewer: The visible experience is unchanged, image metadata has meaningful alternative text, and document language is more specific.

### Priority status

- P0: None in the local production build.
- P1: Deploy the current repository build; the public Netlify URL still serves obsolete pre-redesign content until deployment completes.
- P2: After deployment, submit `/sitemap.xml` in Google Search Console and validate the public URL with URL Inspection and Rich Results Test.

## 2026-08-31 — Verified case-study depth and automated quality gates

### Problem

The final review still identified two locally actionable gaps:

- Commute Lens had a verified Devpost submission and video but did not explain enough of its architecture or outcome.
- Accessibility, keyboard, responsive, and SEO checks were manual, making later regressions easier to miss.

Four archive project actions also rendered at 42 pixels tall on a 375-pixel viewport, below the portfolio's 44-pixel target.

### Audiences

- Recruiters and HR reviewers who need a credible, quickly understood project story
- Engineering managers and technical interviewers evaluating architecture and engineering judgment
- Mobile, keyboard, and assistive-technology users
- Future maintainers changing portfolio content or layout

### Hypothesis

Replacing generic Commute Lens copy with verified engineering decisions, then enforcing the portfolio's key acceptance criteria in a production-browser suite, will improve technical credibility and prevent high-impact UI, accessibility, and SEO regressions.

### Changes

- Verified the Commute Lens submission through its Devpost project record.
- Reframed the project as a job-offer comparison tool that exposes transport cost, commute time, onsite requirements, and effective hourly value.
- Added verified details covering:
  - layered separation of routing, financial calculations, runtime validation, provenance, and presentation;
  - explicit live, estimated, archival, and curated-demo data labels;
  - AI downstream of deterministic calculations, with deterministic fallback behavior;
  - comparison of two offers across zero to five onsite days;
  - reuse of route previews to avoid unnecessary external API requests;
  - delivery as a working CUTC: Transform Hackathon 2026 submission without claiming adoption or automated decision authority.
- Added the verified Commute Lens GitHub repository, Devpost submission, and walkthrough destinations.
- Added Playwright and axe-core regression tests for:
  - console and page errors;
  - WCAG A/AA violations;
  - one-H1 and anchor integrity;
  - explicit image metadata;
  - horizontal overflow at all seven required widths;
  - 44-pixel mobile action targets;
  - mobile-menu focus, Escape behavior, state, and focus restoration;
  - title, canonical, robots, Open Graph, and Twitter metadata;
  - connected JSON-LD entities;
  - `robots.txt`, sitemap, and social-image delivery.
- Increased archive project action targets from 42 to at least 44 pixels.
- Added a GitHub Actions workflow that installs Chromium and runs lint, build, and browser checks on pushes and pull requests.
- Updated lint configuration to handle the Node-based Playwright configuration and ignore generated reports.
- Evaluated Lighthouse CI, then removed it because its transitive dependency tree introduced unresolved high-severity development advisories. Hosted Lighthouse remains a post-deployment check.

### Files

- `src/data/projects.js`
- `src/index.css`
- `package.json`
- `package-lock.json`
- `playwright.config.js`
- `tests/e2e/portfolio.spec.js`
- `tests/e2e/seo.spec.js`
- `.github/workflows/quality.yml`
- `.gitignore`
- `eslint.config.js`
- `docs/final-redesign-review.md`
- `docs/ui-ux-iteration-log.md`

### Validation

- Lint: passed
- Production build: passed
- Browser suite: 9 of 9 tests passed
- Automated axe-core scan: zero configured WCAG A/AA violations
- Responsive overflow: none at 320, 375, 430, 768, 1024, 1280, or 1440 pixels
- Mobile navigation: open, focus movement, Escape close, body-scroll state, and focus restoration passed
- Mobile interactive targets: all visible links and buttons measured at least 44 pixels tall
- SEO metadata, JSON-LD graph, crawler resources, and social image: passed
- Desktop and mobile Commute Lens presentation: rendered and visually inspected
- Dependency audit: zero known vulnerabilities

### Before and after

Before, Commute Lens communicated the general commuting problem but not the submitted system's specific architecture, data-safety model, or decision-support boundaries. Quality checks depended on manual review, and four project actions missed the minimum touch-target height by two pixels.

After, the case study gives technical interviewers concrete, verified engineering evidence and recruiters a clearer product outcome. The most important responsive, accessibility, navigation, rendering, and SEO requirements are now executable locally and in CI.

### Multi-role review

- Recruiter/HR: Commute Lens now communicates the product, audience, and verified hackathon context without unsupported metrics.
- Engineering manager: The case study exposes deterministic calculation boundaries, provenance, fallback behavior, and API-efficiency decisions.
- Senior front-end engineer: Regression checks run against the production build and cover console errors, semantics, responsive layout, navigation behavior, and metadata.
- Product designer: Longer technical content remains scannable through the existing problem, role, engineering, outcome, highlight, and technology hierarchy.
- Accessibility reviewer: Axe-core reports no configured A/AA violations, navigation behavior is keyboard-tested, and visible mobile actions meet the 44-pixel target.
- Performance reviewer: No production dependency or runtime JavaScript was added; test dependencies stay development-only.

### Priority status

- P0: None.
- P1 local: None.
- P1 external: Deploy the reviewed build; the local workspace is not linked to a Netlify site, so deployment was not attempted from a dirty worktree.
- P2 external: After deployment, run hosted Lighthouse, validate the public structured data, and submit `/sitemap.xml` in Google Search Console.
