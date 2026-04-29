import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, MapPin } from 'lucide-react'
import Logo from './Logo'

const navLinks = [
  { name: 'Chi Siamo', path: '/' },
  { name: 'Prodotti', path: '/prodotti' },
  { name: 'Contattaci', path: '/#contatti' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const location = useLocation()

  const isProductPage = location.pathname.startsWith('/prodotti')
  const isProductDetail = location.pathname.startsWith('/prodotti/') && location.pathname !== '/prodotti'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      
      // Scroll Spy Logic for Home Page
      if (location.pathname === '/') {
        const sections = ['hero', 'chi-siamo', 'contatti']
        let current = 'chi-siamo' // default
        
        const scrollPosition = window.scrollY + 200 // Offset for earlier trigger

        // Check if we are at the bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
          current = 'contatti'
        } else {
          sections.forEach(id => {
            const el = document.getElementById(id)
            if (el && scrollPosition >= el.offsetTop) {
              current = id
            }
          })
        }
        
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [location])

  const handleLinkClick = (path) => {
    if (path === '/' && location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (path.includes('#') && location.pathname === '/') {
      const id = path.split('#')[1]
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // Define colors based on background
  const textColor = isProductDetail 
    ? (isScrolled ? 'text-dark-900' : 'text-dark-800') 
    : (isScrolled ? 'text-dark-200' : 'text-dark-100')
    
  const activeColor = 'text-primary-500'
  const hoverColor = isProductDetail ? 'group-hover:text-primary-600' : 'group-hover:text-white'

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b
        ${isScrolled 
          ? (isProductDetail ? 'bg-white/90 backdrop-blur-xl border-dark-100 py-3 md:py-4' : 'bg-dark-950/80 backdrop-blur-xl border-white/5 py-3 md:py-4') 
          : 'bg-transparent border-transparent py-5 md:py-8'}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* 1. Logo (Left) */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="group flex items-center gap-2">
              <Logo 
                isDark={isProductDetail}
                className="h-8 md:h-11 w-auto transition-all duration-500 group-hover:scale-105" 
              />
            </Link>
          </div>

          {/* 2. Desktop Menu (Center) - Centered & Unified */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => {
              // Advanced Active Logic (Scroll Spy + Path)
              let isActive = false
              
              if (link.path === '/prodotti') {
                isActive = isProductPage
              } else if (location.pathname === '/') {
                if (link.path === '/#contatti') {
                  isActive = activeSection === 'contatti'
                } else if (link.path === '/') {
                  isActive = activeSection !== 'contatti'
                }
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className="relative text-[13px] font-bold uppercase tracking-[0.15em] transition-all duration-300 group overflow-hidden"
                >
                  <span className={`relative z-10 transition-colors ${
                    isActive
                      ? activeColor
                      : `${textColor} ${hoverColor}`
                  }`}>
                    {link.name}
                  </span>
                  
                  {/* Animated underline */}
                  <div className={`absolute bottom-[-4px] left-0 h-[2px] bg-primary-500 transition-all duration-300 transform origin-left ${
                    isActive ? 'w-full scale-100' : 'w-full scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              )
            })}
          </div>

          {/* 3. Mobile Toggle (Right) */}
          <div className="flex-1 flex justify-end items-center md:hidden">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`p-2 transition-colors ${isProductDetail ? 'text-dark-900' : 'text-white'} hover:text-primary-400`}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

          {/* Spacing for Desktop (Right alignment symmetry) */}
          <div className="hidden md:flex flex-1" />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[49] bg-dark-950/95 backdrop-blur-2xl md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 z-50 bg-dark-900 border-b border-white/5 shadow-2xl p-8 pt-24 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => {
                        handleLinkClick(link.path);
                        setIsMobileOpen(false);
                    }}
                    className={`block py-6 text-3xl font-black font-heading tracking-tighter border-b border-white/5 transition-all ${
                        location.pathname === link.path ? 'text-primary-400' : 'text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-12">
                <div className="flex items-center gap-6 px-2">
                    <div className="flex items-center gap-3 text-dark-300 text-xs font-medium uppercase tracking-widest leading-none">
                        <MapPin className="w-4 h-4 text-primary-500" />
                        <span>Laterza, TA</span>
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

