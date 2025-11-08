import React, { useMemo, useState } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { IoTrashOutline } from 'react-icons/io5'
import { useToast } from '../components/ui/Toast'

export default function Cart() {
  const { user, getCart, updateCartItem, removeFromCart, clearCart, addOrder } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [cart, setCart] = useState(() => getCart())
  const [processing, setProcessing] = useState(false)

  const subtotal = useMemo(() => cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0), [cart])
  const taxes = useMemo(() => +(subtotal * 0.075).toFixed(2), [subtotal])
  const total = useMemo(() => +(subtotal + taxes).toFixed(2), [subtotal, taxes])

  function changeQty(id, qty) {
    const updated = updateCartItem(id, qty)
    setCart(updated)
  }

  function removeItem(id) {
    const updated = removeFromCart(id)
    setCart(updated)
  }

  async function checkout() {
    if (!user) return navigate('/login')
    setProcessing(true)
    try {
      const order = { items: cart, total, date: new Date().toLocaleDateString(), status: 'pending' }
      await addOrder(order)
      clearCart()
      setCart([])
      toast.show('Order placed — thank you!', { type: 'success' })
      navigate('/orders')
    } catch (err) {
      console.error(err)
      toast.show('Checkout failed: ' + (err.message || ''), { type: 'error' })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Your cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-700">Your cart is empty.</p>
            <p className="text-sm text-gray-500 mt-2">Browse the site and add items to start your order.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow p-4 flex gap-4 items-center">
                    <img src={item.image || '/images/product-placeholder.svg'} alt={item.name} className="w-28 h-28 object-cover rounded-md" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                          {item.variant && <div className="mt-2 text-sm text-gray-600">Variant: {item.variant}</div>}
                        </div>
                        <div className="text-right">
                          <div className="text-gray-500 text-sm">Unit price</div>
                          <div className="font-semibold text-lg">${(item.price || 0).toFixed(2)}</div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center border rounded-md overflow-hidden">
                          <button className="px-3 py-1 text-gray-600" onClick={() => changeQty(item.id, Math.max(1, (item.qty || 1) - 1))}>-</button>
                          <div className="px-4 py-1">{item.qty}</div>
                          <button className="px-3 py-1 text-gray-600" onClick={() => changeQty(item.id, Math.min(99, (item.qty || 1) + 1))}>+</button>
                        </div>

                        <div className="text-sm text-gray-600">Subtotal: <span className="font-medium text-gray-900">${((item.price||0) * (item.qty||1)).toFixed(2)}</span></div>

                        <button onClick={() => removeItem(item.id)} className="ml-auto text-red-600 flex items-center gap-2"><IoTrashOutline /> Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

            <aside className="lg:sticky lg:top-24 bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm text-gray-600"><span>Taxes</span><span>${taxes.toFixed(2)}</span></div>
                <div className="flex justify-between font-semibold text-lg mt-3"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>

              <button onClick={checkout} disabled={processing} className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg">
                {processing ? 'Processing…' : 'Proceed to checkout'}
              </button>

              <button onClick={() => { clearCart(); setCart([]) }} className="w-full mt-3 text-sm text-red-600">Clear cart</button>
            </aside>
          </div>
        )}
      </main>
    </div>
  )
}
