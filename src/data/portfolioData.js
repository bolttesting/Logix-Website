const projectTypes = ['Web App', 'Mobile App', 'E-commerce', 'SaaS Platform', 'Web App', 'Mobile App'];
const techStacks = [
  'React • Node • PostgreSQL',
  'React Native • Firebase',
  'Next.js • Stripe • Sanity',
  'Vue • Go • AWS',
  'Flutter • Firebase',
  'React • Shopify • Node',
];

const names = [
  'FinFlow',
  'HealthTrack',
  'EcoMarket',
  'DevHub',
  'UrbanRide',
  'ShopFlow',
  'StreamFit',
  'MedAssist',
  'TaskFlow',
  'DataViz',
  'CloudSync',
  'PayBridge',
  'LearnHub',
  'Eventify',
  'FoodDash',
  'FitTrack',
  'TravelGo',
  'RealEstate Pro',
  'InventoryX',
  'SocialConnect',
  'BookingFlow',
  'CRM Suite',
  'Analytics Hub',
  'SecureVault',
  'NotifyPro',
  'MarketPlace',
  'DocFlow',
  'ChatSync',
  'SurveyPro',
  'PortfolioX',
];

const descriptions = [
  'Financial management platform for SMEs with real-time analytics and reporting.',
  'Health and fitness tracking app with wearable integration and personalized insights.',
  'Sustainable e-commerce platform with carbon footprint tracking and ethical sourcing.',
  'Developer collaboration platform with code review, CI/CD integration, and team dashboards.',
  'Urban mobility app connecting riders with shared transport options and route planning.',
  'Custom headless e-commerce store with advanced inventory and order management.',
  'Streaming and fitness subscription platform with live classes and progress tracking.',
  'Healthcare management app for appointments, prescriptions, and patient records.',
  'Project and task management tool with real-time collaboration and reporting.',
  'Data visualization and analytics dashboard for business intelligence.',
  'Cloud storage and sync solution with team sharing and version control.',
  'Payment gateway and financial transactions platform for businesses.',
  'Online learning platform with courses, certifications, and progress tracking.',
  'Event management and ticketing system for conferences and concerts.',
  'Food delivery app with restaurant partners and real-time order tracking.',
  'Fitness and workout tracking app with personalized training plans.',
  'Travel booking platform with flights, hotels, and itinerary management.',
  'Real estate listing and property management platform.',
  'Inventory and warehouse management system with analytics.',
  'Social media management and scheduling platform.',
  'Appointment and reservation booking system for services.',
  'Customer relationship management with sales pipeline and reporting.',
  'Business analytics and KPI dashboard platform.',
  'Secure document storage and digital vault solution.',
  'Push notification and messaging platform for apps.',
  'Multi-vendor marketplace with seller dashboards.',
  'Document management and workflow automation system.',
  'Real-time messaging and team chat application.',
  'Survey and feedback collection platform with analytics.',
  'Portfolio and project showcase platform for creatives.',
];

const gradients = [
  'linear-gradient(135deg, rgba(1, 98, 162, 0.2) 0%, rgba(14, 165, 233, 0.15) 100%)',
  'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.15) 100%)',
  'linear-gradient(135deg, rgba(238, 119, 35, 0.2) 0%, rgba(245, 158, 11, 0.15) 100%)',
  'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)',
  'linear-gradient(135deg, rgba(1, 98, 162, 0.2) 0%, rgba(238, 119, 35, 0.15) 100%)',
  'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(1, 98, 162, 0.15) 100%)',
];

const categories = ['web', 'mobile', 'web', 'web', 'mobile', 'web', 'web', 'mobile', 'web', 'web', 'web', 'web', 'web', 'web', 'mobile', 'mobile', 'web', 'web', 'web', 'web', 'web', 'web', 'web', 'web', 'web', 'web', 'web', 'web', 'web', 'web'];

export const portfolioProjects = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: names[i],
  type: projectTypes[i % 6],
  category: categories[i],
  tech: techStacks[i % 6],
  description: descriptions[i],
  gradient: gradients[i % 6],
  image: `/portfolio/${i + 1}.jpg`,
}));

/**
 * Optional extended details per project. Add by project id for richer single-project pages.
 * All fields are optional - projects without details still display with basic info.
 */
export const portfolioProjectDetails = {
  1: {
    overview: 'FinFlow is a comprehensive financial management platform designed for small and medium enterprises. It provides real-time analytics, automated reporting, and multi-currency support to help businesses make data-driven decisions.',
    challenge: 'SMEs often struggle with fragmented financial data across spreadsheets and legacy systems, leading to delayed insights and poor cash flow management.',
    solution: 'We built a unified platform that aggregates data from banks, accounting software, and invoices into a single dashboard with AI-powered forecasting and customizable reports.',
    features: [
      { title: 'Real-Time Dashboard', desc: 'Live financial metrics and KPIs at a glance' },
      { title: 'Automated Reporting', desc: 'Scheduled PDF and Excel exports for stakeholders' },
      { title: 'Multi-Currency', desc: 'Support for 150+ currencies with automatic conversion' },
      { title: 'Invoice Management', desc: 'Create, send, and track invoices with payment reminders' },
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'Chart.js'],
    results: [
      { value: '40%', label: 'Faster reporting' },
      { value: '50+', label: 'Active SMEs' },
      { value: '4.9', label: 'User rating' },
    ],
    gallery: ['/portfolio/1.jpg'],
    liveUrl: '#',
    caseStudyUrl: '#',
    client: 'FinFlow Inc',
    year: '2024',
    duration: '6 months',
    testimonial: { quote: 'Logix Contact delivered beyond our expectations. The platform has transformed how we manage our finances.', author: 'CEO, FinFlow' },
  },
  // Add more project details by id: 2, 3, 4, ... as needed
};
