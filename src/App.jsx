import React from 'react'
import Home from './components/Home'
import CustomCursor from './components/CustomCursor'
import About from './components/About'
import Marquee from './components/Marquee'
import Work from './components/Work'
import Skills from './components/Skills'
import { useState } from 'react'

function App() {
const [skillsStart, setSkillsStart] = useState(false);  return (
    <>
     <CustomCursor/>
       <Home />
       <About/>
       <Work onComplete={()=>setSkillsStart(true)}/>
       {skillsStart && <Skills startAnimation={true} />}
    </>
  )
}

export default App