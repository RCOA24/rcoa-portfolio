/**
 * Portfolio project model
 *
 * slug: stable render key and anchor fragment
 * title / shortTitle / tagline: display identity
 * summary: compact overview shown before project detail
 * role / problem / solution / engineeringHighlights / outcome: case-study narrative
 * technologies: intentionally limited to important, verified tools
 * image: optional representative image with intrinsic dimensions and alt text
 * submission: optional public hackathon submission metadata used by the project preview
 * links: optional external destinations; omitted links must not render
 * featured: controls editorial hierarchy, not factual importance
 * status: concise factual project state or recognition
 * visual: presentation-only theme identifier for screenshot-free case studies
 */

export const featuredProjects = [
  {
    slug: 'healthbridge',
    title: 'HealthBridge — AI Healthcare Companion',
    shortTitle: 'HealthBridge',
    tagline: 'Helping patients prepare for critical healthcare moments.',
    summary:
      'A healthcare companion for preparing for consultations, pharmacy visits, laboratory tests, and hospital discharge.',
    role: 'Architected the product and led a three-member cross-functional team.',
    problem:
      'Healthcare instructions and preparation steps are often fragmented across high-stress moments in a patient journey.',
    solution:
      'Created a guided experience that brings preparation workflows and external health resources into one product.',
    engineeringHighlights: [
      'Integrated more than five external services, including OpenAI, Google Maps, RxNorm, and openFDA.',
      'Implemented secure authentication, local storage, and offline-first support.',
      'Led product architecture and cross-functional delivery for a three-member team.',
    ],
    outcome:
      'Top 5 Finalist among 61 teams and 250+ builders at OpenAI Build Week Manila 2026.',
    technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'Supabase', 'Google Maps API'],
    image: {
      src: '/images/ProjectImages/HealthBridge/HealthBridgeDevpost.png',
      alt: 'HealthBridge public Devpost submission thumbnail',
      width: 333,
      height: 222,
    },
    submission: {
      platform: 'Devpost',
      event: 'OpenAI Build Week',
      context: 'Top 5 Manila finalist · Published submission',
    },
    recognition: {
      label: 'Top 5 Finalist',
      detail: 'OpenAI Build Week Manila 2026',
      tone: 'finalist',
    },
    links: {
      devpost: 'https://devpost.com/software/healthbridge-zd5gnp',
      video: 'https://youtu.be/URhqjCVei0Y',
    },
    featured: true,
    status: 'Top 5 Finalist',
    visual: 'healthbridge',
  },
  {
    slug: 'striven',
    title: 'Striven — AI Fitness Platform',
    shortTitle: 'Striven',
    tagline: 'A local-first fitness product built for web and Android.',
    summary:
      'A cross-platform fitness application combining workout planning, health tracking, nutrition tools, and live leaderboards.',
    role:
      'Designed and implemented the local-first product architecture, cross-platform experience, and AI-assisted nutrition workflow.',
    problem:
      'Fitness tracking becomes unreliable when core workflows depend on a constant connection or are split across disconnected tools.',
    solution:
      'Built a PWA and Android experience with local persistence, cloud synchronization, and a unified set of fitness workflows.',
    engineeringHighlights: [
      'Designed offline synchronization with IndexedDB, Dexie, and Supabase.',
      'Integrated Google Gemini Vision for food recognition and nutritional analysis.',
      'Delivered workout management, step tracking, health tools, authentication, and live leaderboards across PWA and Android.',
    ],
    outcome:
      'A working cross-platform product that keeps core fitness workflows usable offline and synchronizes data when connectivity returns.',
    technologies: ['React', 'TypeScript', 'Supabase', 'Gemini Vision', 'Capacitor', 'Dexie.js'],
    image: {
      src: '/images/ProjectImages/Striven/StrivenThumbnail-optimized.jpg',
      alt: 'Striven fitness platform dashboard and mobile application screens',
      width: 1920,
      height: 1080,
    },
    links: {
      live: 'https://trystriven.netlify.app/',
      repository: 'https://github.com/RCOA24/Striven',
    },
    featured: true,
    status: 'PWA + Android',
    visual: 'striven',
  },
  {
    slug: 'commute-lens',
    title: 'Commute Lens',
    shortTitle: 'Commute Lens',
    tagline: 'Understanding the real cost of commuting.',
    summary:
      'A job-offer comparison tool that makes transportation costs, commute time, onsite requirements, and effective hourly value visible for Filipino workers.',
    role:
      'Product and full-stack engineering focused on deterministic calculations, transit-data provenance, and clear decision support.',
    problem:
      'Salary alone can hide the financial and personal cost of transportation, transfers, traffic, and unpaid commute time.',
    solution:
      'Built a layered application that separates routing, financial calculations, runtime validation, data provenance, and presentation.',
    engineeringHighlights: [
      'Labels transit information as live, estimated, archival, or curated demo so planning assumptions are never presented as official current data.',
      'Keeps AI downstream of validated calculations and provides deterministic explanations when AI is unavailable or fails accuracy checks.',
      'Compares two job offers and models 0–5 onsite days while reusing route previews to avoid unnecessary external API requests.',
    ],
    outcome:
      'Built on Backboard category winner and 12th-place project at the CUTC: Transform Hackathon 2026.',
    technologies: ['Next.js', 'TypeScript', 'Geoapify', 'GTFS', 'MapLibre GL', 'OpenAI'],
    image: {
      src: '/images/ProjectImages/CommuteLens/CommuteLensDevpost.png',
      alt: 'Commute Lens public Devpost submission thumbnail',
      width: 333,
      height: 222,
    },
    submission: {
      platform: 'Devpost',
      event: 'CUTC: Transform Hackathon 2026',
      context: 'Built on Backboard category winner · 12th place',
    },
    recognition: {
      label: 'Winner',
      detail: 'Built on Backboard',
      tone: 'winner',
    },
    links: {
      devpost: 'https://devpost.com/software/commute-lens',
      repository: 'https://github.com/RCOA24/CommuteLens',
      video: 'https://www.youtube.com/watch?v=f5NNQpqlPmI&t=1s',
    },
    featured: false,
    status: 'Built on Backboard Winner',
    visual: 'commute',
  },
]

export const projectArchive = [
  {
    slug: 'typhoguard',
    title: 'TyphoGuard',
    summary:
      'A Philippine weather, tide, and dam monitoring application powered by public environmental data services.',
    technologies: ['Laravel', 'Tailwind CSS', 'Leaflet', 'Public APIs'],
    links: [
      { href: 'https://typhoguard.onrender.com/', label: 'View live demo' },
      { href: 'https://www.youtube.com/watch?v=eVApJ1Uo2RY', label: 'Watch walkthrough' },
    ],
  },
  {
    slug: 'bmis',
    title: 'Barangay Management Information System',
    summary:
      'A web application for resident records, document issuance, SMS announcements, and geospatial mapping.',
    technologies: ['PHP', 'CodeIgniter', 'MySQL', 'Twilio'],
    links: [
      { href: 'https://youtu.be/24sDilnbSVQ', label: 'Watch walkthrough' },
    ],
  },
  {
    slug: 'stc-analytics',
    title: 'Packaging Solutions Analytics',
    summary:
      'A Power BI dashboard for exploring production, quality, inventory, and sales information.',
    technologies: ['Power BI', 'DAX', 'Data Modeling', 'SQL'],
    links: [
      {
        href: 'https://app.powerbi.com/groups/me/reports/78cf85e4-c05a-4dd2-973d-7ef3ef0fac99/ff470f65342056c7e130?experience=power-bi',
        label: 'View dashboard',
      },
    ],
  },
]
