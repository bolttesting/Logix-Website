import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import RootErrorBoundary from './RootErrorBoundary.jsx'
import { Analytics } from '@vercel/analytics/react'
import { COOKIE_CONSENT_EVENT, getCookiePrefs } from './utils/cookieConsent'
import './index.css'
import './theme-light.css'
import App from './App.jsx'

function AnalyticsGate() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const sync = () => setEnabled(Boolean(getCookiePrefs().analytics))
    sync()
    window.addEventListener(COOKIE_CONSENT_EVENT, sync)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, sync)
  }, [])

  return enabled ? <Analytics /> : null
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AnalyticsGate />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </RootErrorBoundary>
  </StrictMode>,
)
