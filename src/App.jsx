import React, { useEffect } from 'react'
import Home from './components/Home'
import CustomCursor from './components/CustomCursor'
import About from './components/About'
import Work from './components/Work'
import Skills from './components/Skills'
import { useState } from 'react'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import LenisProvider from './components/LenisProvider'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
    <LenisProvider>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <Motion.main
          initial={{ opacity: 0, y: 32, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.22,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <Home />
          <About />
          <Work />
          <Skills/>
          <Contact />
          <Footer />
        </Motion.main>
        
      )}
      </LenisProvider>
    </>
  );
}

export default App