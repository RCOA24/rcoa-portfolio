/**
 * Portfolio project model
 *
 * Card (always visible, optimised for scanning):
 *   slug          stable render key and anchor fragment (#slug)
 *   title         display name
 *   description   1–2 sentences, ≤ ~30 words
 *   technologies  most important first; cards show the first five, details show the full list
 *   impact        optional single line; tone 'award' for competition results
 *   image         { src, srcSet?, alt, width, height }
 *                 Rendered in a fixed 16:10 frame. Supply 16:10 exports (1280×800 plus a
 *                 640×400 srcSet entry) so nothing is cropped; 3:2 sources lose ~3% top and bottom.
 *   links         optional { live, dashboard, devpost, repository, video }; omitted links never render
 *
 * Details (featured projects only, revealed with a native <details> disclosure):
 *   details       { problem, role, approach, highlights[] }
 */

export const featuredProjects = [
  {
    slug: 'healthbridge',
    title: 'HealthBridge',
    description:
      'An AI healthcare companion that helps patients prepare for consultations, pharmacy visits, lab tests, and hospital discharge.',
    technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'Supabase', 'Google Maps API'],
    impact: {
      text: 'Top 5 Finalist of 61 teams and 250+ builders, OpenAI Build Week Manila 2026',
      tone: 'award',
    },
    image: {
      src: '/images/ProjectImages/HealthBridge/HealthBridge-card.jpg',
      srcSet: '/images/ProjectImages/HealthBridge/HealthBridge-card-640.jpg 640w, /images/ProjectImages/HealthBridge/HealthBridge-card.jpg 1280w',
      alt: 'HealthBridge visit-preparation screen with care visit types: pharmacy, clinic, laboratory, and hospital discharge',
      width: 1280,
      height: 800,
    },
    links: {
      live: 'https://healthridge.vercel.app/',
      devpost: 'https://devpost.com/software/healthbridge-zd5gnp',
      video: 'https://youtu.be/URhqjCVei0Y',
    },
    details: {
      problem:
        'Healthcare instructions and preparation steps are often fragmented across high-stress moments in a patient journey.',
      role: 'Architected the product and led a three-member cross-functional team.',
      approach:
        'A guided experience that brings preparation workflows and external health resources into one product.',
      highlights: [
        'Integrated more than five external services, including OpenAI, Google Maps, RxNorm, and openFDA.',
        'Implemented secure authentication, local storage, and offline-first support.',
        'Led product architecture and cross-functional delivery for a three-member team.',
      ],
    },
  },
  {
    slug: 'striven',
    title: 'Striven',
    description:
      'A local-first fitness platform for web and Android with workout planning, health tracking, AI food scanning, and live leaderboards.',
    technologies: ['React', 'TypeScript', 'Supabase', 'Gemini Vision', 'Capacitor', 'Dexie.js'],
    impact: {
      text: 'Core fitness workflows keep working offline and sync when the connection returns',
      tone: 'default',
    },
    image: {
      src: '/images/ProjectImages/Striven/Striven-card.jpg',
      srcSet: '/images/ProjectImages/Striven/Striven-card-640.jpg 640w, /images/ProjectImages/Striven/Striven-card.jpg 1280w',
      alt: 'Striven on phone, desktop, and tablet: AI food scanner, workout library, and profile summary screens',
      width: 1280,
      height: 800,
    },
    links: {
      live: 'https://trystriven.netlify.app/',
      repository: 'https://github.com/RCOA24/Striven',
    },
    details: {
      problem:
        'Fitness tracking becomes unreliable when core workflows depend on a constant connection or are split across disconnected tools.',
      role:
        'Designed and implemented the local-first architecture, cross-platform experience, and AI-assisted nutrition workflow.',
      approach:
        'A PWA and Android app with local persistence, cloud synchronization, and a unified set of fitness workflows.',
      highlights: [
        'Designed offline synchronization with IndexedDB, Dexie, and Supabase.',
        'Integrated Google Gemini Vision for food recognition and nutritional analysis.',
        'Delivered workout management, step tracking, health tools, authentication, and live leaderboards across PWA and Android.',
      ],
    },
  },
  {
    slug: 'commute-lens',
    title: 'Commute Lens',
    description:
      'Compares job offers by the real cost of commuting (fares, travel time, and onsite days) so Filipino workers can see their effective pay.',
    technologies: ['Next.js', 'TypeScript', 'OpenAI', 'MapLibre GL', 'GTFS', 'Geoapify'],
    impact: {
      text: 'Built on Backboard category winner and 12th of 1,000 projects, CUTC: Transform Hackathon 2026',
      tone: 'award',
    },
    image: {
      src: '/images/ProjectImages/CommuteLens/CommuteLens-card.jpg',
      srcSet: '/images/ProjectImages/CommuteLens/CommuteLens-card-640.jpg 640w, /images/ProjectImages/CommuteLens/CommuteLens-card.jpg 1280w',
      alt: 'Commute Lens landing screen with a route preview card showing cost, time, and reliability at a glance',
      width: 1280,
      height: 800,
    },
    links: {
      live: 'https://commute-lens.vercel.app/',
      devpost: 'https://devpost.com/software/commute-lens',
      repository: 'https://github.com/RCOA24/CommuteLens',
      video: 'https://www.youtube.com/watch?v=f5NNQpqlPmI&t=1s',
    },
    details: {
      problem:
        'Salary alone can hide the financial and personal cost of transportation, transfers, traffic, and unpaid commute time.',
      role:
        'Product and full-stack engineering focused on deterministic calculations, transit-data provenance, and clear decision support.',
      approach:
        'A layered application that separates routing, financial calculations, runtime validation, data provenance, and presentation.',
      highlights: [
        'Labels transit information as live, estimated, archival, or curated demo so planning assumptions are never presented as official current data.',
        'Keeps AI downstream of validated calculations and provides deterministic explanations when AI is unavailable or fails accuracy checks.',
        'Compares two job offers and models 0–5 onsite days while reusing route previews to avoid unnecessary external API requests.',
      ],
    },
  },
]

export const projectArchive = [
  {
    slug: 'typhoguard',
    title: 'TyphoGuard',
    description: 'Philippine weather, tide, and dam monitoring built on public environmental data services.',
    technologies: ['Laravel', 'Tailwind CSS', 'Leaflet', 'Public APIs'],
    image: {
      src: '/images/ProjectImages/TyphoGuard/TyphoGuard-card.jpg',
      srcSet: '/images/ProjectImages/TyphoGuard/TyphoGuard-card-640.jpg 640w, /images/ProjectImages/TyphoGuard/TyphoGuard-card.jpg 1280w',
      alt: 'TyphoGuard dashboard with a live weather radar map of the Philippines and a seven-day forecast',
      width: 1280,
      height: 800,
    },
    links: {
      live: 'https://typhoguard.onrender.com/',
      video: 'https://www.youtube.com/watch?v=eVApJ1Uo2RY',
    },
  },
  {
    slug: 'bmis',
    title: 'Barangay Management Information System',
    description: 'Resident records, document issuance, SMS announcements, and geospatial mapping for a barangay office.',
    technologies: ['PHP', 'CodeIgniter', 'MySQL', 'Twilio'],
    image: {
      src: '/images/ProjectImages/BMIS/BMIS-card.jpg',
      srcSet: '/images/ProjectImages/BMIS/BMIS-card-640.jpg 640w, /images/ProjectImages/BMIS/BMIS-card.jpg 1280w',
      alt: 'BMIS admin dashboard with request and blotter summaries, a resident chart, and a barangay map',
      width: 1280,
      height: 800,
    },
    links: {
      video: 'https://youtu.be/24sDilnbSVQ',
    },
  },
]
