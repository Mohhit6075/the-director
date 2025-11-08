import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Preloader from './components/ui/Preloader'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './components/ui/Toast'

export function Root() {
  const [loading, setLoading] = useState(true)

  return (
    <StrictMode>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      {!loading && (
        <BrowserRouter>
          <AuthProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </AuthProvider>
        </BrowserRouter>
      )}
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
