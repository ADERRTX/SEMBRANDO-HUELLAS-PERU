import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPlusCircle, HiCheck, HiExclamationCircle, HiNewspaper } from 'react-icons/hi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { fadeInUp, staggerContainer } from '../../animations/variants'
import { useT } from '../../contexts/LanguageContext'

// List of default images for users to choose or fallback
const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=800&q=80',
]

export default function Programs() {
  const t = useT()
  const [ref, isVisible] = useScrollReveal(0.1)

  // Form states
  const [category, setCategory] = useState('ecologico')
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [location, setLocation] = useState('')
  const [lat, setLat] = useState('0')
  const [lng, setLng] = useState('0')
  const [imageUrl, setImageUrl] = useState('')

  // UI States
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validation
    if (!title.trim() || !summary.trim() || !content.trim() || !author.trim() || !location.trim()) {
      setError(t('publish.error_message'))
      return
    }

    const latitude = parseFloat(lat)
    const longitude = parseFloat(lng)

    if (isNaN(latitude) || latitude < -90 || latitude > 90 || isNaN(longitude) || longitude < -180 || longitude > 180) {
      setError('Las coordenadas deben ser números válidos: Latitud entre -90 y 90, Longitud entre -180 y 180.')
      return
    }

    // Build the new article object
    const finalImage = imageUrl.trim() || DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)]
    const newArticle = {
      id: Date.now(),
      category,
      title,
      summary,
      content,
      author,
      location,
      coordinates: [latitude, longitude],
      image: finalImage,
      date: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
    }

    try {
      const stored = localStorage.getItem('eco-news')
      let newsList = []
      if (stored) {
        newsList = JSON.parse(stored)
      }
      // Add new article to start of the list
      const updatedList = [newArticle, ...newsList]
      localStorage.setItem('eco-news', JSON.stringify(updatedList))

      // Trigger custom event to notify all components to reload news
      const event = new CustomEvent('eco-news-published')
      window.dispatchEvent(event)

      // Reset form
      setSuccess(true)
      setTitle('')
      setSummary('')
      setContent('')
      setAuthor('')
      setLocation('')
      setLat('0')
      setLng('0')
      setImageUrl('')

      // Auto dismiss success alert
      setTimeout(() => setSuccess(false), 8000)
    } catch (err) {
      setError('No se pudo guardar la noticia en el almacenamiento local.')
    }
  }

  return (
    <section
      id="publicar"
      ref={ref}
      className="relative py-20 bg-gradient-to-br from-gray-950 via-emerald-950/45 to-green-950 text-white overflow-hidden"
    >
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.01)_1px,_transparent_1px)] bg-[size:40px_40px] opacity-25 z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-green-400 font-bold mb-2 block">
            {t('nav.publicar')}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white flex justify-center items-center gap-3">
            <HiNewspaper className="w-8 h-8 text-green-400" />
            {t('publish.title')}
          </h2>
          <p className="mt-4 text-lg text-green-200/70 max-w-2xl mx-auto font-light">
            {t('publish.subtitle')}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto mt-6" />
        </div>

        {/* Form Card */}
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="max-w-3xl mx-auto rounded-3xl bg-white/5 border border-white/10 p-6 md:p-10 backdrop-blur-md shadow-2xl relative"
        >
          {/* Form Banner */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500" />

          <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4 text-green-300">
            {t('publish.form_title')}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Category & Author */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-green-300">
                  {t('publish.form_category')} *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-white font-medium transition-all"
                >
                  <option value="ecologico">{t('feed.ecologico')}</option>
                  <option value="medioambiente">{t('feed.medioambiente')}</option>
                  <option value="conservacion">{t('feed.conservacion')}</option>
                  <option value="liderazgo">{t('feed.liderazgo')}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-green-300">
                  {t('publish.form_author_field')} *
                </label>
                <input
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition-all text-sm"
                  required
                />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-green-300">
                {t('publish.form_title_field')} *
              </label>
              <input
                type="text"
                placeholder="Ej. Impresionante hallazgo en la reserva ecológica..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition-all text-sm"
                required
              />
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-green-300">
                {t('publish.form_summary_field')} *
              </label>
              <input
                type="text"
                placeholder="Ej. Resumen de un párrafo que enganche a los lectores..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition-all text-sm"
                required
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-green-300">
                {t('publish.form_content_field')} *
              </label>
              <textarea
                placeholder="Escribe el cuerpo completo del artículo de noticia aquí..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 bg-gray-900/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition-all text-sm resize-none font-light leading-relaxed"
                required
              />
            </div>

            {/* Location & Coordinates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 md:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-green-300">
                  {t('publish.form_location_field')} *
                </label>
                <input
                  type="text"
                  placeholder="Ej. Ucayali, Perú"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition-all text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-green-300">
                  {t('publish.form_lat_field')} *
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="Ej. -8.379"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition-all text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-green-300">
                  {t('publish.form_lng_field')} *
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="Ej. -74.553"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition-all text-sm"
                  required
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-green-300">
                {t('publish.form_image_field')}
              </label>
              <input
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg (opcional)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-white transition-all text-sm"
              />
            </div>

            {/* Alerts Feedback */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-start gap-3"
                >
                  <HiCheck className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold">{t('publish.success_title')}</h4>
                    <p className="text-xs font-light mt-1">{t('publish.success_message')}</p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-3 text-sm font-medium"
                >
                  <HiExclamationCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold tracking-wider text-base shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <HiPlusCircle className="w-5 h-5" />
                {t('publish.submit_button')}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </section>
  )
}
