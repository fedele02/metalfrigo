import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Search, X, Thermometer, Zap,
  Snowflake, ArrowRight
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { products } from '../data/products'

const categories = ['Tutti', ...new Set(products.map(p => p.category))]

export default function Products() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Tutti')
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
      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-primary-500/8 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
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
            <div className="mb-4 sm:mb-6">
              <div className="relative w-full sm:max-w-md mb-4">
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

              {/* Category Tabs - horizontal scroll on mobile */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 sm:mx-0 px-4 sm:px-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                      category === cat
                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                        : 'glass-light text-dark-300 hover:text-white hover:bg-frost-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
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
        className="group cursor-pointer rounded-2xl sm:rounded-3xl glass overflow-hidden hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-500 hover:-translate-y-1 active:scale-[0.98]"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />

          {/* Badge */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-primary-500/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-semibold">
              {product.badge}
            </span>
          </div>

          {/* Quick specs on hover - hidden on small touch devices */}
          <div className="hidden sm:block absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
            <div className="flex flex-wrap gap-2">
              {Object.entries(product.specs).slice(0, 2).map(([key, value]) => (
                <span key={key} className="px-2.5 py-1 rounded-md bg-dark-950/80 backdrop-blur-sm text-primary-400 text-[10px] font-medium flex items-center gap-1">
                  {key.includes('temp') ? <Thermometer className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="min-w-0">
              <p className="text-primary-400/70 text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-0.5 sm:mb-1">
                {product.category}
              </p>
              <h3 className="text-base sm:text-lg font-bold font-heading text-white group-hover:text-primary-400 transition-colors leading-tight">
                {product.name}
              </h3>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg sm:text-xl font-bold gradient-text">{product.price}</p>
            </div>
          </div>

          <p className="text-dark-300 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3 sm:mb-4">
            {product.description}
          </p>

          <div className="flex items-center justify-end">
            <span className="text-primary-400 text-xs sm:text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Dettagli
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
          <div className="relative aspect-[16/9] sm:aspect-auto sm:min-h-[400px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-t-2xl sm:rounded-l-3xl sm:rounded-tr-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/50 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-dark-950/20" />
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
              <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-primary-500/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-semibold">
                {product.badge}
              </span>
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

            {/* Specs Grid */}
            <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Specifiche Tecniche
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div key={i} className="p-2.5 sm:p-3 rounded-xl bg-dark-800/50 border border-white/5">
                  <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                    <span className="text-dark-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-tight">{key}</span>
                  </div>
                  <p className="text-white text-xs sm:text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/#contatti"
              className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-sm sm:text-base hover:from-primary-400 hover:to-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 active:scale-[0.98]"
              onClick={onClose}
            >
              Richiedi Preventivo
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
