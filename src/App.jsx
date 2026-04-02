import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ReturnToTop from './components/ReturnToTop'
import WhatsAppFloat from './components/WhatsAppFloat'
import CookieNotice from './components/CookieNotice'
import GlobalJsonLd from './components/GlobalJsonLd'
import PageFallback from './components/PageFallback'
import { SiteDataProvider } from './context/SiteDataContext'
import './App.css'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const PortfolioProjectPage = lazy(() => import('./pages/PortfolioProjectPage'))
const ServicePage = lazy(() => import('./pages/ServicePage'))
const TermsPage = lazy(() => import('./pages/policy/TermsPage'))
const PrivacyPage = lazy(() => import('./pages/policy/PrivacyPage'))
const RefundPolicyPage = lazy(() => import('./pages/policy/RefundPolicyPage'))
const ServiceAgreementPage = lazy(() => import('./pages/policy/ServiceAgreementPage'))
const CookiePolicyPage = lazy(() => import('./pages/policy/CookiePolicyPage'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const PortfolioAdmin = lazy(() => import('./pages/admin/PortfolioAdmin'))
const BlogAdmin = lazy(() => import('./pages/admin/BlogAdmin'))
const TeamAdmin = lazy(() => import('./pages/admin/TeamAdmin'))
const TestimonialsAdmin = lazy(() => import('./pages/admin/TestimonialsAdmin'))
const ServicesAdmin = lazy(() => import('./pages/admin/ServicesAdmin'))
const SettingsAdmin = lazy(() => import('./pages/admin/SettingsAdmin'))
const ContactsAdmin = lazy(() => import('./pages/admin/ContactsAdmin'))
const NewsletterAdmin = lazy(() => import('./pages/admin/NewsletterAdmin'))

function normalizePathname(p) {
  if (!p || p === '/') return '/'
  return p.replace(/\/+$/, '') || '/'
}

function PublicRoute({ children }) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<PageFallback />}>{children}</Suspense>
      <Footer />
    </>
  )
}

function App() {
  const location = useLocation()
  const { pathname, hash } = location
  /** Login must not depend on SiteDataProvider (avoids blank page if context render throws). */
  const isAdminLogin = normalizePathname(pathname) === '/admin/login'

  // React Router SPA navigation does not automatically reset scroll position.
  // Scroll to the top (or to the hash target) whenever the route changes.
  useEffect(() => {
    if (isAdminLogin) return

    if (hash) {
      const id = hash.replace('#', '')
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' })
        else window.scrollTo({ top: 0, behavior: 'auto' })
      })
      return
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash, isAdminLogin])

  const shell = (
    <>
      <GlobalJsonLd />
      {!isAdminLogin && (
        <>
          <div className="grid-bg" />
          <div className="gradient-orb gradient-orb-1" />
          <div className="gradient-orb gradient-orb-2" />
        </>
      )}
      <Routes>
        <Route
          path="/admin/login"
          element={(
            <Suspense fallback={<PageFallback />}>
              <AdminLogin />
            </Suspense>
          )}
        />
        <Route
          path="/admin"
          element={(
            <Suspense fallback={<PageFallback />}>
              <AdminLayout />
            </Suspense>
          )}
        >
          <Route index element={(
            <Suspense fallback={<PageFallback />}>
              <AdminDashboard />
            </Suspense>
          )}
          />
          <Route path="portfolio" element={(
            <Suspense fallback={<PageFallback />}>
              <PortfolioAdmin />
            </Suspense>
          )}
          />
          <Route path="blog" element={(
            <Suspense fallback={<PageFallback />}>
              <BlogAdmin />
            </Suspense>
          )}
          />
          <Route path="team" element={(
            <Suspense fallback={<PageFallback />}>
              <TeamAdmin />
            </Suspense>
          )}
          />
          <Route path="testimonials" element={(
            <Suspense fallback={<PageFallback />}>
              <TestimonialsAdmin />
            </Suspense>
          )}
          />
          <Route path="services" element={(
            <Suspense fallback={<PageFallback />}>
              <ServicesAdmin />
            </Suspense>
          )}
          />
          <Route path="settings" element={(
            <Suspense fallback={<PageFallback />}>
              <SettingsAdmin />
            </Suspense>
          )}
          />
          <Route path="contacts" element={(
            <Suspense fallback={<PageFallback />}>
              <ContactsAdmin />
            </Suspense>
          )}
          />
          <Route path="newsletter" element={(
            <Suspense fallback={<PageFallback />}>
              <NewsletterAdmin />
            </Suspense>
          )}
          />
        </Route>
        <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
        <Route path="/about" element={<PublicRoute><AboutPage /></PublicRoute>} />
        <Route path="/contact" element={<PublicRoute><ContactPage /></PublicRoute>} />
        <Route path="/blog" element={<PublicRoute><BlogPage /></PublicRoute>} />
        <Route path="/blog/:id" element={<PublicRoute><BlogPostPage /></PublicRoute>} />
        <Route path="/portfolio" element={<PublicRoute><PortfolioPage /></PublicRoute>} />
        <Route path="/portfolio/:id" element={<PublicRoute><PortfolioProjectPage /></PublicRoute>} />
        <Route path="/services/:slug" element={<PublicRoute><ServicePage /></PublicRoute>} />
        <Route path="/services/:slug/:sub" element={<PublicRoute><ServicePage /></PublicRoute>} />
        <Route path="/legal/terms" element={<PublicRoute><TermsPage /></PublicRoute>} />
        <Route path="/legal/privacy" element={<PublicRoute><PrivacyPage /></PublicRoute>} />
        <Route path="/legal/refunds" element={<PublicRoute><RefundPolicyPage /></PublicRoute>} />
        <Route path="/legal/service-agreement" element={<PublicRoute><ServiceAgreementPage /></PublicRoute>} />
        <Route path="/legal/cookie-policy" element={<PublicRoute><CookiePolicyPage /></PublicRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ReturnToTop />
      {!isAdminLogin && <WhatsAppFloat />}
      {!isAdminLogin && <CookieNotice />}
    </>
  )

  if (isAdminLogin) {
    return shell
  }
  return <SiteDataProvider>{shell}</SiteDataProvider>
}

export default App
