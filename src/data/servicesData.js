export const servicesMenu = [
  {
    id: 'app-development',
    title: 'App Development',
    path: '/services/app-development',
    items: [
      { title: 'Frontend Development', desc: 'Craft dynamic UIs with Flutter, XML, and React Native.', icon: 'code' },
      { title: 'Backend Engineering', desc: 'Build scalable solutions with Dart, Java, Kotlin, and React Native.', icon: 'gear' },
      { title: 'App Innovation', desc: 'Develop cross-platform mobile apps using Flutter or React Native, Ionic, Xamarin, NativeScript.', icon: 'sparkles' },
      { title: 'Hybrid App Development', desc: 'Build apps using Ionic and Capacitor for seamless integration with web and mobile.', icon: 'mobile' },
    ],
  },
  {
    id: 'web-development',
    title: 'Web Development',
    path: '/services/web-development',
    items: [
      { title: 'Next-Level Experiences', desc: 'Build fast, SEO-friendly, and scalable web apps with Next.js.', icon: 'sparkles' },
      { title: 'MERN | MEAN Power', desc: 'Create high-performance real-time apps with MongoDB, Express, Angular, React and Node.js.', icon: 'globe' },
      { title: 'PHP Back-End Solutions', desc: 'Build dynamic, scalable back-end systems with PHP for robust websites.', icon: 'repeat' },
      { title: 'CMS Solutions', desc: 'Design and manage websites effortlessly with WordPress, Joomla, or Shopify.', icon: 'grid' },
    ],
  },
  {
    id: 'desktop-development',
    title: 'Desktop Development',
    path: '/services/desktop-development',
    items: [
      { title: 'Robust Apps with .NET', desc: 'Create high-performance, enterprise-level apps for Windows with .NET.', icon: 'code' },
      { title: 'Unity Immersion', desc: 'Craft engaging 2D and 3D games with Unity for multiple platforms.', icon: 'play' },
    ],
  },
  {
    id: 'seo-services',
    title: 'SEO Services',
    path: '/services/seo-services',
    items: [
      { title: 'SEO Audits and Analysis', desc: 'Perform deep SEO audits to identify optimization opportunities.', icon: 'grid' },
      { title: 'Keyword Research', desc: 'Analyze high-impact keywords.', icon: 'search' },
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Strategy',
    path: '/services/digital-marketing',
    items: [
      { title: 'Brand Presence', desc: "Optimize your brand's presence with effective, result-driven marketing strategies.", icon: 'circle' },
    ],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    path: '/services/ui-ux-design',
    items: [
      { title: 'Figma Mastery', desc: "Craft captivating interfaces powered by Figma's brilliance.", icon: 'grid' },
      { title: 'Adobe XD & Illustrator Mastery', desc: "Turn ideas into stunning visuals with Illustrator's precision.", icon: 'arrowRight' },
      { title: 'Rive Animation Magic', desc: "Animate designs into life with Rive's interactivity.", icon: 'film' },
      { title: 'Interactive Prototyping', desc: 'Bring your ideas to life with clickable prototypes and interactive designs.', icon: 'design' },
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
