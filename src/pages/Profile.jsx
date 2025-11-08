import React, { useState, useRef, useEffect } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useToast } from '../components/ui/Toast'
import { IoReceiptOutline, IoPerson, IoLocation, IoLogOut, IoLockClosed } from 'react-icons/io5'

export default function Profile() {
  const { user, updateProfile, getOrders, logout } = useAuth()
  const [profile, setProfile] = useState({ name: user?.name || '', phone: user?.phone || '' })
  const [editing, setEditing] = useState({ name: false, phone: false })
  const toast = useToast()
  const [orders, setOrders] = useState([])
  const nameRef = useRef(null)
  const phoneRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    getOrders().then(list => { if (mounted) setOrders(list.slice().reverse()) })
    return () => { mounted = false }
  }, [getOrders])

  const startEdit = (field) => { setEditing(e => ({ ...e, [field]: true })); setTimeout(() => { if (field === 'name') nameRef.current?.focus(); else phoneRef.current?.focus() }, 50) }
  const cancelEdit = (field) => { setProfile(p => ({ ...p, [field]: user?.[field] || '' })); setEditing(e => ({ ...e, [field]: false })) }

  const saveField = async (field) => {
    try {
      const payload = { [field]: profile[field] }
      const updated = await updateProfile(payload)
      toast.show('Saved')
      setEditing(e => ({ ...e, [field]: false }))
      // update local user object if available
      if (updated) setProfile({ name: updated.name, phone: updated.phone })
    } catch (err) {
      toast.show(err.message || 'Save failed', { duration: 3000 })
    }
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left nav */}
            <aside className="lg:col-span-1 bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-3 p-2">
              <img src="/images/avatar-placeholder.svg" alt="avatar" className="w-14 h-14 rounded-full object-cover" />
              <div>
                <div className="text-sm text-gray-500">Welcome</div>
                <div className="font-medium">{user?.name}</div>
                <div className="text-xs text-gray-400">{user?.email}</div>
              </div>
            </div>

              <nav className="mt-4 space-y-1">
              <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"><IoPerson /> Overview</Link>
              <Link to="/orders" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"><IoReceiptOutline /> Orders <span className="ml-auto text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">{orders.length}</span></Link>
              <Link to="/addresses" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"><IoLocation /> Addresses</Link>
              <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"><IoLockClosed /> Security</Link>
              <button onClick={() => { const a = confirm('Log out?'); if (a) { logout(); navigate('/') } }} className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors text-red-600"><IoLogOut /> Logout</button>
            </nav>
          </aside>

          {/* Main content */}
          <section className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-start gap-6">
                <img src="/images/avatar-placeholder.svg" alt="avatar" className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">Account</h2>
                  <p className="text-sm text-gray-500 mt-1">Manage your personal information and account settings.</p>
                </div>
                
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {/* Personal info card */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium mb-4">Personal information</h3>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-40 text-sm text-gray-600">Full name</div>
                      <div className="flex-1">
                        <input ref={nameRef} disabled={!editing.name} value={profile.name} onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))} className={`w-full p-3 border rounded-md ${editing.name ? 'bg-white' : 'bg-gray-50 text-gray-600'}`} />
                      </div>
                      <div className="w-40 text-right">
                        {!editing.name ? (
                          <button onClick={() => startEdit('name')} className="text-sm text-yellow-600">Edit</button>
                        ) : (
                          <div className="flex items-center gap-2 justify-end">
                            <button onClick={() => saveField('name')} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Save</button>
                            <button onClick={() => cancelEdit('name')} className="px-3 py-1 border rounded text-sm">Cancel</button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-40 text-sm text-gray-600">Phone</div>
                      <div className="flex-1">
                        <input ref={phoneRef} disabled={!editing.phone} value={profile.phone} onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))} className={`w-full p-3 border rounded-md ${editing.phone ? 'bg-white' : 'bg-gray-50 text-gray-600'}`} />
                      </div>
                      <div className="w-40 text-right">
                        {!editing.phone ? (
                          <button onClick={() => startEdit('phone')} className="text-sm text-yellow-600">Edit</button>
                        ) : (
                          <div className="flex items-center gap-2 justify-end">
                            <button onClick={() => saveField('phone')} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Save</button>
                            <button onClick={() => cancelEdit('phone')} className="px-3 py-1 border rounded text-sm">Cancel</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent orders */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Recent orders</h3>
                    <Link to="/orders" className="text-sm text-yellow-600">View all</Link>
                  </div>

                  <div className="mt-4 space-y-3">
                    {orders.length === 0 && <div className="text-sm text-gray-600">No recent orders</div>}
                    {orders.slice(0,4).map(o => (
                      <div key={o.id} className="flex items-center gap-4 p-3 border rounded">
                        <div className="flex-1">
                          <div className="text-sm text-gray-600">Order #{o.id}</div>
                          <div className="font-medium">{o.items?.slice(0,2).map(i => i.name).join(', ') || '—'}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{o.date}</div>
                          <div className="font-semibold">${o.total?.toFixed(2) || '0.00'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="space-y-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <h4 className="text-sm text-gray-600">Quick actions</h4>
                  <div className="mt-3 space-y-2">
                    <button onClick={() => navigate('/addresses')} className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 transition">Manage addresses</button>
                    <button onClick={() => navigate('/orders')} className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 transition">View orders</button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <h4 className="text-sm text-gray-600">Security</h4>
                  <div className="mt-3">
                    <button onClick={() => navigate('/reset-password')} className="w-full px-3 py-2 rounded border">Change password</button>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </div>

        {/* Global toasts are rendered by ToastProvider */}
      </main>
    </div>
  )
}
