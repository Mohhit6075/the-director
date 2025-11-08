import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import AuthForm from '../features/auth/AuthForm';
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useToast } from '../components/ui/Toast'

export default function ResetPassword() {
  const auth = useAuth()
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const toast = useToast()
  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Reset your password</h2>
          <p className="text-sm text-gray-600 mb-6">Enter the email associated with your account and we'll send a reset link.</p>
          {message && <div className="text-sm text-green-600 mb-3">{message}</div>}
          {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
          <AuthForm mode="reset" onSubmit={async (payload) => {
            setMessage(null); setError(null)
            try {
              const token = await auth.requestPasswordReset(payload.email)
              // in a real app we'd email the token; here we show it so developer can use reset page
              const msg = `Reset token created: ${token} (use ResetConfirm to set new password)`
              setMessage(msg)
              toast.show(msg, { type: 'info', duration: 8000 })
            } catch (err) {
              toast.show(err.message || 'Reset failed', { type: 'error' })
              setError(err.message)
            }
          }} />
          <p className="text-sm text-gray-600 mt-6 text-center">
            Remembered? <Link to="/login" className="text-yellow-600 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
