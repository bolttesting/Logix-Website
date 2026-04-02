import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import RootErrorBoundary from './RootErrorBoundary.jsx'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import './theme-light.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <Analytics />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </RootErrorBoundary>
  </StrictMode>,
)
