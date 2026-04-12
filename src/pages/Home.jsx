import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Snowflake, Award, Shield, Zap, ThermometerSnowflake,
  ArrowRight, MapPin, Phone, Mail, Clock, Send,
  ChevronRight, Factory, Users, Globe, Wrench
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import CountUp from '../components/CountUp'
import { AuroraBackground } from '../components/AuroraBackground'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <FeaturesSection />
      <WhyUsSection />
      <ContactSection />
    </main>
  )
}

/* ============================================
   HERO SECTION
============================================ */
function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex flex-col items-center justify-center w-full max-w-[100vw] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-dark-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />

        {/* Aurora Effect Natively Embedded */}
        <div
          className="absolute -inset-[10px] opacity-[0.4] pointer-events-none will-change-transform filter blur-[15px] mix-blend-screen
          [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
          [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
          [--aurora:repeating-linear-gradient(100deg,#0f172a_10%,#1e293b_15%,#334155_20%,#0ea5e9_25%,#020617_30%)]
          [background-image:var(--aurora)]
          [background-size:300%,_200%]
          [background-position:50%_50%,50%_50%]
          after:content-[''] after:absolute after:inset-0 after:[background-image:var(--aurora)] 
          after:[background-size:200%,_100%] 
          after:animate-aurora after:[background-attachment:fixed]"
        ></div>

        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary-700/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent z-10" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary-400/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light text-primary-400 text-xs font-semibold uppercase tracking-widest mb-8"
          >
            <Snowflake className="w-3.5 h-3.5" />
            Eccellenza nella refrigerazione dal 1985
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-heading leading-[0.95] tracking-tight mb-8"
          >
            <span className="text-white">Soluzioni di</span>
            <br />
            <span className="gradient-text">Refrigerazione</span>
            <br />
            <span className="text-white">Industriale</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl text-dark-200 max-w-2xl leading-relaxed mb-10"
          >
            Progettiamo e produciamo frigoriferi industriali di design all'avanguardia,
            unendo tecnologia italiana e sostenibilità per la ristorazione professionale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/prodotti"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-lg hover:from-primary-400 hover:to-primary-500 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25 hover:scale-[1.02] active:scale-[0.98]"
            >
              Scopri i Prodotti
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/#chi-siamo"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass-light text-white font-semibold text-lg hover:bg-frost-200 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Chi Siamo
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-dark-400 text-xs uppercase tracking-widest">Scorri</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-dark-500 flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ============================================
   STATS SECTION
============================================ */
function StatsSection() {
  const stats = [
    { value: 40, suffix: '+', label: 'Anni di Esperienza', icon: Clock },
    { value: 5000, suffix: '+', label: 'Prodotti Installati', icon: Factory },
    { value: 350, suffix: '+', label: 'Clienti in Italia', icon: Users },
    { value: 15, suffix: '', label: 'Paesi Serviti', icon: Globe },
  ]

  return (
    <section className="relative py-20 border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-900 to-dark-950" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="text-center group">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl glass-light flex items-center justify-center group-hover:bg-frost-200 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-primary-400" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-heading text-white mb-2">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-dark-300 text-sm">{stat.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================
   ABOUT SECTION
============================================ */
function AboutSection() {
  return (
    <section id="chi-siamo" className="relative py-28 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <AnimatedSection>
              <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest">Chi Siamo</span>
              <h2 className="text-4xl sm:text-5xl font-bold font-heading text-white mt-4 mb-6 leading-tight">
                L'Eccellenza del
                <br />
                <span className="gradient-text">Made in Puglia</span>
              </h2>
              <div className="space-y-5 text-dark-200 leading-relaxed">
                <p>
                  Fondata a <strong className="text-white">Laterza (TA)</strong>, MetalFrigo rappresenta l'evoluzione di una consolidata esperienza nel settore dell'arredamento industriale e professionale per la ristorazione.
                </p>
                <p>
                  Il nostro stabilimento di <strong className="text-white">1000mq</strong> è il cuore pulsante dove artigianato e tecnologia si fondono per creare attrezzature su misura, progettate per durare nel tempo e garantire prestazioni d'eccellenza.
                </p>
                <p>
                  Dalla lavorazione dell'acciaio alla progettazione di sistemi di refrigerazione all'avanguardia, MetalFrigo offre soluzioni complete per trasformare ogni spazio di lavoro in un ambiente efficiente e dal design impeccabile.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-4">
                {['ISO 9001', 'CE', 'HACCP', 'Eco-Friendly'].map((cert) => (
                  <div
                    key={cert}
                    className="px-4 py-2 rounded-xl glass-light text-primary-400 text-sm font-medium"
                  >
                    {cert}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right - Visual Card */}
          <AnimatedSection delay={0.3}>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden glass p-1">
                <div className="rounded-[20px] overflow-hidden relative aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
                    alt="Stabilimento Metalfrigo"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 text-primary-400 text-sm font-medium mb-1">
                      <MapPin className="w-4 h-4" />
                      Laterza (TA), Puglia
                    </div>
                    <p className="text-white/80 text-sm">
                      Stabilimento produttivo — 1000mq
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Certificata</p>
                    <p className="text-dark-300 text-xs">ISO 9001:2015</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>

        {/* Location Map Embed */}
        <AnimatedSection delay={0.2} className="mt-20">
          <div className="rounded-3xl overflow-hidden glass p-1">
            <div className="rounded-[20px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48376.06072991641!2d16.827!3d40.629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1347a7be78fbfb0b%3A0x4d4a0b2c3c7d7f4a!2s74014%20Laterza%20TA!5e0!3m2!1sit!2sit!4v1!5m2!1sit!2sit"
                width="100%"
                height="350"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Metalfrigo Location"
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ============================================
   FEATURES SECTION
============================================ */
function FeaturesSection() {
  const features = [
    {
      icon: ThermometerSnowflake,
      title: 'Controllo Temperatura',
      description: 'Sistemi di termoregolazione digitale di precisione con variazione di ±0.5°C per garantire la conservazione ottimale.',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Zap,
      title: 'Efficienza Energetica',
      description: 'Tecnologia inverter di ultima generazione per un risparmio energetico fino al 40% rispetto ai sistemi tradizionali.',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      icon: Shield,
      title: 'Acciaio AISI 304',
      description: 'Costruzione interamente in acciaio inossidabile AISI 304, resistente alla corrosione e conforme agli standard HACCP.',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Wrench,
      title: 'Assistenza 24/7',
      description: 'Rete di tecnici specializzati su tutto il territorio nazionale con intervento garantito entro 24 ore.',
      gradient: 'from-violet-500 to-purple-600',
    },
  ]

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-dark-900/50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest">Tecnologia</span>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading text-white mt-4 mb-6">
            Perché Scegliere <span className="gradient-text">Metalfrigo</span>
          </h2>
          <p className="text-dark-200 max-w-2xl mx-auto text-lg">
            Ogni dettaglio è progettato per offrire prestazioni superiori, durabilità eccezionale e un design che si integra perfettamente in ogni ambiente professionale.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="group relative h-full">
                <div className="h-full rounded-3xl glass p-7 hover:bg-frost-200 transition-all duration-500 hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold font-heading text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-dark-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================
   WHY US SECTION
============================================ */
function WhyUsSection() {
  const reasons = [
    'Produzione 100% italiana con materiali certificati',
    'Personalizzazione completa su misura del cliente',
    'Consegna e installazione professionale in tutta Italia',
    'Monitoraggio remoto temperatura via app dedicata',
    'Eco-design con gas refrigeranti a basso impatto ambientale',
  ]

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest">I Nostri Punti di Forza</span>
            <h2 className="text-4xl sm:text-5xl font-bold font-heading text-white mt-4 mb-10 leading-tight">
              Qualità che si
              <br />
              <span className="gradient-text">Tocca con Mano</span>
            </h2>

            <div className="space-y-4">
              {reasons.map((reason, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary-500/20 transition-colors">
                    <ChevronRight className="w-4 h-4 text-primary-400" />
                  </div>
                  <p className="text-dark-200 group-hover:text-white transition-colors duration-300">
                    {reason}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden glass p-1">
                <div className="rounded-[20px] overflow-hidden aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=700&h=700&fit=crop"
                    alt="Qualità Metalfrigo"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-dark-950/60 via-transparent to-primary-500/10" />
                </div>
              </div>

              {/* Floating stats card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 glass rounded-2xl p-5 shadow-2xl"
              >
                <div className="text-center">
                  <p className="text-3xl font-bold gradient-text">99.8%</p>
                  <p className="text-dark-300 text-xs mt-1">Soddisfazione Clienti</p>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
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
    <section id="contatti" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-dark-900/30" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest">Contatti</span>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading text-white mt-4 mb-6">
            Parliamo del Tuo <span className="gradient-text">Progetto</span>
          </h2>
          <p className="text-dark-200 max-w-2xl mx-auto text-lg">
            Contattaci per un preventivo personalizzato o per scoprire la soluzione di refrigerazione
            ideale per la tua attività.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-4">
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
              {
                icon: Clock,
                title: 'Orari',
                info: 'Lun - Ven: 8:00 - 18:00',
                sub: 'Sab: 8:00 - 13:00',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="group rounded-2xl glass p-5 hover:bg-frost-200 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0 group-hover:bg-primary-500/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-xs text-dark-400 uppercase tracking-wider mb-1">{item.title}</p>
                      <p className="text-white font-medium text-sm">{item.info}</p>
                      <p className="text-dark-300 text-xs mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Contact Form */}
          <AnimatedSection delay={0.2} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="rounded-3xl glass p-8">
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
