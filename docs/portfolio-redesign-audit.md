# Portfolio Redesign Audit

Date: August 31, 2026  
Repository: `RCOA24/rcoa-portfolio`  
Stack: React 19, Vite 7, JSX, Tailwind CSS 3, GSAP, Lenis

## Executive summary

The repository is a single-page React portfolio with six mounted sections: an animation-heavy hero, About, Skills, Projects, Contact, and Footer. It builds successfully, but the baseline lint command fails with one error and one hook warning. The current product emphasizes visual effects, technology icons, and generic marketing copy while omitting Rodney's strongest verified evidence: current enterprise healthcare work, production support, HealthBridge, measurable impact, and professional progression.

The redesign should retain React, Vite, JSX, Tailwind, verified project screenshots, the resume PDF, and the working external contact links. It should replace the current hero/scroll spectacle, carousel-first project discovery, hard-coded component data, and fragile global animation plumbing with a semantic, content-led page. JavaScript-to-TypeScript migration is not justified for this scope; structured JSX data modules provide the needed maintainability without broad migration risk.

## Current architecture

- `src/main.jsx` mounts one `App` under React Strict Mode.
- `src/App.jsx` owns a global Lenis instance, a custom `ScrollTrigger.scrollerProxy`, an independent animation frame loop, resize handling, and global ScrollTrigger cleanup.
- Mounted page order is `VideoScrollHero`, `About`, `Skills`, `Projects`, `Contact`, `Footer`.
- `Header.jsx`, `Hero.jsx`, and `ThemeToggle.jsx` exist but are not mounted. Their copy and behavior are stale.
- `Projects.jsx` is a 500+ line component containing project facts, carousel state, pointer/touch gesture code, GSAP transitions, a project modal, image preview, and all project presentation.
- `About.jsx`, `Skills.jsx`, `Contact.jsx`, and `Footer.jsx` each own substantial GSAP timelines and presentation copy.
- `UI/ScrollStack.jsx` creates a second Lenis instance from a different package and kills every ScrollTrigger on cleanup.
- `UI/Squares.jsx` runs a full-viewport canvas loop continuously. `UI/Aurora.jsx` provides an unused WebGL effect. `UI/TextType.jsx` provides an animated typing effect.
- `src/animations/scrollAnimations.js` contains generic helpers but is unused by mounted components.
- There is no router, CMS, backend, test suite, or structured content layer.

## Existing sections and content

### Hero

The mounted hero types “Front-End Developer,” presents “Delivering innovative digital solutions,” and requires several full viewport scroll cards before core information appears. It positions Rodney incorrectly and delays access to evidence. Despite its filename, it does not use video; it uses a continuously animated canvas grid plus duplicated smooth-scroll infrastructure.

### About

The section includes a useful formal portrait and working resume/certificate PDF actions. The copy is generic (“passionate,” “Designed to inspire,” “Focused Excellence”), overweights design language, and omits current employment and production engineering evidence.

### Skills

The section contains ten icon cards loaded from jsDelivr. It presents individual tools rather than engineering capabilities, omits several authoritative technologies, and makes non-semantic `div` elements clickable. Hover-only “View docs” affordances add little portfolio value.

### Projects

Project facts and interaction logic are tightly coupled. Existing local facts/assets cover TyphoGuard, BMIS, Striven, Odecci internship work, and a Power BI dashboard. HealthBridge and Commute Lens are absent. Striven contains useful factual foundations but also an unverified “Lighthouse 100” technology/claim that must be removed. Projects are only discoverable one at a time through a mandatory horizontal carousel.

### Experience

There is no dedicated professional experience section. Odecci is mixed into projects, while E-Med and its verified production impact are entirely absent.

### Contact and footer

The EmailJS form has loading and basic error states, but it relies on client-side configuration, performs two network sends for each submission, lacks native form semantics because the controls are not inside a `form`, lacks label/input associations, has no honeypot or throttling, and clears transient messages automatically. The direct email, GitHub, and LinkedIn links are reusable. The footer duplicates navigation, uses perpetual orb motion, and hard-codes copyright 2025.

## Reusable parts

- React/Vite/Tailwind toolchain and static deployment model.
- Resume PDF at `/RodneyAustria_Resume_2026.pdf`.
- Current GitHub, LinkedIn, email, canonical URL, favicon identity, and Google site verification value.
- `FormalPicture.jpg` as the About portrait, with explicit intrinsic dimensions and optimized delivery needed.
- Striven screenshots and the existing live/GitHub URLs.
- Existing TyphoGuard, BMIS, and analytics facts/assets as a lower-priority project archive.
- Semantic ideas from the unused header (sticky navigation) and current footer (back-to-top/social links), but not their current implementations.
- Tailwind responsive utilities and the current dark visual direction.

Odecci screenshots should not be used in the redesigned public experience unless confidentiality and publication rights are certain. The verified text-only experience summary is sufficient.

## Design and UX weaknesses

- The first several viewports emphasize animation instead of identity, role, current work, or measurable results.
- Generic claims and decorative superlatives dilute credibility.
- There is no sticky navigation in the mounted application and no skip link.
- Information architecture omits Impact, Experience, Achievements, and clear project hierarchy.
- Project cards are equal-priority carousel slides; HealthBridge and Commute Lens are missing.
- Long required scrolling and `min-height: 100vh` sections create excessive page length.
- Multiple unrelated accent gradients (blue, purple, pink, cyan, yellow, green) make the site visually noisy.
- Theme code exists but is disconnected; the live site is effectively dark-only.
- The current visual language reads as a tutorial/animation portfolio rather than a production engineer's product site.

## Accessibility issues

- Hidden scrollbars reduce orientation and discoverability.
- No skip-to-content link or mounted primary navigation.
- Clickable `div` elements in Skills and Projects are not keyboard operable.
- Project modal and image preview lack `role="dialog"`, `aria-modal`, an accessible name, focus trapping, initial focus, focus restoration, and body scroll locking.
- Some project content is discoverable only through a mandatory carousel/drag interaction.
- Contact labels do not use `htmlFor`; inputs have no `id`, `name`, `required`, or `aria-describedby` relationships.
- Form status messages are not announced with a live region.
- Focus styles are inconsistent and sometimes replaced with `focus:outline-none`.
- Perpetual canvas, typing, blinking, parallax, and floating animations do not consistently honor `prefers-reduced-motion`.
- Globally applying `transform-style: preserve-3d` to every `div` and section is unnecessary and can create stacking/rendering surprises.
- Image alt text is generic in several places, and images generally lack intrinsic dimensions.
- The static SEO fallback adds another hidden H1 and large blocks of keyword-stuffed content, risking an incoherent heading/document outline.

## Performance concerns

- Baseline application JS is approximately 417 kB (137 kB gzip), high for a static portfolio.
- Two Lenis packages are installed and instantiated. A custom scroller proxy is unnecessary for document scrolling and may conflict with anchors, mobile behavior, and restoration.
- Several components call `ScrollTrigger.getAll().forEach(kill)`, allowing one component to destroy animations owned by another.
- Canvas animation runs every frame even when off-screen or reduced motion is requested. Unused OGL/WebGL and generic animation modules add maintenance and potential bundle cost.
- Google Fonts is loaded through CSS `@import`, delaying stylesheet/font discovery and introducing a render dependency. A system font stack is adequate and faster.
- Most project images are PNGs between roughly 500 kB and 2.2 MB. They are not consistently lazy-loaded or given intrinsic dimensions.
- `FormalPicture.jpg` is about 741 kB; `RA.png` is about 594 kB at 2048×2048 despite favicon-scale display.
- Certificate PDFs total about 7 MB and are linked prominently despite being secondary content.
- The current hero consumes continuous animation resources without communicating verified product or engineering evidence.
- `index.html` is roughly 27 kB because of repetitive SEO markup and a large hidden keyword-content block.

## Content inaccuracies and outdated material

- Hero says “Front-End Developer”; authoritative positioning is Full-Stack Developer building production systems and AI-powered products.
- E-Med Healthcare Solutions Inc. employment (February 2026–Present) and all verified enterprise metrics are missing.
- HealthBridge, its team leadership, integrations, and Top 5 OpenAI Build Week Manila 2026 result are missing.
- Commute Lens is absent. No verified repository facts are available beyond the authoritative positioning, so its case study must remain intentionally concise and avoid invented outcomes, architecture, or adoption.
- Education/status language still frames Rodney around being a graduate/former intern and “available for freelance,” rather than current production engineering.
- Metadata calls Rodney a Laravel/React specialist, says `worksFor: Freelance`, exposes a full street address and phone number, and includes aggressive local-service keyword stuffing. These are inconsistent with the requested positioning and unnecessarily expose personal information.
- `WorkExperience` and other schema blocks are stale or nonstandard. JSON-LD should be reduced to a factual `Person` graph.
- “President's Dean Lister” conflicts with the authoritative “President's Lister.”
- “Lighthouse 100” is not an authorized metric and should be removed.
- “Professional,” “expert,” “best,” “proven track record,” “multiple successful freelance projects,” and similar claims in metadata/fallback content are unsupported or overly promotional.
- Footer copyright is hard-coded to 2025.
- README reflects the old positioning; it should be updated only after the product implementation is stable, preserving the user's current uncommitted README work.

## Animation and scrolling audit

The global Lenis/ScrollTrigger integration is more complex than this page requires. It creates a custom proxy for the document scroller, manually drives two libraries every frame, enables touch smoothing, and invokes global cleanup. `ScrollStack` then creates another Lenis loop from the deprecated `@studio-freight/lenis` package. Strict Mode magnifies lifecycle risk during development.

Recommendation: remove Lenis, ScrollTrigger, SplitType, OGL, and GSAP from the primary experience unless a later measured interaction justifies one. Use native anchor scrolling and small CSS transitions. Native scrolling preserves browser behavior, reduces bundle weight, respects reduced motion more predictably, and makes cleanup unnecessary. Content must remain fully visible without JavaScript animation.

## Refactoring opportunities

- Add `src/data/projects.js`, `experience.js`, `capabilities.js`, and `achievements.js` as authoritative content modules.
- Add small layout/UI primitives: `Container`, `SectionHeading`, `ButtonLink`, and `TagList`.
- Replace `VideoScrollHero` with focused `Header`, `Hero`, and `ImpactStats` components.
- Replace the carousel/modal-centric Projects component with editorial `ProjectsSection` and reusable `ProjectCaseStudy` cards; keep all core facts on-page.
- Add a dedicated `ExperienceSection` with E-Med as the dominant item and Odecci as supporting progression.
- Replace skill icons with capability groups and text-based technology lists.
- Consolidate recognition, education, and certifications into a compact supporting section.
- Replace the EmailJS form with direct, reliable contact links unless a server-backed or abuse-resistant form becomes a real requirement.
- Reduce SEO markup to accurate metadata and one `Person` JSON-LD block.
- Keep JSX. A full TypeScript migration would touch the entire surface without proportional benefit.

## Proposed component architecture

```text
src/
  components/
    layout/
      Header.jsx
      Footer.jsx
      Container.jsx
    hero/
      Hero.jsx
      HeroVisual.jsx
      ImpactStats.jsx
    projects/
      ProjectsSection.jsx
      ProjectCaseStudy.jsx
      ProjectArchive.jsx
    experience/
      ExperienceSection.jsx
      ExperienceItem.jsx
    capabilities/
      CapabilitiesSection.jsx
    recognition/
      RecognitionSection.jsx
    about/
      AboutSection.jsx
    contact/
      ContactSection.jsx
    ui/
      SectionHeading.jsx
      ArrowIcon.jsx
  data/
    projects.js
    experience.js
    capabilities.js
    achievements.js
  App.jsx
  index.css
```

Components will only be split where they isolate repeated presentation or meaningful behavior; static one-off wrappers should remain local.

## Proposed implementation phases

1. **Content model:** create authoritative structured data; document project schema; add verified HealthBridge, Striven, Commute Lens, experience, capabilities, and recognition. Refactor the page to consume it.
2. **Design foundation:** introduce semantic color tokens, system typography, container/section/button/tag primitives, visible focus treatment, native scrolling, and reduced-motion rules.
3. **Navigation, hero, and impact:** add accessible sticky navigation/mobile menu, accurate positioning, direct resume/work actions, a restrained engineering visual, and the four verified metrics.
4. **Selected work:** create editorial HealthBridge and Striven case studies plus a deliberately limited Commute Lens entry and compact older-work archive.
5. **Experience:** add the E-Med-led professional timeline without protected system imagery or confidential detail.
6. **Supporting content:** implement capability groups, compact recognition/education, concise About, direct contact, and footer.
7. **Accessibility and responsive QA:** validate semantics, keyboard paths, mobile navigation, touch targets, anchor offsets, reduced motion, overflow, and image behavior at required breakpoints.
8. **Performance and SEO:** remove unused animation/contact dependencies, optimize asset usage, simplify metadata/JSON-LD, and inspect production bundle output.
9. **Final QA:** review from recruiter, engineering manager, front-end engineer, and product designer perspectives; record/fix P0/P1 findings in `docs/final-redesign-review.md`; run final lint and build.

## Baseline verification

- `npm run build`: passes; generated JS approximately 417 kB (137 kB gzip).
- `npm run lint`: fails due to an unused `headerScrollTrigger` variable in `VideoScrollHero.jsx`; also reports missing hook dependencies in `Projects.jsx`.
- No automated tests are configured.

## Phase 1 acceptance decision

The audit is complete. The current stack and valuable assets can be preserved, while the mounted UI should be refactored substantially because its information architecture, content accuracy, accessibility, and runtime complexity conflict with the redesign objective. Major visual work may now begin with the structured content phase.
