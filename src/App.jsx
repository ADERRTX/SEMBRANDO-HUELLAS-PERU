import { lazy, Suspense } from 'react'
import MetaTags from './components/layout/MetaTags'
import ErrorBoundary from './components/layout/ErrorBoundary'
import Loader from './components/layout/Loader'
import Navbar from './components/layout/Navbar'
import NewsTicker from './components/sections/NewsTicker'
import FallingLeaves from './components/animations/FallingLeaves'
import ScrollToTop from './components/layout/ScrollToTop'
import Footer from './components/layout/Footer'

const Hero = lazy(() => import('./components/sections/Hero'))
const About = lazy(() => import('./components/sections/About'))
const Services = lazy(() => import('./components/sections/Services'))
const Timeline = lazy(() => import('./components/sections/Timeline'))
const Counters = lazy(() => import('./components/sections/Counters'))
const Programs = lazy(() => import('./components/sections/Programs'))
const Volunteer = lazy(() => import('./components/sections/Volunteer'))
const EcoTech = lazy(() => import('./components/sections/EcoTech'))
const Contact = lazy(() => import('./components/sections/Contact'))

function SectionFallback() {
  return (
    <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function LazySection({ component: Component }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<SectionFallback />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <>
      <MetaTags />
      <Loader />
      <FallingLeaves />
      <Navbar />
      <NewsTicker />
      <main>
        <LazySection component={Hero} />
        <LazySection component={About} />
        <LazySection component={Services} />
        <LazySection component={Timeline} />
        <LazySection component={Counters} />
        <LazySection component={Programs} />
        <LazySection component={Volunteer} />
        <LazySection component={EcoTech} />
        <LazySection component={Contact} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
