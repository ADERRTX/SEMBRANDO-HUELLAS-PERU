import { motion } from 'framer-motion'
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'
import { SITE_CONFIG, NAV_LINKS } from '../../constants'
import { useT } from '../../contexts/LanguageContext'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const quickLinks = NAV_LINKS.filter((l) => l.href !== '#hero')

const socialLinks = [
  { icon: FaFacebook, href: 'https://facebook.com/sembradohuellasperu', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://instagram.com/sembradohuellasperu', label: 'Instagram' },
  { icon: FaYoutube, href: 'https://youtube.com/@sembradohuellasperu', label: 'YouTube' },
  { icon: FaTiktok, href: 'https://tiktok.com/@sembradohuellasperu', label: 'TikTok' },
]

export default function Footer() {
  const t = useT()
  return (
    <footer className="relative bg-navy dark:bg-gray-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-green-500/20">
                <span className="text-white font-bold text-lg">SH</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {SITE_CONFIG.shortName}
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm mb-4">
              {SITE_CONFIG.tagline}
            </p>
            <p className="text-gray-500 text-xs leading-relaxed">
              {SITE_CONFIG.description}
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-green-400 mb-4">
              {t('footer.quick_links')}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-green-400 mb-4">
              {t('footer.contact_title')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="block text-gray-500 text-xs">{t('footer.email')}</span>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <span className="block text-gray-500 text-xs">{t('footer.location')}</span>
                <span className="text-gray-300">{SITE_CONFIG.location}</span>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-green-400 mb-4">
              {t('footer.follow_us')}
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-400/30 text-gray-400 hover:text-green-400 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-12 pt-6 border-t border-white/10 text-center"
        >
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. {t('footer.copyright')}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
