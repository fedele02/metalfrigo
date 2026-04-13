import { Link } from 'react-router-dom'
import { Snowflake, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center group mb-5">
              <Logo className="text-3xl md:text-5xl transition-transform duration-300 group-hover:scale-105" />
            </Link>
            <p className="text-dark-300 leading-relaxed max-w-md mb-6 text-sm font-normal">
              Specialisti della produzione e della commercializzazione nel campo della refrigerazione di design in Italia e all'estero.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Navigazione
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Prodotti', path: '/prodotti' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-dark-300 hover:text-primary-400 transition-colors duration-300"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Contatti
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-dark-300">
                <MapPin className="w-4 h-4 text-primary-500 mt-1 shrink-0" />
                <span className="text-sm">Via dell'Industria 42, 74014 Laterza (TA), Puglia</span>
              </li>
              <li>
                <a href="tel:+390999821234" className="flex items-center gap-3 text-dark-300 hover:text-primary-400 transition-colors">
                  <Phone className="w-4 h-4 text-primary-500 shrink-0" />
                  <span className="text-sm">+39 099 982 1234</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@metalfrigo.it" className="flex items-center gap-3 text-dark-300 hover:text-primary-400 transition-colors">
                  <Mail className="w-4 h-4 text-primary-500 shrink-0" />
                  <span className="text-sm">info@metalfrigo.it</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-dark-400 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Metalfrigo S.r.l. — Tutti i diritti riservati.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
            <a href="#" className="text-dark-400 hover:text-dark-200 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-dark-400 hover:text-dark-200 text-sm transition-colors">Cookie Policy</a>
            <a href="#" className="text-dark-400 hover:text-dark-200 text-sm transition-colors">P.IVA 12345678901</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
