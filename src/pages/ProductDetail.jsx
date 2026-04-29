import { useState, useRef, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  ArrowRight,
  Download,
  Box,
  Wind,
  Droplets,
  Zap,
  Info
} from 'lucide-react'
import { products } from '../data/products'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === parseInt(id))

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold text-dark-950 mb-4">Prodotto non trovato</h2>
        <Link to="/prodotti" className="text-primary-600 font-bold flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Torna al catalogo
        </Link>
      </div>
    )
  }

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pt-24 sm:pt-32 pb-24 sm:pb-32"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-24 sm:mb-40">
          
          {/* LEFT: MASSIVE IMAGE PRESENTATION (No box, maximum size) */}
          <div className="w-full lg:w-[60%] relative group">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full aspect-square flex items-center justify-center overflow-visible"
            >
              <ZoomableImage 
                src={`${import.meta.env.BASE_URL}${product.image}`}
                alt={product.name}
              />
            </motion.div>
          </div>

          {/* RIGHT: CONTENT & ENHANCED QUICK SPECS */}
          <div className="w-full lg:w-[40%] space-y-10 sm:space-y-14">
            <div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold font-heading text-dark-950 leading-[0.85] tracking-tighter mb-8 sm:mb-10">
                {product.name}
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl text-dark-400 leading-tight font-bold tracking-tight">
                Prestazioni estreme e design industriale. La scelta definitiva per la conservazione professionale.
              </p>
            </div>

            {/* Quick Info Grid - BALANCED FONTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {[
                { icon: Box, label: 'Capacità Volume', value: product.specs.capacità || product.specs.capacita || 'N/D' },
                { icon: Wind, label: 'Raffreddamento', value: product.specs.raffreddamento || 'Sistema Aria' },
                { icon: Droplets, label: 'Gas Refrigerante', value: product.specs.gas || 'R290' },
                { icon: Zap, label: 'Alimentazione', value: product.specs.voltaggio || '220-240V' }
              ].map((item, i) => (
                <div key={i} className="group p-7 rounded-[2rem] bg-dark-50/40 border border-dark-100/60 hover:bg-white hover:shadow-xl hover:shadow-dark-950/5 transition-all duration-300 flex flex-col justify-between min-h-[150px]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-white border border-dark-100 flex items-center justify-center group-hover:bg-primary-500 group-hover:border-primary-500 transition-colors shrink-0">
                      <item.icon className="w-5 h-5 text-dark-400 group-hover:text-white" />
                    </div>
                    <span className="text-[12px] font-black uppercase tracking-[0.2em] text-dark-900 group-hover:text-primary-600">{item.label}</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-dark-800 tracking-tight leading-tight">{item.value}</p>
                </div>
              ))}
            </div>

            {/* ACTION BUTTON - Updated Text */}
            <div className="pt-4">
              <Link 
                to="/#contatti"
                className="group w-full inline-flex items-center justify-between px-10 py-7 bg-[#1a1f71] text-white rounded-[2.5rem] text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#131758] transition-all shadow-xl active:scale-[0.98]"
              >
                <span>Scheda tecnica completa</span>
                <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform ml-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>

        {/* TECHNICAL SECTION HEADER */}
        <div className="relative flex items-center justify-center mb-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-100"></div>
          </div>
          <div className="relative bg-white px-8 sm:px-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1f71] font-heading uppercase tracking-tighter">Dettagli Tecnici</h2>
          </div>
        </div>

        {/* TECHNICAL TABLE - ADAPTIVE DESIGN */}
        <div className="max-w-5xl mx-auto rounded-[3rem] overflow-hidden border border-dark-100 shadow-[0_30px_70px_rgba(0,0,0,0.04)] bg-white">
          <div className="hidden sm:flex bg-[#1a1f71] text-white">
            <div className="px-10 py-7 text-[12px] lg:text-[14px] font-black uppercase tracking-[0.3em] w-1/3 border-r border-white/10">Parametro</div>
            <div className="px-10 py-7 text-[12px] lg:text-[14px] font-black uppercase tracking-[0.3em] flex-1">Specifica Prodotto</div>
          </div>

          <div className="flex flex-col divide-y divide-dark-100">
            {Object.entries(product.specs).map(([key, value], i) => (
              <div 
                key={i} 
                className={`flex flex-col sm:flex-row transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-dark-50/20'} hover:bg-dark-50`}
              >
                <div className="px-8 sm:px-10 py-5 sm:py-7 sm:w-1/3 text-[11px] sm:text-base lg:text-lg font-black sm:border-r border-dark-100 capitalize text-dark-400 sm:text-dark-600 bg-dark-50/30 sm:bg-transparent">
                  {key}
                </div>
                <div className="px-8 sm:px-10 py-5 sm:py-7 flex-1 text-sm sm:text-base lg:text-lg font-bold text-dark-950 tracking-tight leading-relaxed">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER CTA */}
        <div className="mt-32 text-center">
            <Link 
              to="/#contatti"
              className="group inline-flex items-center gap-8 text-primary-600 font-black uppercase tracking-[0.4em] text-[11px] hover:text-primary-700 transition-all"
            >
              <div className="hidden sm:block w-16 h-[1px] bg-primary-600 group-hover:w-24 transition-all" />
              <span>Richiedi Preventivo Personalizzato</span>
              <div className="hidden sm:block w-16 h-[1px] bg-primary-600 group-hover:w-24 transition-all" />
            </Link>
        </div>

      </div>
    </motion.main>
  )
}

function ZoomableImage({ src, alt }) {
  const [isZoomed, setIsZoomed] = useState(false)
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const [constraints, setConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 })

  const updateConstraints = () => {
    if (containerRef.current && imageRef.current) {
      const container = containerRef.current.getBoundingClientRect()
      const img = imageRef.current
      const containerRatio = container.width / container.height
      const imageRatio = img.naturalWidth / img.naturalHeight
      
      let renderedWidth, renderedHeight
      if (imageRatio > containerRatio) {
        renderedWidth = container.width
        renderedHeight = container.width / imageRatio
      } else {
        renderedHeight = container.height
        renderedWidth = container.height * imageRatio
      }

      const scale = 2.5
      const dragX = Math.max(0, (renderedWidth * scale - container.width) / 2)
      const dragY = Math.max(0, (renderedHeight * scale - container.height) / 2)

      setConstraints({ left: -dragX, right: dragX, top: -dragY, bottom: dragY })
    }
  }

  useEffect(() => {
    updateConstraints()
    window.addEventListener('resize', updateConstraints)
    return () => window.removeEventListener('resize', updateConstraints)
  }, [isZoomed])

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center overflow-visible ${
        isZoomed ? 'cursor-grab active:cursor-grabbing z-50' : 'cursor-zoom-in'
      }`}
    >
      <motion.img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={updateConstraints}
        onClick={() => setIsZoomed(!isZoomed)}
        animate={{ scale: isZoomed ? 2.5 : 1.1, x: isZoomed ? undefined : 0, y: isZoomed ? undefined : 0 }}
        drag={isZoomed}
        dragConstraints={constraints}
        dragElastic={0.1}
        dragMomentum={true}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full h-full object-contain p-2 select-none pointer-events-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
      />
    </div>
  )
}
