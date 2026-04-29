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
  const yImage = useTransform(scrollY, [0, 500], [0, 80])

  return (
    <section ref={ref} className="relative h-[100dvh] flex items-center w-full overflow-hidden bg-dark-950">
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y: yImage }}
          className="absolute inset-0 w-full h-full bg-black"
        >
          <img
            src={`${import.meta.env.BASE_URL}hero1.jpg`}
            alt="Metalfrigo Showroom"
            className="w-full h-full object-cover object-[70%_center] lg:object-contain lg:object-right"
          />
          
          {/* Lighter gradient for text readability (shading decreased) */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-dark-950/20 to-transparent hidden lg:block w-2/3" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/40 to-transparent block lg:hidden h-2/3 mt-auto" />
        </motion.div>
      </div>

      {/* CONTENT OVERLAY - REDESIGNED FOR PREMIUM INTEGRATION */}
      <div className="relative z-20 h-full flex items-center justify-center lg:justify-start px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-primary-400 text-[10px] font-bold uppercase tracking-[0.3em]">
              Eccellenza nella Refrigerazione
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold font-heading leading-[0.85] tracking-tighter mb-10"
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
            transition={{ delay: 1.2 }}
            className="text-lg sm:text-xl text-dark-200 max-w-xl leading-relaxed mb-12 font-normal"
          >
            Siamo specializzati nella refrigerazione industriale di design all'avanguardia, unendo tecnologia estrema e sostenibilità.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <Link
              to="/prodotti"
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-dark-950 font-bold text-lg hover:bg-primary-500 hover:text-white transition-all duration-500 shadow-2xl"
            >
              Scopri i Prodotti
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative center-line light (Global atmospheric) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-t from-primary-500 to-transparent z-30 hidden lg:block" />
    </section>
  )
}

/* ============================================
   ABOUT SECTION
============================================ */
function AboutSection() {
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
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-primary-400 text-[10px] font-bold uppercase tracking-[0.3em]">
              Chi Siamo
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white leading-[1.1] max-w-4xl mx-auto">
            L'eccellenza nella <br />
            <span className="gradient-text">Refrigerazione Professionale</span>
          </h2>
        </AnimatedSection>

        {/* 2-Column Content Below */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left Column: Text */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <AnimatedSection>
              <div className="space-y-8 pr-0 lg:pr-8">
                <p className="text-white text-xl sm:text-2xl leading-relaxed font-bold tracking-tight">
                  Metalfrigo rappresenta l'evoluzione di una consolidata esperienza nel settore della refrigerazione per l'Ho.Re.Ca., ristorazione e market di frigoriferi che durano nel tempo e garantiscono prestazioni d'eccellenza.
                </p>
                
                <div className="w-20 h-[2px] bg-primary-500" />
                
                <p className="text-dark-300 text-lg sm:text-xl leading-relaxed font-medium italic">
                  Metalfrigo offre soluzioni complete per trasformare ogni spazio di lavoro in un ambiente efficiente e dal design impeccabile.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Image */}
          <div className="w-full lg:w-[58%] order-1 lg:order-2">
            <AnimatedSection delay={0.3}>
              <div className="relative aspect-[16/10] sm:aspect-[1.5/1] lg:aspect-[1.4/1] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/60 group">
                <img
                  src={`${import.meta.env.BASE_URL}chi-siamo.jpg`}
                  alt="L'eccellenza Metalfrigo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none" />
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
    product: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', product: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contatti" className="relative py-20 sm:py-32 overflow-hidden bg-dark-950">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        <AnimatedSection className="text-center mb-16 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl font-bold font-heading text-white mt-4 mb-6">
            Contattaci
          </h2>
          <p className="text-dark-200 max-w-2xl mx-auto text-lg leading-relaxed">
            Contattaci per un preventivo personalizzato o per scoprire la soluzione di refrigerazione
            ideale per la tua attività.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: INFO + FORM (Set to approx 70% with col-span-8) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: MapPin,
                  title: 'Sede',
                  info: "Via dell'Industria 42",
                  sub: '74014 Laterza (TA)',
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
                  sub: 'Risposta in 24h',
                },
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="group h-full rounded-2xl bg-white/5 border border-white/5 p-6 hover:bg-white/[0.08] transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <p className="text-[10px] text-dark-400 uppercase tracking-widest mb-1 font-bold">{item.title}</p>
                    <p className="text-white font-bold text-sm leading-tight mb-1">{item.info}</p>
                    <p className="text-dark-400 text-[11px]">{item.sub}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Contact Form */}
            <AnimatedSection delay={0.3}>
              <form onSubmit={handleSubmit} className="rounded-3xl bg-white/5 border border-white/5 p-8 sm:p-10 relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500/10 rounded-full blur-[60px] group-hover:bg-primary-500/20 transition-all duration-700" />
                
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  Inviaci un Messaggio
                  <div className="h-[2px] w-12 bg-primary-500" />
                </h3>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-dark-300 uppercase tracking-wider mb-2 ml-1">Nome e Cognome *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-dark-900 border border-white/5 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                      placeholder="Mario Rossi"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark-300 uppercase tracking-wider mb-2 ml-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-dark-900 border border-white/5 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                      placeholder="mario@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-dark-300 uppercase tracking-wider mb-2 ml-1">Telefono</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-dark-900 border border-white/5 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                      placeholder="+39 333 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark-300 uppercase tracking-wider mb-2 ml-1">Prodotto interessato</label>
                    <input
                      type="text"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-dark-900 border border-white/5 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
                      placeholder="es. LM1250-2P TN"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-xs font-bold text-dark-300 uppercase tracking-wider mb-2 ml-1">Messaggio *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-dark-900 border border-white/5 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all resize-none"
                    placeholder="Come possiamo aiutarti?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-10 py-5 rounded-2xl bg-white text-dark-950 font-bold hover:bg-primary-500 hover:text-white transition-all duration-300 shadow-xl disabled:opacity-60 group/btn"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-dark-950/30 border-t-dark-950 rounded-full animate-spin" />
                      Invio in corso...
                    </>
                  ) : submitted ? (
                    <>✓ Messaggio Inviato!</>
                  ) : (
                    <>
                      Invia Messaggio
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </AnimatedSection>
          </div>

          {/* RIGHT COLUMN: MAP (Original Color Style) */}
          <div className="lg:col-span-4 h-full min-h-[400px] lg:min-h-0">
            <AnimatedSection delay={0.5} className="h-full">
              <a 
                href="https://maps.app.goo.gl/cstGpCc7mPALsYGN7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block h-full relative group rounded-3xl overflow-hidden border border-white/5 hover:border-primary-500/30 transition-all duration-500"
              >
                <iframe 
                  title="Metalfrigo Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.559381373516!2d16.782202!3d40.655639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDM5JzIwLjMiTiAxNsKwNDcnMDUuMiJF!5e0!3m2!1sit!2sit!4v1714384500000!5m2!1sit!2sit" 
                  className="w-full h-full relative z-0"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </a>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </section>
  )
}
