
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ResetPassword from './pages/ResetPassword'
import ResetConfirm from './pages/ResetConfirm'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import Addresses from './pages/Addresses'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import { useAuth } from './context/AuthContext'

const App = () => {
  return (
    <div className="min-h-screen overflow-x-hidden pt-16">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-confirm" element={<ResetConfirm />} />
        <Route path="/profile" element={<ProfileWrapper />} />
        <Route path="/addresses" element={<ProfileWrapper><Addresses /></ProfileWrapper>} />
        <Route path="/orders" element={<ProfileWrapper><Orders /></ProfileWrapper>} />
  <Route path="/cart" element={<ProfileWrapper><Cart /></ProfileWrapper>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App

function ProfileWrapper({ children }) {
  const { user } = useAuth()
  if (!user) return <Login />
  return children ? children : <Profile />
}
