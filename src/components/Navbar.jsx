import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Prodotti', path: '/prodotti' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [location])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 pointer-events-none p-4 md:p-6`}
      >
        <div
          className={`w-full max-w-5xl flex items-center justify-between px-4 md:px-8 py-3 transition-all duration-500 pointer-events-auto
          ${isScrolled
              ? 'glass rounded-full shadow-2xl shadow-primary-500/10 border-white/10'
              : 'bg-transparent border-transparent'
            }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <Logo className="h-8 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 group"
              >
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary-500/10 rounded-full border border-primary-500/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${location.pathname === link.path
                    ? 'text-primary-400'
                    : 'text-dark-200 group-hover:text-white'
                  }`}>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Secondary CTA / Contact */}

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="w-10 h-10 rounded-full glass-light flex items-center justify-center text-white border border-white/10"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-28 px-6 bg-dark-950/98 backdrop-blur-2xl md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-6 py-4 rounded-2xl text-xl font-medium transition-all ${location.pathname === link.path
                        ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                        : 'text-dark-200 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

