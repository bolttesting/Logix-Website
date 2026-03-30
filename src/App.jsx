import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import PortfolioPage from './pages/PortfolioPage'
import PortfolioProjectPage from './pages/PortfolioProjectPage'
import ServicePage from './pages/ServicePage'
import { SiteDataProvider } from './context/SiteDataContext'
import AdminLayout from './pages/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import PortfolioAdmin from './pages/admin/PortfolioAdmin'
import BlogAdmin from './pages/admin/BlogAdmin'
import TeamAdmin from './pages/admin/TeamAdmin'
import TestimonialsAdmin from './pages/admin/TestimonialsAdmin'
import ServicesAdmin from './pages/admin/ServicesAdmin'
import SettingsAdmin from './pages/admin/SettingsAdmin'
import ContactsAdmin from './pages/admin/ContactsAdmin'
import ReturnToTop from './components/ReturnToTop'
import './App.css'
import './pages/AboutPage.css'
import './pages/ContactPage.css'
import './pages/BlogPage.css'
import './pages/BlogPostPage.css'
import './pages/PortfolioPage.css'
import './pages/PortfolioProjectPage.css'
import './pages/ServicePage.css'

function App() {
  return (
    <SiteDataProvider>
      <div className="grid-bg" />
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="portfolio" element={<PortfolioAdmin />} />
          <Route path="blog" element={<BlogAdmin />} />
          <Route path="team" element={<TeamAdmin />} />
          <Route path="testimonials" element={<TestimonialsAdmin />} />
          <Route path="services" element={<ServicesAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
          <Route path="contacts" element={<ContactsAdmin />} />
        </Route>
        <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
        <Route path="/about" element={<><Navbar /><AboutPage /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><ContactPage /><Footer /></>} />
        <Route path="/blog" element={<><Navbar /><BlogPage /><Footer /></>} />
        <Route path="/blog/:id" element={<><Navbar /><BlogPostPage /><Footer /></>} />
        <Route path="/portfolio" element={<><Navbar /><PortfolioPage /><Footer /></>} />
        <Route path="/portfolio/:id" element={<><Navbar /><PortfolioProjectPage /><Footer /></>} />
        <Route path="/services/:slug" element={<><Navbar /><ServicePage /><Footer /></>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ReturnToTop />
    </SiteDataProvider>
  )
}

export default App
