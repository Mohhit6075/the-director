import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import AuthForm from '../features/auth/AuthForm';
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useToast } from '../components/ui/Toast'

export default function Signup() {
  const auth = useAuth()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Create your account</h2>
          <p className="text-sm text-gray-600 mb-6">Start your journey with The Director.</p>
          {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
          <AuthForm mode="signup" onSubmit={async (payload) => {
            setError(null)
            setLoading(true)
            try {
              await auth.register({ name: payload.name, email: payload.email, phone: payload.phone, password: payload.password })
              toast.show('Account created', { type: 'success' })
              navigate('/')
            } catch (err) {
              toast.show(err.message || 'Signup failed', { type: 'error' })
              setError(err.message)
            } finally { setLoading(false) }
          }} />
          {loading && <div className="text-sm text-gray-600 mt-2">Creating account…</div>}
          <p className="text-sm text-gray-600 mt-6 text-center">
            Already have an account? <Link to="/login" className="text-yellow-600 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
