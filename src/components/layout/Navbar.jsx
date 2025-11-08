import { IoIosCart, IoIosSearch, IoMdMenu, IoMdClose } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScroll = useRef(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef(null)
  const searchInputRef = useRef(null)
  const navLinks = [
    { link: "Home", href: "/" },
    { link: "The Origin Decree", href: "/about" },
    { link: "Contact Production Office", href: "/contact" },
  ];
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    lastScroll.current = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const current = window.scrollY
          // keep visible when mobile menu is open
          if (open) {
            setVisible(true)
            lastScroll.current = current
            ticking = false
            return
          }

          if (current > lastScroll.current + 10 && current > 60) {
            // scrolled down
            setVisible(false)
          } else if (current < lastScroll.current - 10) {
            // scrolled up
            setVisible(true)
          }
          lastScroll.current = current
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  // handle click outside to close search
  useEffect(() => {
    function onDocClick(e) {
      if (!searchOpen) return
      const el = searchRef.current
      if (el && !el.contains(e.target)) {
        // close with animation
        gsap.to(el, { width: 0, opacity: 0, duration: 0.2, ease: 'power1.in' })
        setSearchOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [searchOpen])

  // close search when user scrolls (but keep it open while interacting)
  useEffect(() => {
    if (!searchOpen) return
    const onScrollClose = () => {
      const el = searchRef.current
      if (!el) return
      gsap.killTweensOf(el)
      gsap.to(el, { width: 0, opacity: 0, duration: 0.2, ease: 'power1.in' })
      setSearchOpen(false)
    }
    window.addEventListener('scroll', onScrollClose, { passive: true })
    return () => window.removeEventListener('scroll', onScrollClose)
  }, [searchOpen])

  const toggleSearch = (e) => {
    e?.stopPropagation()
    const el = searchRef.current
    const isMobile = window.innerWidth < 768
    if (!el) return setSearchOpen(s => !s)

    if (!searchOpen) {
      // open
      // set an initial width so animation works
      gsap.killTweensOf(el)
      if (isMobile) {
        gsap.set(el, { width: 0, opacity: 0, left: 0, right: 0 })
        gsap.to(el, { width: '100%', opacity: 1, duration: 0.35, ease: 'power2.out', onComplete: () => searchInputRef.current?.focus() })
      } else {
        gsap.set(el, { width: 0, opacity: 0, transformOrigin: 'right center' })
        gsap.to(el, { width: 220, opacity: 1, duration: 0.35, ease: 'power2.out', onComplete: () => searchInputRef.current?.focus() })
      }
      setSearchOpen(true)
    } else {
      // close
      gsap.killTweensOf(el)
      gsap.to(el, { width: 0, opacity: 0, duration: 0.2, ease: 'power1.in' })
      setSearchOpen(false)
    }
  }

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 bg-white backdrop-blur-md transform transition-all duration-300 ease-in-out ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <nav className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 md:px-6 h-16">
        <div className="flex items-center gap-3">
          <img src="/images/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full brightness-150" />
          <button
            className="md:hidden p-2 rounded-md focus:outline-none"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {open ? <IoMdClose className="w-6 h-6" /> : <IoMdMenu className="w-6 h-6" />}
          </button>
          <div className="hidden md:flex items-center gap-6 text-sm lg:text-base">
            {navLinks.map(({ link, href }, index) => (
              <Link
                key={index}
                to={href}
                className={`transition ${
                  index === 2
                    ? "bg-[#bf9c6d] rounded-full px-4 py-2 text-[#212529] hover:text-black"
                    : "hover:text-yellow-400"
                }`}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <button onClick={toggleSearch} className="p-1 rounded-full focus:outline-none" aria-label="Open search">
             <IoIosSearch className="w-9 h-9 p-2 rounded-full text-black bg-[#f2f2f2] hover:text-yellow-400 cursor-pointer" /></button>

            {/* animated search container anchored to the icon wrapper so it grows from the icon */}
            <div ref={searchRef} className="absolute right-12 bottom-1 z-50 mt-2 bg-[#f2f2f2] rounded-full shadow-md overflow-hidden" style={{ width: 0, opacity: 0 }}>
              <form onSubmit={(e) => { e.preventDefault(); const v = searchInputRef.current?.value;
                searchInputRef.current.value = ''; console.log('search:', v); }} className="flex items-center px-2 py-1">
                <input ref={searchInputRef} type="search" placeholder="Search..." className="w-full px-3 py-2 text-sm focus:outline-none" />
                
              </form>
            </div>
          </div>

          <button onClick={() => auth?.user ? navigate('/profile') : navigate('/login')} className="px-6 py-2 bg-[#f2f2f2] rounded-full">
            Access Boardroom
          </button>
          <button onClick={() => auth?.user ? navigate('/cart') : navigate('/login')} className="w-10 h-10 p-3 rounded-full text-black bg-[#f2f2f2] hover:text-yellow-400 cursor-pointer">
            <IoIosCart />
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="absolute left-0 top-full w-full bg-white shadow-md md:hidden">
            <div className="flex flex-col px-4 py-3 gap-2">
              {navLinks.map(({ link, href }, i) => (
                <Link key={i} to={href} onClick={() => setOpen(false)} className="py-2 border-b last:border-b-0">
                  {link}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <button onClick={(e) => { e.stopPropagation(); toggleSearch(); setOpen(false); }} className="p-1 rounded-full focus:outline-none">
                  <IoIosSearch className="w-8 h-8 p-2 rounded-full text-black bg-[#f2f2f2]" />
                </button>
                <button onClick={() => { setOpen(false); (auth?.user ? navigate('/profile') : navigate('/login')) }} className="px-3 py-2 bg-[#f2f2f2] rounded-full">Access Boardroom</button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
