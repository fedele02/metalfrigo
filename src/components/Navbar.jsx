import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, MapPin } from 'lucide-react'
import Logo from './Logo'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Prodotti', path: '/prodotti' },
  { name: 'Chi Siamo', path: '/#chi-siamo' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [location])

  const handleLinkClick = (path) => {
    if (path.includes('#') && location.pathname === '/') {
      const id = path.split('#')[1]
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b
        ${isScrolled 
          ? 'bg-dark-950/80 backdrop-blur-xl border-white/5 py-3 md:py-4' 
          : 'bg-transparent border-transparent py-5 md:py-8'}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* 1. Logo (Left) */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="group flex items-center gap-2">
              <Logo className="h-8 md:h-11 w-auto transition-all duration-500 group-hover:scale-105" />
            </Link>
          </div>

          {/* 2. Desktop Menu (Center) - Centered & Premium */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleLinkClick(link.path)}
                className="relative text-[13px] font-bold uppercase tracking-[0.15em] transition-all duration-300 group overflow-hidden"
              >
                <span className={`relative z-10 ${
                  (location.pathname === link.path || (link.path.includes('#') && location.hash === `#${link.path.split('#')[1]}`))
                    ? 'text-primary-400'
                    : 'text-dark-200 group-hover:text-white'
                }`}>
                  {link.name}
                </span>
                
                {/* Animated underline */}
                <div className={`absolute bottom-[-4px] left-0 h-[2px] bg-primary-500 transition-all duration-300 transform origin-left ${
                  (location.pathname === link.path) ? 'w-full scale-100' : 'w-full scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
          </div>

          {/* 3. CTA & Mobile Toggle (Right) */}
          <div className="flex-1 flex justify-end items-center gap-6">
            {/* Contattaci Button - Sophisticated Border Style */}
            <Link
              to="/#contatti"
              onClick={() => handleLinkClick('/#contatti')}
              className="hidden md:flex items-center gap-3 px-8 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-[12px] font-bold uppercase tracking-widest hover:bg-white hover:text-dark-950 transition-all duration-500 hover:scale-[1.02] shadow-2xl"
            >
              Contattaci
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="flex md:hidden p-2 text-white hover:text-primary-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
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

            <div className="mt-12 space-y-8">
                <Link
                    to="/#contatti"
                    onClick={() => {
                        handleLinkClick('/#contatti');
                        setIsMobileOpen(false);
                    }}
                    className="flex items-center justify-between w-full p-6 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold uppercase tracking-widest shadow-xl shadow-primary-500/20"
                >
                    Inizia Progetto
                    <ArrowRight className="w-5 h-5" />
                </Link>

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

