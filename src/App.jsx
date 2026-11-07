import { useState } from 'react'
import './style/index.css'
import Header from './components/Header'
import Hero from './components/Hero'
import { motion, AnimatePresence } from "motion/react";
import CustomCursor from './components/CustomCursor'
import { BrowserRouter } from "react-router-dom";
import About from './components/About'

function App() {
  return (
    <>
      <BrowserRouter>
        <CustomCursor />
        <Header />
        <Hero />
        <About />
      </BrowserRouter>
    </>
  )
}

export default App
