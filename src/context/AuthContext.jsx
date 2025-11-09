/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import * as auth from '../services/mockAuth'

const AuthContext = createContext(null)


export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    // load from localStorage (remember me)
    const s = localStorage.getItem('td_session')
    const sess = s ? JSON.parse(s) : null
    if (sess) {
      setUser(sess.user)
      setToken(sess.token)
    }
  }, [])

  function persistSession(user, token, remember) {
    setUser(user)
    setToken(token)
    const storage = remember ? localStorage : sessionStorage
    storage.setItem('td_session', JSON.stringify({ user, token }))
    // remove from the other storage
    if (remember) sessionStorage.removeItem('td_session')
    else localStorage.removeItem('td_session')
  }

  const register = async (payload) => {
    const { user, token } = auth.register(payload)
    persistSession(user, token, true)
    return { user, token }
  }

  const login = async ({ identifier, password, remember }) => {
    const { user, token } = auth.login({ identifier, password })
    persistSession(user, token, remember)
    return { user, token }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('td_session')
    sessionStorage.removeItem('td_session')
    navigate('/') // Assuming you have a navigate function available
  }

  const requestPasswordReset = async (email) => {
    return auth.requestPasswordReset(email)
  }

  const resetPassword = async (token, newPassword) => {
    return auth.resetPassword(token, newPassword)
  }

  const updateProfile = async (updates) => {
    if (!user) throw new Error('Not authenticated')
    const updated = auth.updateProfile(user.id, updates)
    setUser(updated)
    // reflect in storage
    const s = localStorage.getItem('td_session') || sessionStorage.getItem('td_session')
    if (s) {
      const sess = JSON.parse(s)
      sess.user = updated
  try { localStorage.setItem('td_session', JSON.stringify(sess)) } catch (e) { console.error('persist session localStorage', e) }
  try { sessionStorage.setItem('td_session', JSON.stringify(sess)) } catch (e) { console.error('persist session sessionStorage', e) }
    }
    return updated
  }

  const addAddress = async (address) => {
    if (!user) throw new Error('Not authenticated')
    const addr = auth.addAddress(user.id, address)
    // update local user copy
    const updated = { ...user, addresses: [...(user.addresses || []), addr] }
    setUser(updated)
    return addr
  }

  const getOrders = async () => {
    if (!user) return []
    return auth.getOrders(user.id)
  }

  const addOrder = async (order) => {
    if (!user) throw new Error('Not authenticated')
    const o = auth.addOrder(user.id, order)
    // update local user copy orders
    const updated = { ...user, orders: [...(user.orders || []), o] }
    setUser(updated)
    const s = localStorage.getItem('td_session') || sessionStorage.getItem('td_session')
    if (s) {
      const sess = JSON.parse(s)
      sess.user = updated
  try { localStorage.setItem('td_session', JSON.stringify(sess)) } catch (e) { console.error('persist session localStorage', e) }
  try { sessionStorage.setItem('td_session', JSON.stringify(sess)) } catch (e) { console.error('persist session sessionStorage', e) }
    }
    return o
  }

  // simple per-user cart stored in localStorage under td_cart_<userId>
  const getCart = () => {
    if (!user) return []
    try {
      return JSON.parse(localStorage.getItem(`td_cart_${user.id}`) || '[]')
    } catch (e) { console.error('read cart', e); return [] }
  }

  const setCart = (cart) => {
    if (!user) return
    try { localStorage.setItem(`td_cart_${user.id}`, JSON.stringify(cart)) } catch (e) { console.error('write cart', e) }
  }

  const addToCart = (item) => {
    if (!user) throw new Error('Not authenticated')
    const cart = getCart()
    const existing = cart.find(c => c.id === item.id)
    if (existing) existing.qty = Math.min((existing.qty || 1) + (item.qty || 1), 99)
    else cart.push({ ...item, qty: item.qty || 1 })
    setCart(cart)
    return cart
  }

  const updateCartItem = (itemId, qty) => {
    if (!user) throw new Error('Not authenticated')
    let cart = getCart()
    cart = cart.map(c => c.id === itemId ? { ...c, qty } : c).filter(c => c.qty > 0)
    setCart(cart)
    return cart
  }

  const removeFromCart = (itemId) => {
    if (!user) throw new Error('Not authenticated')
    const cart = getCart().filter(c => c.id !== itemId)
    setCart(cart)
    return cart
  }

  const clearCart = () => {
    if (!user) return
    try { localStorage.removeItem(`td_cart_${user.id}`) } catch (e) { console.error('clear cart', e) }
  }

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, requestPasswordReset, resetPassword, updateProfile, addAddress, getOrders, addOrder, getCart, setCart, addToCart, updateCartItem, removeFromCart, clearCart }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
