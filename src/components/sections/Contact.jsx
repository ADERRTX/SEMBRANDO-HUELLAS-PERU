import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HiMail, HiLocationMarker, HiGlobeAlt, HiUser, HiPaperAirplane, HiCheckCircle, HiPhone,
} from 'react-icons/hi'
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { sectionReveal, fadeInRight, fadeInUp, staggerContainer } from '../../animations/variants'
import { useT } from '../../contexts/LanguageContext'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const socialLinks = [
  { icon: FaFacebook, href: 'https://facebook.com/ecoaccionglobal', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://instagram.com/ecoaccionglobal', label: 'Instagram' },
  { icon: FaYoutube, href: 'https://youtube.com/@ecoaccionglobal', label: 'YouTube' },
  { icon: FaTiktok, href: 'https://tiktok.com/@ecoaccionglobal', label: 'TikTok' },
]

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function ContactInfo({ icon: Icon, title, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
        <Icon className="text-green-300 text-xl" />
      </div>
      <div>
        <h4 className="font-semibold text-white mb-1">{title}</h4>
        {children}
      </div>
    </div>
  )
}

export default function Contact() {
  const t = useT()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = t('contact.name_error')
    if (!form.email.trim()) newErrors.email = t('contact.email_error')
    else if (!validateEmail(form.email)) newErrors.email = t('contact.email_invalid')
    if (!form.message.trim()) newErrors.message = t('contact.message_error')

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSending(true)
    try {
      const res = await fetch('https://formsubmit.co/ajax/prensa@ecoaccionglobal.org', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setErrors({ message: t('contact.send_error') })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contacto" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-emerald-900">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0v40M0 20h40' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
      }} />

      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionReveal}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-green-100/60 max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <motion.div
            className="lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            {submitted ? (
              <motion.div
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/10"
                variants={fadeInUp}
              >
                <HiCheckCircle className="text-6xl text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{t('contact.success_title')}</h3>
                <p className="text-green-100/60">
                  {t('contact.success_message')}
                </p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
                variants={fadeInUp}
              >
                <div>
                  <div className="relative">
                    <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-green-300/50" />
                    <input
                      type="text"
                      name="name"
                      placeholder={t('contact.name_placeholder')}
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder:text-green-200/40 ${
                        errors.name ? 'border-red-400' : 'border-white/10 focus:border-green-400'
                      } focus:ring-2 focus:ring-green-400/20 outline-none transition-all`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-green-300/50" />
                    <input
                      type="email"
                      name="email"
                      placeholder={t('contact.email_placeholder')}
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder:text-green-200/40 ${
                        errors.email ? 'border-red-400' : 'border-white/10 focus:border-green-400'
                      } focus:ring-2 focus:ring-green-400/20 outline-none transition-all`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder={t('contact.message_placeholder')}
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder:text-green-200/40 ${
                      errors.message ? 'border-red-400' : 'border-white/10 focus:border-green-400'
                    } focus:ring-2 focus:ring-green-400/20 outline-none transition-all resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:from-green-400 hover:to-emerald-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 disabled:opacity-60 cursor-pointer"
                >
                  <HiPaperAirplane className={`text-lg -rotate-45 ${sending ? 'animate-pulse' : ''}`} />
                  {sending ? t('contact.sending') : t('contact.send')}
                </button>
              </motion.form>
            )}
          </motion.div>

          <motion.div
            className="lg:col-span-2 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInRight}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 space-y-6">
              <ContactInfo icon={HiMail} title={t('contact.email_label')}>
                <a href="mailto:prensa@ecoaccionglobal.org" className="text-green-100/70 text-sm hover:text-green-300 transition-colors">
                  prensa@ecoaccionglobal.org
                </a>
              </ContactInfo>

              <ContactInfo icon={HiPhone} title={t('contact.phone_label')}>
                <p className="text-green-100/70 text-sm">+41 22 730 81 11</p>
              </ContactInfo>

              <ContactInfo icon={HiLocationMarker} title={t('contact.location_label')}>
                <p className="text-green-100/70 text-sm">Ginebra, Suiza / Redacción Central</p>
              </ContactInfo>

              <ContactInfo icon={HiGlobeAlt} title={t('contact.social_label')}>
                <div className="flex gap-3 mt-2">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 rounded-full bg-white/10 hover:bg-green-500/30 border border-white/10 hover:border-green-400/40 text-green-100/70 hover:text-green-300 transition-all duration-200"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </ContactInfo>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg h-56 border border-white/10 [&_.leaflet-container]:!h-full [&_.leaflet-control-zoom]:!hidden">
              <MapContainer center={[46.2044, 6.1432]} zoom={12} scrollWheelZoom={false} className="w-full h-full">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[46.2044, 6.1432]}>
                  <Popup>
                    Redacción Central de EcoAcción Global <br /> Ginebra, Suiza
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
