export const servicesMenu = [
  {
    id: 'app-development',
    title: 'App Development',
    path: '/services/app-development',
    items: [
      { slug: 'frontend-development', title: 'Frontend Development', desc: 'Craft dynamic app UIs with Flutter and React Native.', icon: 'code' },
      { slug: 'backend-engineering', title: 'Backend Engineering', desc: 'Build scalable APIs, auth, and data layers for mobile.', icon: 'gear' },
      { slug: 'app-innovation', title: 'App Innovation', desc: 'Cross-platform apps with Flutter/React Native and modern tooling.', icon: 'sparkles' },
      { slug: 'hybrid-app-development', title: 'Hybrid App Development', desc: 'Hybrid apps with Ionic + Capacitor for fast time-to-market.', icon: 'mobile' },
    ],
  },
  {
    id: 'web-development',
    title: 'Web Development',
    path: '/services/web-development',
    items: [
      { slug: 'next-level-experiences', title: 'Next-Level Experiences', desc: 'Fast, SEO-friendly web apps with modern frameworks.', icon: 'sparkles' },
      { slug: 'mern-mean-power', title: 'MERN | MEAN Power', desc: 'Real-time apps with Node.js, React/Angular and databases.', icon: 'globe' },
      { slug: 'php-back-end-solutions', title: 'PHP Back-End Solutions', desc: 'Robust PHP backends and integrations for websites.', icon: 'repeat' },
      { slug: 'cms-solutions', title: 'CMS Solutions', desc: 'WordPress/Shopify-style content sites and ecommerce builds.', icon: 'grid' },
    ],
  },
  {
    id: 'desktop-development',
    title: 'Desktop Development',
    path: '/services/desktop-development',
    items: [
      { slug: 'robust-apps-with-dotnet', title: 'Robust Apps with .NET', desc: 'Enterprise desktop apps for Windows using .NET.', icon: 'code' },
      { slug: 'unity-immersion', title: 'Unity Immersion', desc: '2D/3D interactive experiences and games with Unity.', icon: 'play' },
    ],
  },
  {
    id: 'seo-services',
    title: 'SEO Services',
    path: '/services/seo-services',
    items: [
      { slug: 'seo-audits-and-analysis', title: 'SEO Audits and Analysis', desc: 'Technical audits to uncover ranking and UX opportunities.', icon: 'grid' },
      { slug: 'keyword-research', title: 'Keyword Research', desc: 'UK-focused keyword research and intent mapping.', icon: 'search' },
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Strategy',
    path: '/services/digital-marketing',
    items: [
      { slug: 'brand-presence', title: 'Brand Presence', desc: 'Grow brand awareness and demand with measurable campaigns.', icon: 'circle' },
    ],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    path: '/services/ui-ux-design',
    items: [
      { slug: 'figma-mastery', title: 'Figma Mastery', desc: 'UI design, component libraries, and handoff-ready files.', icon: 'grid' },
      { slug: 'adobe-xd-and-illustrator-mastery', title: 'Adobe XD & Illustrator Mastery', desc: 'Visual design, brand assets, and illustrations.', icon: 'arrowRight' },
      { slug: 'rive-animation-magic', title: 'Rive Animation Magic', desc: 'Interactive motion for product UX and marketing.', icon: 'film' },
      { slug: 'interactive-prototyping', title: 'Interactive Prototyping', desc: 'Clickable prototypes to validate flows before build.', icon: 'design' },
    ],
  },
]

export const getServiceByPath = (path) => {
  return servicesMenu.find((s) => s.path === path || path.endsWith(s.id))
}

// Service-specific content for unique pages
export const servicePageContent = {
  'app-development': {
    tagline: 'Native & Cross-Platform Mobile Excellence',
    overview: 'We build high-performance mobile applications for iOS, Android, and cross-platform solutions that deliver seamless experiences across all devices. From concept to App Store launch, our team brings your vision to life with cutting-edge frameworks and proven methodologies.',
    highlights: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Ionic', 'Xamarin', 'Firebase', 'REST APIs'],
    process: [
      { title: 'Discovery & Strategy', desc: 'Define goals, target audience, and technical requirements' },
      { title: 'Design & Prototype', desc: 'Wireframes, UI/UX design, and interactive prototypes' },
      { title: 'Development', desc: 'Agile sprints with regular demos and feedback' },
      { title: 'QA & Launch', desc: 'Rigorous testing and App Store deployment' },
    ],
    benefits: [
      { icon: 'mobile', title: 'Cross-Platform', desc: 'Reach iOS and Android users with a single codebase' },
      { icon: 'zap', title: 'Performance', desc: 'Native-like speed and smooth animations' },
      { icon: 'shield', title: 'Security', desc: 'Secure data handling and OWASP compliance' },
    ],
    stats: [{ value: '50+', label: 'Apps Launched' }, { value: '99%', label: 'Uptime' }, { value: '4.8', label: 'App Store Rating' }],
  },
  'web-development': {
    tagline: 'Scalable, Fast, SEO-Ready Web Applications',
    overview: 'Modern web applications that scale with your business. We specialize in server-side rendering, API integration, and cloud deployment. Whether you need a content site, SaaS platform, or e-commerce solution, we deliver robust, maintainable code.',
    highlights: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'MongoDB', 'TypeScript', 'Vercel', 'AWS'],
    process: [
      { title: 'Requirements Analysis', desc: 'Gather specs, define features, and plan architecture' },
      { title: 'Architecture Design', desc: 'Database schema, API design, and tech stack selection' },
      { title: 'Agile Development', desc: 'Sprint-based development with continuous delivery' },
      { title: 'Deployment', desc: 'CI/CD pipeline and production hosting setup' },
    ],
    benefits: [
      { icon: 'globe', title: 'SEO Optimized', desc: 'Server-side rendering for better search rankings' },
      { icon: 'cloud', title: 'Scalable', desc: 'Architected for growth and high traffic' },
      { icon: 'code', title: 'Maintainable', desc: 'Clean code and comprehensive documentation' },
    ],
    stats: [{ value: '100+', label: 'Projects' }, { value: '<3s', label: 'Load Time' }, { value: '24/7', label: 'Support' }],
  },
  'desktop-development': {
    tagline: 'Enterprise-Grade Windows & Cross-Platform Apps',
    overview: 'Powerful desktop applications for Windows, macOS, and Linux. We develop enterprise software, internal tools, and gaming applications using .NET, Unity, and Electron. Performance and reliability are at the core of everything we build.',
    highlights: ['.NET', 'Unity', 'Electron', 'C#', 'WPF', 'Blazor', 'Unity C#', 'WebGL'],
    process: [
      { title: 'Technical Assessment', desc: 'Evaluate requirements and recommend the best stack' },
      { title: 'Architecture Planning', desc: 'System design and integration points' },
      { title: 'Development', desc: 'Iterative build with code reviews and testing' },
      { title: 'Distribution', desc: 'Packaging, installers, and deployment guides' },
    ],
    benefits: [
      { icon: 'desktop', title: 'Native Performance', desc: 'Full access to system resources and APIs' },
      { icon: 'shield', title: 'Offline Capable', desc: 'Apps that work without constant connectivity' },
      { icon: 'gear', title: 'Enterprise Ready', desc: 'SSO, audit logs, and compliance features' },
    ],
    stats: [{ value: '40+', label: 'Desktop Apps' }, { value: '10M+', label: 'Downloads' }, { value: '98%', label: 'Satisfaction' }],
  },
  'seo-services': {
    tagline: 'Drive Organic Growth & Visibility',
    overview: 'Comprehensive SEO strategies that increase your organic traffic and search rankings. We conduct technical audits, perform keyword research, optimize on-page elements, and build content strategies. Data-driven approaches deliver measurable results.',
    highlights: ['Google Analytics', 'SEMrush', 'Ahrefs', 'Technical SEO', 'Schema Markup', 'Core Web Vitals', 'Content Strategy', 'Link Building'],
    process: [
      { title: 'Site Audit', desc: 'Technical SEO analysis and competitor benchmarking' },
      { title: 'Strategy Development', desc: 'Keyword mapping and content calendar' },
      { title: 'Implementation', desc: 'On-page optimization and technical fixes' },
      { title: 'Monitoring', desc: 'Monthly reports and continuous improvement' },
    ],
    benefits: [
      { icon: 'search', title: 'Visibility', desc: 'Rank higher for your target keywords' },
      { icon: 'trending', title: 'Traffic Growth', desc: 'Sustained increase in organic visitors' },
      { icon: 'zap', title: 'ROI Focused', desc: 'Track conversions and attribute revenue' },
    ],
    stats: [{ value: '200%', label: 'Avg. Traffic Lift' }, { value: '50+', label: 'Sites Optimized' }, { value: 'Top 3', label: 'Rankings Goal' }],
  },
  'digital-marketing': {
    tagline: 'Result-Driven Marketing That Converts',
    overview: 'End-to-end digital marketing campaigns that build brand awareness, generate leads, and drive sales. From paid ads to social media, email marketing, and analytics, we create cohesive strategies aligned with your business goals.',
    highlights: ['Google Ads', 'Meta Ads', 'LinkedIn', 'Email Marketing', 'Analytics', 'Conversion Optimization', 'A/B Testing', 'CRM'],
    process: [
      { title: 'Market Research', desc: 'Audience insights and competitive analysis' },
      { title: 'Strategy Creation', desc: 'Channel mix, budgets, and KPIs' },
      { title: 'Campaign Execution', desc: 'Ad creation, targeting, and optimization' },
      { title: 'Optimization', desc: 'Data analysis and iterative improvements' },
    ],
    benefits: [
      { icon: 'megaphone', title: 'Reach', desc: 'Connect with your ideal customers at scale' },
      { icon: 'trending', title: 'Data Driven', desc: 'Every decision backed by analytics' },
      { icon: 'handshake', title: 'Full Funnel', desc: 'From awareness to conversion and retention' },
    ],
    stats: [{ value: '3x', label: 'ROI Target' }, { value: '500+', label: 'Campaigns' }, { value: '60%', label: 'Cost Savings' }],
  },
  'ui-ux-design': {
    tagline: 'Beautiful Interfaces That Users Love',
    overview: 'User-centered design that combines aesthetics with usability. We create intuitive interfaces, design systems, and interactive prototypes that reduce friction and increase engagement. Every pixel serves a purpose.',
    highlights: ['Figma', 'Adobe XD', 'Illustrator', 'Rive', 'Prototyping', 'Design Systems', 'Usability Testing', 'Accessibility'],
    process: [
      { title: 'User Research', desc: 'Interviews, surveys, and user personas' },
      { title: 'Wireframing', desc: 'Information architecture and user flows' },
      { title: 'Visual Design', desc: 'High-fidelity mockups and design system' },
      { title: 'Usability Testing', desc: 'Validate with real users and iterate' },
    ],
    benefits: [
      { icon: 'design', title: 'User Focused', desc: 'Design decisions based on real user data' },
      { icon: 'sparkles', title: 'Pixel Perfect', desc: 'Consistent, polished interfaces' },
      { icon: 'check', title: 'Accessible', desc: 'WCAG compliant and inclusive design' },
    ],
    stats: [{ value: '30%', label: 'Engagement Lift' }, { value: '150+', label: 'Projects' }, { value: '5.0', label: 'User Rating' }],
  },
}

// Sub-service pages (used by /services/:service/:subservice)
export const subServicePageContent = {
  'app-development': {
    'frontend-development': {
      tagline: 'Mobile UI Engineering for UK Products',
      overview:
        'We build smooth, accessible mobile interfaces for UK teams—navigation, state management, animations, and design-system components that feel native on iOS and Android.',
      whatYouGet: [
        'Cross-platform UI components (Flutter / React Native)',
        'Design-system implementation and accessibility',
        'Performance tuning (render, lists, images)',
        'App navigation, offline states, error handling',
      ],
      faqs: [
        ['Do you support Flutter and React Native?', 'Yes—both. We recommend based on your team, roadmap, and performance needs.'],
        ['Can you work with our existing designs?', 'Yes. We can implement from Figma and align to your brand system.'],
        ['Will this improve App Store ratings?', 'Better UX, performance, and fewer crashes typically improve reviews over time.'],
        ['Do you follow accessibility best practices?', 'Yes—clear contrast, hit targets, and platform conventions are built in.'],
        ['How do we collaborate from the UK?', 'Async updates + weekly demos; we align to UK working hours for calls.'],
      ],
    },
    'backend-engineering': {
      tagline: 'APIs, Auth, and Data Layers for Mobile Apps',
      overview:
        'A reliable backend makes your app feel fast. We design secure APIs, authentication, database schemas, and integrations so your UK users get consistent, low-latency experiences.',
      whatYouGet: ['API design (REST)', 'Auth + roles', 'Database modelling', 'Monitoring and release support'],
      faqs: [
        ['Do you build the full backend?', 'Yes—API, database, auth, and integrations.'],
        ['Can you integrate payments or CRM?', 'Yes (Stripe, HubSpot, etc.), depending on your stack.'],
        ['Is it GDPR-ready?', 'We help implement privacy-friendly patterns and data handling.'],
        ['Do you support cloud deployments?', 'Yes—Vercel/AWS style deployments and CI/CD.'],
        ['Can you work with Supabase?', 'Yes—when it fits the project, we can use Supabase effectively.'],
      ],
    },
    'app-innovation': {
      tagline: 'Rapid App Builds Without Cutting Corners',
      overview:
        'From MVP to v1, we help UK businesses validate ideas quickly—clear scope, measurable milestones, and a build that can scale with your product.',
      whatYouGet: ['MVP scoping', 'Prototype to production', 'Analytics-ready builds', 'Roadmap planning'],
      faqs: [
        ['Can you ship an MVP quickly?', 'Yes—after discovery we define a tight scope and ship in sprints.'],
        ['Do you provide UX as well?', 'Yes—UI/UX can be bundled with engineering.'],
        ['What about app store release?', 'We support App Store / Play Store submission and compliance.'],
        ['Can you add features later?', 'Yes—our builds are structured for iterative releases.'],
        ['Do you support UK startups and SMEs?', 'Yes—our process fits early-stage to established teams.'],
      ],
    },
    'hybrid-app-development': {
      tagline: 'Hybrid Apps for Faster Time-to-Market',
      overview:
        'Hybrid is great when speed matters. We build Ionic/Capacitor apps that reuse web skills and ship to iOS/Android—ideal for UK businesses modernising legacy workflows.',
      whatYouGet: ['Ionic + Capacitor setup', 'Native plugin integration', 'Performance guardrails', 'Release support'],
      faqs: [
        ['When is hybrid a good choice?', 'When you need speed, shared code, and moderate native complexity.'],
        ['Is performance good enough?', 'Yes for many business apps—if you stay within the right patterns.'],
        ['Can we migrate later to native?', 'We can plan for migration if your product outgrows hybrid.'],
        ['Do you handle push notifications?', 'Yes—via native plugins and platform configuration.'],
        ['Can you support UK compliance needs?', 'Yes—especially around data handling and security basics.'],
      ],
    },
  },
  'web-development': {
    'next-level-experiences': {
      tagline: 'Fast, SEO-Ready Web Experiences for UK Brands',
      overview:
        'We build modern websites and web apps with performance, accessibility, and conversion in mind—ideal for UK businesses that want speed and strong search visibility.',
      whatYouGet: ['Performance-first UI', 'SEO foundations', 'Analytics setup', 'Deployment + monitoring'],
      faqs: [
        ['Will this improve Core Web Vitals?', 'Yes—performance budgets and best practices are baked in.'],
        ['Do you support Vercel deployments?', 'Yes—Vercel is great for modern web delivery.'],
        ['Can you handle content and SEO?', 'Yes—technical SEO plus structure and on-page guidance.'],
        ['Is accessibility included?', 'Yes—WCAG-friendly patterns and testing.'],
        ['Do you work with UK teams?', 'Yes—collaboration aligns to UK hours.'],
      ],
    },
    'mern-mean-power': {
      tagline: 'Real-Time Web Apps Built to Scale',
      overview:
        'From dashboards to SaaS, we deliver full-stack builds with reliable APIs and scalable data—structured for long-term maintainability for UK product teams.',
      whatYouGet: ['API + database design', 'Realtime features', 'Auth + roles', 'Testing + CI/CD'],
      faqs: [
        ['Which stack do you recommend?', 'We choose based on your team and goals—React/Node is common.'],
        ['Can you integrate payments?', 'Yes—Stripe and similar providers.'],
        ['Do you provide documentation?', 'Yes—handoff docs and maintainable patterns.'],
        ['Is security covered?', 'Yes—secure auth, input validation, and best practices.'],
        ['Can we start small?', 'Yes—MVP first, then iterate.'],
      ],
    },
    'php-back-end-solutions': {
      tagline: 'PHP Backends and Integrations That Last',
      overview:
        'If PHP fits your ecosystem, we modernise and build reliable backends—clean architecture, integrations, and performance work for UK businesses.',
      whatYouGet: ['Backend refactors', 'API integration', 'Database optimisation', 'Deployment support'],
      faqs: [
        ['Can you modernise an existing PHP app?', 'Yes—incrementally and safely.'],
        ['Do you support Laravel?', 'Yes—when applicable.'],
        ['Will this help performance?', 'Yes—profiling and database tuning are included.'],
        ['Can you integrate with third parties?', 'Yes—payments, CRMs, fulfilment, etc.'],
        ['How do you handle releases?', 'CI/CD where possible and careful staging workflows.'],
      ],
    },
    'cms-solutions': {
      tagline: 'CMS Builds for Fast Updates and Growth',
      overview:
        'We build and configure CMS-driven sites so your UK team can publish quickly—clean templates, structured content, and SEO-friendly pages.',
      whatYouGet: ['CMS setup', 'Custom templates', 'SEO-friendly structure', 'Training + handover'],
      faqs: [
        ['Which CMS do you recommend?', 'Depends—WordPress/Shopify patterns for speed, custom when needed.'],
        ['Can you migrate content?', 'Yes—content migration and redirects are included.'],
        ['Is SEO handled?', 'Yes—metadata, sitemaps, and structure.'],
        ['Will the site be fast?', 'Yes—performance budgets and caching strategies.'],
        ['Do you support UK businesses?', 'Yes—copy and structure aligned to UK audiences.'],
      ],
    },
  },
  'desktop-development': {
    'robust-apps-with-dotnet': {
      tagline: '.NET Desktop Apps for UK Organisations',
      overview:
        'We build reliable .NET desktop software for internal tools and customer-facing products—secure, maintainable, and tailored to UK workflows.',
      whatYouGet: ['Architecture + UI', 'Integrations', 'Installers', 'Support + maintenance'],
      faqs: [
        ['Do you build Windows apps?', 'Yes—desktop apps and internal tools.'],
        ['Can you integrate with existing systems?', 'Yes—APIs and legacy integrations.'],
        ['Do you support offline use?', 'Yes—where required by the workflow.'],
        ['How do updates work?', 'We can set up auto-update patterns depending on the stack.'],
        ['Can you support security requirements?', 'Yes—role-based access and audit-friendly patterns.'],
      ],
    },
    'unity-immersion': {
      tagline: 'Unity Experiences and Interactive Builds',
      overview:
        'Unity can power training, marketing experiences, or games. We help UK teams prototype and ship interactive projects with solid performance and maintainable code.',
      whatYouGet: ['Prototype', 'Gameplay/interaction', 'Performance tuning', 'Build + release'],
      faqs: [
        ['Is this only for games?', 'No—Unity works well for interactive product and training experiences too.'],
        ['Can you ship cross-platform?', 'Often yes—depending on target platforms.'],
        ['Do you handle 2D and 3D?', 'Yes—both, with appropriate scope.'],
        ['Can you integrate analytics?', 'Yes—event tracking and funnels.'],
        ['Can you support UK businesses?', 'Yes—scoping and delivery in UK-friendly cadence.'],
      ],
    },
  },
  'seo-services': {
    'seo-audits-and-analysis': {
      tagline: 'Technical SEO Audits for UK Websites',
      overview:
        'We audit your site for technical issues, content gaps, and ranking opportunities—then deliver a prioritised roadmap focused on UK search intent and conversions.',
      whatYouGet: ['Crawl + index review', 'Core Web Vitals', 'Structured data', 'Prioritised fixes'],
      faqs: [
        ['How long does an audit take?', 'Typically 1–2 weeks depending on site size.'],
        ['Do you cover local SEO?', 'Yes—when location-based searches matter.'],
        ['Will you fix issues too?', 'Yes—engineering and SEO can be delivered together.'],
        ['Do you report results?', 'Yes—clear reporting and next actions.'],
        ['Is this suitable for UK SMEs?', 'Yes—audits are scoped to what matters most.'],
      ],
    },
    'keyword-research': {
      tagline: 'UK Keyword Research + Intent Mapping',
      overview:
        'We find the queries your UK customers actually use, group them by intent, and turn them into a content plan that supports rankings and lead generation.',
      whatYouGet: ['Keyword set', 'Intent clusters', 'Content plan', 'Competitor analysis'],
      faqs: [
        ['Do you include competitor keywords?', 'Yes—competitor gap analysis is part of it.'],
        ['Do you map keywords to pages?', 'Yes—so each page has a clear target.'],
        ['Can this support PPC too?', 'Yes—keyword insights help ads and landing pages.'],
        ['Do you focus on UK search volume?', 'Yes—UK-first data and intent.'],
        ['Will this help conversions?', 'Yes—intent-led pages typically convert better.'],
      ],
    },
  },
  'digital-marketing': {
    'brand-presence': {
      tagline: 'Digital Marketing for UK Growth',
      overview:
        'We design measurable marketing systems—positioning, campaigns, landing pages, and tracking—so UK teams can generate demand and convert it into revenue.',
      whatYouGet: ['Channel strategy', 'Landing pages', 'Tracking + reporting', 'Conversion optimisation'],
      faqs: [
        ['Do you run ads?', 'We can support paid strategy and performance with the right tracking.'],
        ['Do you handle content?', 'Yes—content structure and messaging that supports SEO and conversion.'],
        ['How do you measure results?', 'Clear KPIs: leads, CAC, conversion rate, and revenue where available.'],
        ['Is this UK-focused?', 'Yes—messaging and targeting for UK audiences.'],
        ['Can you work with our CRM?', 'Yes—HubSpot and similar integrations.'],
      ],
    },
  },
  'ui-ux-design': {
    'figma-mastery': {
      tagline: 'Figma UI Design Systems for UK Product Teams',
      overview:
        'We build clean, scalable Figma libraries—components, tokens, and patterns—so delivery stays consistent across pages and features.',
      whatYouGet: ['Component library', 'Design tokens', 'Handoff-ready files', 'Design QA'],
      faqs: [
        ['Do you create design systems?', 'Yes—components and tokens built for scale.'],
        ['Can you align with our brand?', 'Yes—typography, colour, and motion guidance.'],
        ['Do you work with developers?', 'Yes—handoff and QA to keep build accurate.'],
        ['Is accessibility included?', 'Yes—contrast and patterns considered by default.'],
        ['Do you support UK teams?', 'Yes—fast feedback loops within UK hours.'],
      ],
    },
    'adobe-xd-and-illustrator-mastery': {
      tagline: 'Visual Design + Brand Assets',
      overview:
        'We design UI screens, illustrations, and brand assets that support conversion and clarity—ideal for UK brands improving digital presence.',
      whatYouGet: ['UI screens', 'Illustrations', 'Brand assets', 'Export-ready deliverables'],
      faqs: [
        ['Do you deliver SVG/PNG assets?', 'Yes—export-ready assets for web and app use.'],
        ['Can you refresh a brand?', 'Yes—light refresh or full rebrand depending on needs.'],
        ['Will designs be consistent?', 'Yes—system-based approach.'],
        ['Can you work from existing UI?', 'Yes—iterate without breaking visual consistency.'],
        ['Do you provide handover?', 'Yes—organised files and guidance.'],
      ],
    },
    'rive-animation-magic': {
      tagline: 'Interactive Motion That Elevates UX',
      overview:
        'We add motion where it matters—micro-interactions, transitions, and interactive Rive animations that make your UK product feel premium without hurting performance.',
      whatYouGet: ['Motion guidelines', 'Rive animations', 'Implementation support', 'Performance guardrails'],
      faqs: [
        ['Will motion hurt performance?', 'We keep it lightweight and test on real devices.'],
        ['Can you integrate with React?', 'Yes—Rive + React patterns supported.'],
        ['Do you design the animation too?', 'Yes—design + build collaboration.'],
        ['Is it accessible?', 'Yes—reduced-motion is respected.'],
        ['Can we use it in marketing too?', 'Yes—animations can be reused across channels.'],
      ],
    },
    'interactive-prototyping': {
      tagline: 'Clickable Prototypes to Validate Fast',
      overview:
        'Before you build, validate. We create interactive prototypes that let UK stakeholders test flows, content, and conversion paths early—saving time and cost.',
      whatYouGet: ['User flows', 'Clickable prototype', 'Usability notes', 'Iteration rounds'],
      faqs: [
        ['How fast can we prototype?', 'Often within days after discovery.'],
        ['Can we test with users?', 'Yes—light usability testing can be included.'],
        ['Will this reduce build risk?', 'Yes—prototype-first catches UX issues early.'],
        ['Do developers benefit?', 'Yes—clear flows and edge cases reduce ambiguity.'],
        ['Is it suitable for UK stakeholders?', 'Yes—clear review cycles and demos.'],
      ],
    },
  },
};
