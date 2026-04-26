import React from 'react'
import Home from './components/Home'
import CustomCursor from './components/CustomCursor'
import About from './components/About'
import Marquee from './components/Marquee'
import Work from './components/Work'
import Skills from './components/Skills'

function App() {
  return (
    <>
     <CustomCursor/>
       <Home />
       <About/>
       <Work/>
       <Skills/>  
    </>
  )
}

export default App