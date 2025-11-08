import React, { useState } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { useAuth } from '../context/AuthContext'

export default function Addresses() {
  const { user, addAddress } = useAuth()
  const [label, setLabel] = useState('')
  const [address, setAddress] = useState('')
  const [msg, setMsg] = useState(null)

  async function save() {
    try {
      await addAddress({ label, address })
      setMsg('Address added')
      setLabel(''); setAddress('')
    } catch (err) { setMsg(err.message) }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Safe houses</h1>
        {msg && <div className="mb-4 text-sm text-green-600">{msg}</div>}
        <div className="mb-6">
          <label className="block mb-2">Label
            <input className="w-full mt-1 p-2 border rounded" value={label} onChange={e => setLabel(e.target.value)} />
          </label>
          <label className="block mb-2">Address
            <textarea className="w-full mt-1 p-2 border rounded" value={address} onChange={e => setAddress(e.target.value)} />
          </label>
          <button onClick={save} className="mt-2 bg-yellow-600 px-4 py-2 rounded text-white">Add</button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Your addresses</h2>
          <ul className="space-y-2">
            {(user?.addresses || []).map(a => (
              <li key={a.id} className="p-3 border rounded">{a.label}: {a.address}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
