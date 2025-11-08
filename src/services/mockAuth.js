// Lightweight in-memory + localStorage mock auth service for development
const USERS_KEY = 'td_users_v1'

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch { return [] }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function _findUserByEmailOrPhone(identifier) {
  const users = loadUsers()
  return users.find(u => u.email === identifier || u.phone === identifier)
}

export function register({ name, email, phone, password }) {
  const users = loadUsers()
  if (users.find(u => u.email === email)) {
    throw new Error('Email already registered')
  }
  const id = Date.now().toString()
  const user = { id, name, email, phone, password, addresses: [], orders: [] }
  users.push(user)
  saveUsers(users)
  return { user, token: `token-${id}` }
}

export function login({ identifier, password }) {
  const users = loadUsers()
  const user = users.find(u => (u.email === identifier || u.phone === identifier) && u.password === password)
  if (!user) throw new Error('Invalid credentials')
  return { user, token: `token-${user.id}` }
}

export function requestPasswordReset(email) {
  const users = loadUsers()
  const user = users.find(u => u.email === email)
  if (!user) throw new Error('Email not found')
  // store token in localStorage (mock)
  const token = `reset-${Date.now()}`
  localStorage.setItem(`td_reset_${token}`, JSON.stringify({ userId: user.id }))
  return token
}

export function resetPassword(token, newPassword) {
  const saved = localStorage.getItem(`td_reset_${token}`)
  if (!saved) throw new Error('Invalid or expired token')
  const { userId } = JSON.parse(saved)
  const users = loadUsers()
  const user = users.find(u => u.id === userId)
  if (!user) throw new Error('User not found')
  user.password = newPassword
  saveUsers(users)
  localStorage.removeItem(`td_reset_${token}`)
  return true
}

export function updateProfile(userId, updates) {
  const users = loadUsers()
  const user = users.find(u => u.id === userId)
  if (!user) throw new Error('User not found')
  Object.assign(user, updates)
  saveUsers(users)
  return user
}

export function addAddress(userId, address) {
  const users = loadUsers()
  const user = users.find(u => u.id === userId)
  if (!user) throw new Error('User not found')
  const addr = { id: Date.now().toString(), ...address }
  user.addresses = user.addresses || []
  user.addresses.push(addr)
  saveUsers(users)
  return addr
}

export function getOrders(userId) {
  const users = loadUsers()
  const user = users.find(u => u.id === userId)
  return user?.orders || []
}

export function addOrder(userId, order) {
  const users = loadUsers()
  const user = users.find(u => u.id === userId)
  if (!user) throw new Error('User not found')
  const o = { id: Date.now().toString(), date: order.date || new Date().toLocaleDateString(), status: order.status || 'pending', items: order.items || [], total: order.total || 0 }
  user.orders = user.orders || []
  user.orders.push(o)
  saveUsers(users)
  return o
}
