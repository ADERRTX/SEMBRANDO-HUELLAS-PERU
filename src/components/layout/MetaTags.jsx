import { Helmet } from 'react-helmet-async'

const defaultTitle = 'Sembrando Huellas Perú — Innovación Ambiental y Tecnología Verde'
const defaultDescription = 'Organización líder en educación ambiental, tecnología verde y conservación biocultural en la Amazonía peruana.'
const defaultImage = '/og-image.jpg'
const url = 'https://sembradohuellasperu.org'

export default function MetaTags({ title, description, image }) {
  const fullTitle = title ? `${title} | Sembrando Huellas Perú` : defaultTitle

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />

      <link rel="canonical" href={url} />
    </Helmet>
  )
}
