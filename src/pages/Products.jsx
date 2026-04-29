import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  const filtered = products.filter(p => {
    const matchCategory = category === 'Tutti' || p.category === category
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.description.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <main className="min-h-screen bg-dark-950 text-white">
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
                  onSelect={() => navigate(`/prodotti/${product.id}`)}
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
