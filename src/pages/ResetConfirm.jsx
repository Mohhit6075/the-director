import React, { useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ResetConfirm() {
  const [params] = useSearchParams()
  const token = params.get('token')
  const auth = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)

  async function submit() {
    try {
      await auth.resetPassword(token, password)
      // navigate to login after successful reset
      navigate('/login')
    } catch (err) {
      setMsg(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Set a new password</h2>
        {msg && <div className="mb-4 text-sm text-green-600">{msg}</div>}
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded mb-4" placeholder="New password" />
        <button onClick={submit} className="bg-yellow-600 px-4 py-2 rounded text-white">Set password</button>
        <div className="mt-4 text-sm">Back to <Link to="/login" className="text-yellow-600">Login</Link></div>
      </div>
    </div>
  )
}
