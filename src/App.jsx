 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import LandingPage from './components/LandingPage.jsx'
import React from 'react'

function VideoPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <video className="w-full h-auto rounded-2xl shadow-xl bg-black" controls autoPlay muted playsInline preload="metadata" poster="/icons/icon-512.svg">
          <source src="/videos/educatch-demo.mp4" type="video/mp4" />
          <a href="/videos/educatch-demo.mp4">Download video</a>
        </video>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white font-poppins text-gray-900">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/demo" element={<VideoPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

