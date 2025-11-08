import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { useAuth } from '../context/AuthContext'

export default function Orders() {
  const { getOrders } = useAuth()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    getOrders().then(setOrders)
  }, [getOrders])

  const statusColor = (s) => {
    switch (s) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'shipped': return 'bg-blue-100 text-blue-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Order history</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-700">You have no orders yet.</p>
            <p className="text-sm text-gray-500 mt-2">When you place orders they'll appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <section className="lg:col-span-3 space-y-4">
              {orders.map(o => (
                <article key={o.id} className="bg-white rounded-lg shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <h2 className="text-lg font-medium">Order #{o.id}</h2>
                      <span className={`ml-3 px-3 py-1 rounded-full text-sm font-medium ${statusColor(o.status)}`}>{o.status}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">Placed on {o.date} • {o.items?.length || 0} items</p>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
                      {o.items?.map((it, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <img src={it.image || '/images/product-placeholder.svg'} alt={it.name} className="w-10 h-10 object-cover rounded" />
                          <div>
                            <div className="font-medium">{it.name}</div>
                            <div className="text-xs text-gray-500">{it.qty} × ${(it.price||0).toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 md:ml-6 flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Total</div>
                      <div className="font-semibold text-lg">${o.total?.toFixed(2) || '0.00'}</div>
                    </div>
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-md">View</button>
                  </div>
                </article>
              ))}
            </section>

            <aside className="lg:col-span-1 lg:sticky lg:top-28 bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-600">Filter & summary</h3>
              <p className="text-sm text-gray-500 mt-2">You can filter orders in future iterations. For now this area summarizes recent activity.</p>
              <div className="mt-4">
                <div className="text-sm text-gray-600">Total orders</div>
                <div className="text-2xl font-semibold">{orders.length}</div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  )
}
