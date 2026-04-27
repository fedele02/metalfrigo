import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Award, ShieldCheck, Layout, ArrowRight,
  Phone, Mail, MapPin, Clock, Send
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'

export default function Home() {
  // Ensure we start at the top on every refresh
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="bg-dark-950">
      <HeroSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}

/* ============================================
   HERO SECTION
============================================ */
function HeroSection() {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const yImage = useTransform(scrollY, [0, 500], [0, 100])

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex items-center w-full overflow-hidden bg-dark-950">
      {/* Dynamic Background Image - De-zoomed & Blended */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

        {/* Parallax Image Layer */}
        <motion.div
          style={{ y: yImage }}
          className="absolute right-0 top-0 w-full h-full opacity-50 lg:opacity-90"
        >
          <img
            src={`${import.meta.env.BASE_URL}frighi-home.jpg`}
            alt="Showroom Metalfrigo"
            className="w-full h-full object-cover object-center lg:object-right scale-100"
          />

          {/* Advanced Blending Masks - Softened for better visibility */}
          {/* Desktop Left-to-Right Fade: Now softer and starts further left */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/30 to-transparent hidden lg:block" />

          {/* Mobile Top-to-Bottom Fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/40 to-dark-950/20 block lg:hidden" />

          {/* General vignetting */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-dark-950/20" />
        </motion.div>

        {/* Global atmospheric details */}
        <div className="absolute inset-0 bg-grid opacity-[0.03]" />
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-primary-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              Eccellenza nella Refrigerazione
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold font-heading leading-[0.9] tracking-tighter mb-8"
          >
            <span className="text-white">Soluzioni di</span>
            <br />
            <span className="gradient-text">Refrigerazione</span>
            <br />
            <span className="text-white">Industriale</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-dark-200 max-w-xl leading-relaxed mb-12 font-normal tracking-wide"
          >
            Siamo specializzati nella refrigerazione industriale di design all'avanguardia, unendo tecnologia estrema e sostenibilità.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/prodotti"
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-dark-950 font-bold text-lg hover:bg-primary-400 hover:text-white transition-all duration-500 overflow-hidden shadow-xl"
            >
              <span className="relative z-10">Scopri i Prodotti</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  )
}

/* ============================================
   ABOUT SECTION
============================================ */
function AboutSection() {
  const points = [
    {
      icon: Award,
      title: 'Esperienza Consolidata',
      text: "MetalFrigo rappresenta l'evoluzione di una consolidata esperienza nel settore della refrigerazione industriale e professionale per l'Ho.Re.Ca., la ristorazione e i mercati specializzati."
    },
    {
      icon: ShieldCheck,
      title: 'Qualità e Innovazione',
      text: "Produciamo frigoriferi progettati per durare nel tempo, garantendo prestazioni d'eccellenza grazie all'unione di artigianato e innovazione costante."
    },
    {
      icon: Layout,
      title: 'Design Impeccabile',
      text: "Offriamo soluzioni complete per trasformare ogni spazio di lavoro in un ambiente efficiente, funzionale e dal design estetico impeccabile."
    }
  ]

  return (
    <section id="chi-siamo" className="relative pt-24 sm:pt-40 pb-20 sm:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-700/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Centered Heading at Top */}
        <AnimatedSection className="text-center mb-16 sm:mb-24">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light text-primary-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            Chi Siamo
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white leading-[1.1] max-w-4xl mx-auto">
            L'eccellenza nella <br />
            <span className="gradient-text">Refrigerazione Professionale</span>
          </h2>
        </AnimatedSection>

        {/* 2-Column Content Below */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left Column: Text (Second on mobile, First on desktop) */}
          <div className="w-full lg:w-[42%] order-2 lg:order-1 space-y-8 sm:space-y-12 pr-0 lg:pr-8">
            {points.map((point, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="flex items-start gap-4 sm:gap-6 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center shrink-0">
                    <point.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors tracking-tight">
                      {point.title}
                    </h3>
                    <p className="text-dark-400 text-sm sm:text-[15px] leading-relaxed font-normal">
                      {point.text}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Right Column: Image (First on mobile, Second on desktop) */}
          <div className="w-full lg:w-[58%] order-1 lg:order-2">
            <AnimatedSection delay={0.3}>
              <div className="relative aspect-[16/10] sm:aspect-[1.5/1] lg:aspect-[1.4/1] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/60 group">
                <img
                  src={`${import.meta.env.BASE_URL}chi-siamo.jpg`}
                  alt="L'eccellenza Metalfrigo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-dark-950/20 to-transparent pointer-events-none opacity-40" />
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ============================================
   CONTACT SECTION
============================================ */
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', company: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contatti" className="relative py-16 sm:py-28 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest">Contatti</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white mt-4 mb-4 sm:mb-6">
            Parliamo del Tuo <span className="gradient-text">Progetto</span>
          </h2>
          <p className="text-dark-200 max-w-2xl mx-auto text-lg">
            Contattaci per un preventivo personalizzato o per scoprire la soluzione di refrigerazione
            ideale per la tua attività.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 flex flex-col gap-4 h-full">
            {[
              {
                icon: MapPin,
                title: 'Sede',
                info: 'Via dell\'Industria 42',
                sub: '74014 Laterza (TA), Puglia',
              },
              {
                icon: Phone,
                title: 'Telefono',
                info: '+39 099 982 1234',
                sub: 'Lun-Ven: 8:00 - 18:00',
              },
              {
                icon: Mail,
                title: 'Email',
                info: 'info@metalfrigo.it',
                sub: 'Rispondiamo entro 24h',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="flex-1">
                <div className="group h-full rounded-2xl glass p-5 sm:p-6 lg:p-8 flex flex-col justify-center hover:bg-frost-200 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0 group-hover:bg-primary-500/20 transition-colors">
                      <item.icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-dark-400 uppercase tracking-wider mb-1">{item.title}</p>
                      <p className="text-white font-semibold text-lg sm:text-xl leading-tight">{item.info}</p>
                      <p className="text-dark-300 text-sm mt-1">{item.sub}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Contact Form */}
          <AnimatedSection delay={0.2} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="rounded-2xl sm:rounded-3xl glass p-5 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm text-dark-300 mb-2">Nome e Cognome *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-white/5 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all text-sm"
                    placeholder="Mario Rossi"
                  />
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-white/5 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all text-sm"
                    placeholder="mario@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-2">Telefono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-white/5 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all text-sm"
                    placeholder="+39 333 123 4567"
                  />
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-2">Azienda</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-white/5 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all text-sm"
                    placeholder="Nome Azienda"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm text-dark-300 mb-2">Messaggio *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-white/5 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all resize-none text-sm"
                  placeholder="Descrivi le tue esigenze..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-400 hover:to-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Invio in corso...
                  </>
                ) : submitted ? (
                  <>
                    ✓ Messaggio Inviato!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Invia Messaggio
                  </>
                )}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
