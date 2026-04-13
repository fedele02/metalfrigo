import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Search, X, Thermometer, Zap,
  Snowflake, ArrowRight, ChevronDown
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { products } from '../data/products'

const categories = ['Tutti', ...new Set(products.map(p => p.category))]

export default function Products() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Tutti')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filtered = products.filter(p => {
    const matchCategory = category === 'Tutti' || p.category === category
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.description.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedProduct])

  return (
    <main className="min-h-screen">
      {/* Hero & Filters */}
      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-primary-500/8 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-30">
          <AnimatedSection>
            <div className="flex items-center gap-2 text-primary-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3 sm:mb-4">
              <Snowflake className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Il Nostro Catalogo
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-4 sm:mb-6 leading-tight">
              Prodotti
              <span className="gradient-text"> Professionali</span>
            </h1>
            <p className="text-dark-200 text-base sm:text-lg max-w-2xl mb-8 sm:mb-10">
              Scopri la nostra gamma completa di soluzioni di refrigerazione industriale.
            </p>
          </AnimatedSection>

          {/* Search & Filter Bar */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center relative z-40">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-dark-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cerca prodotti..."
                  className="w-full pl-11 pr-10 py-3 sm:py-3.5 rounded-2xl bg-dark-800/50 border border-white/5 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all text-sm"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-dark-700 flex items-center justify-center text-dark-300 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Dropdown */}
              <div className="relative w-full sm:w-64">
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full flex items-center justify-between px-5 py-3 sm:py-3.5 rounded-2xl bg-dark-800/50 border border-white/5 text-sm font-medium text-white hover:bg-frost-200 transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-dark-400 font-normal">Categoria:</span>
                    {category}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl bg-dark-900/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] max-h-80 overflow-y-auto"
                    >
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setCategory(cat)
                            setIsCategoryOpen(false)
                          }}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all mb-1 last:mb-0 ${
                            category === cat
                              ? 'bg-primary-500/20 text-primary-400 font-semibold'
                              : 'text-dark-200 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  onSelect={() => setSelectedProduct(product)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16 sm:py-20">
              <Snowflake className="w-12 h-12 sm:w-16 sm:h-16 text-dark-600 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-dark-300 mb-2">Nessun prodotto trovato</h3>
              <p className="text-dark-400 text-sm sm:text-base">Prova a modificare i filtri o la ricerca.</p>
            </div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </main>
  )
}

/* ============================================
   PRODUCT CARD
============================================ */
function ProductCard({ product, index, onSelect }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div
        onClick={onSelect}
        className="group cursor-pointer rounded-2xl sm:rounded-3xl glass overflow-hidden hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] h-full flex flex-col"
      >
        {/* Image Area */}
        <div className="relative aspect-[4/5] overflow-hidden shrink-0 bg-white/5 flex items-center justify-center p-6 sm:p-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/40 via-transparent to-transparent pointer-events-none" />

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-primary-500/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-semibold">
              {product.badge}
            </span>
          </div>

          {/* Quick specs - Permanent */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="flex flex-wrap gap-2">
              {product.specs.dimensioni && (
                <span className="px-2.5 py-1.5 rounded-lg bg-dark-950/80 backdrop-blur-md text-primary-400 text-[10px] font-bold border border-white/5 flex items-center gap-1.5 shadow-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  {product.specs.dimensioni}
                </span>
              )}
              {product.specs.temperatura && (
                <span className="px-2.5 py-1.5 rounded-lg bg-dark-950/80 backdrop-blur-md text-white text-[10px] font-bold border border-white/5 flex items-center gap-1.5 shadow-xl">
                  <Thermometer className="w-3 h-3 text-primary-500" />
                  {product.specs.temperatura}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-8 flex flex-col flex-1">
          <div className="flex flex-col gap-1 mb-4">
            <p className="text-primary-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
              {product.category}
            </p>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg sm:text-xl font-bold font-heading text-white group-hover:text-primary-400 transition-colors leading-tight line-clamp-2 min-h-[52px]">
                {product.name}
              </h3>
              {product.price && (
                <p className="text-lg sm:text-xl font-bold gradient-text shrink-0">{product.price}</p>
              )}
            </div>
          </div>

          <p className="text-dark-300 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <span className="text-[10px] text-dark-400 font-bold uppercase tracking-widest">Esplora</span>
            <span className="text-white text-xs sm:text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
              Dettagli
              <ArrowRight className="w-4 h-4 text-primary-500" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ============================================
   PRODUCT MODAL
============================================ */
function ProductModal({ product, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-dark-950/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl glass shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-dark-800/80 backdrop-blur-sm flex items-center justify-center text-dark-300 hover:text-white hover:bg-dark-700 transition-all"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Mobile drag handle */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square sm:aspect-auto bg-white/5 flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[600px] cursor-zoom-in">
            <ZoomableImage src={product.image} alt={product.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-4 left-4 pointer-events-none">
              <span className="px-3 py-1.5 rounded-lg bg-primary-500/90 backdrop-blur-sm text-white text-xs font-semibold">
                {product.badge}
              </span>
            </div>
            {/* Zoom hint */}
            <div className="absolute bottom-4 right-4 bg-dark-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pointer-events-none opacity-0 sm:group-hover/image:opacity-100 transition-opacity">
              <p className="text-[10px] text-white/70 font-medium">Click per zoom</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-8">
            <p className="text-primary-400/70 text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-1 sm:mb-2">
              {product.category}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-1 sm:mb-2">
              {product.name}
            </h2>
            <p className="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6">{product.price}</p>

            <p className="text-dark-200 leading-relaxed mb-6 sm:mb-8 text-sm">
              {product.description}
            </p>

            {/* Technical Spec Sheet */}
            <div className="mb-8">
              <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                Scheda Tecnica
              </h3>
              <div className="rounded-2xl border border-white/5 overflow-hidden bg-dark-900/20 backdrop-blur-sm">
                {Object.entries(product.specs).map(([key, value], i) => (
                  <div 
                    key={i} 
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 p-3.5 sm:px-5 sm:py-4 transition-colors hover:bg-white/[0.02] ${
                      i !== Object.entries(product.specs).length - 1 ? 'border-b border-white/5' : ''
                    }`}
                  >
                    <span className="text-[10px] sm:text-xs text-dark-400 uppercase font-bold tracking-widest shrink-0">
                      {key}
                    </span>
                    <span className="text-xs sm:text-sm text-white font-medium sm:text-right leading-relaxed">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/#contatti"
              className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-sm sm:text-base hover:from-primary-400 hover:to-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 active:scale-[0.98]"
              onClick={onClose}
            >
              Richiedi Preventivo
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ============================================
   ZOOMABLE IMAGE
============================================ */
function ZoomableImage({ src, alt }) {
  const [isZoomed, setIsZoomed] = useState(false)
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const [constraints, setConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 })

  const updateConstraints = () => {
    if (containerRef.current && imageRef.current) {
      const container = containerRef.current.getBoundingClientRect()
      const img = imageRef.current
      
      // Calculate the actual rendered dimensions of the image inside object-contain
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

      setConstraints({
        left: -dragX,
        right: dragX,
        top: -dragY,
        bottom: dragY
      })
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
      className={`relative w-full h-full flex items-center justify-center overflow-hidden group/image ${
        isZoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
      }`}
    >
      <motion.img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={updateConstraints}
        onTap={() => setIsZoomed(!isZoomed)}
        animate={{ 
          scale: isZoomed ? 2.5 : 1,
          x: isZoomed ? undefined : 0,
          y: isZoomed ? undefined : 0
        }}
        drag={isZoomed}
        dragConstraints={constraints}
        dragElastic={0.1}
        dragMomentum={true}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full h-full object-contain p-4 sm:p-12 select-none pointer-events-auto"
      />
      
      {/* Zoom/Drag indicator */}
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 bg-dark-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-all duration-300 pointer-events-none ${
        isZoomed ? 'opacity-100' : 'opacity-0'
      }`}>
        <p className="text-[10px] text-white font-medium uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          Trascina per esplorare
        </p>
      </div>
    </div>
  )
}
