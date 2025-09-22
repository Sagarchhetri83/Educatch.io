import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Header() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  
  const handleGetStarted = () => {
    if (currentUser) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }

  const handleSignUp = () => {
    navigate('/login')
  }
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Add a slight delay for smooth animation
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      }, 100)
    }
    setOpen(false) // Close mobile menu after clicking
  }

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-3xl font-bold text-rose-500">Educatch</a>
        <div className="hidden md:flex space-x-8 items-center">
          <button 
            onClick={() => scrollToSection('home')} 
            className="text-slate-600 hover:text-rose-500 transition-colors duration-300 hover:scale-105"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-slate-600 hover:text-rose-500 transition-colors duration-300 hover:scale-105"
          >
            About Us
          </button>
          <button 
            onClick={() => scrollToSection('features')} 
            className="text-slate-600 hover:text-rose-500 transition-colors duration-300 hover:scale-105"
          >
            Key Features
          </button>
          <button 
            onClick={() => scrollToSection('faq')} 
            className="text-slate-600 hover:text-rose-500 transition-colors duration-300 hover:scale-105"
          >
            FAQ
          </button>
          <button 
            onClick={() => scrollToSection('watch')} 
            className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition-all duration-300 hover:scale-105 shadow-md font-semibold"
          >
            Watch Demo
          </button>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-slate-700" aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3">
          <button 
            onClick={() => scrollToSection('home')} 
            className="block text-slate-600 hover:text-rose-500 text-left transition-colors duration-300"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="block text-slate-600 hover:text-rose-500 text-left transition-colors duration-300"
          >
            About Us
          </button>
          <button 
            onClick={() => scrollToSection('features')} 
            className="block text-slate-600 hover:text-rose-500 text-left transition-colors duration-300"
          >
            Key Features
          </button>
          <button 
            onClick={() => scrollToSection('faq')} 
            className="block text-slate-600 hover:text-rose-500 text-left transition-colors duration-300"
          >
            FAQ
          </button>
          <button 
            onClick={() => scrollToSection('watch')} 
            className="inline-block bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 shadow-md transition-all duration-300 hover:scale-105 font-semibold"
          >
            Watch Demo
          </button>
        </div>
      )}
    </header>
  )
}

function Hero() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const handleGetStarted = () => {
    if (currentUser) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }

  const handleSignUp = () => {
    navigate('/login')
  }

  return (
    <section id="home" className="relative container mx-auto px-6 py-20 md:py-32 overflow-hidden animate-fade-in-up">
      <div className="absolute top-0 -left-16 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"/>
      <div className="absolute top-0 -right-16 w-72 h-72 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"/>
      <div className="relative flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight"><span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">Education</span> Reimagined.</h1>
          <p className="mt-6 text-lg text-slate-600">Watch your kids fall in love with math & English through our scientifically designed curriculum.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <span className="text-lg font-semibold text-rose-600">Are You Excited !!</span>
            <button onClick={handleSignUp} className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 shadow-md transition-all duration-200">
              Sign Up
            </button>
            <button
              onClick={() => {
                if (currentUser) {
                  navigate('/dashboard')
                } else {
                  navigate('/login')
                }
              }}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 shadow-md transition-all duration-200"
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center items-center">
          <div className="hero-image-container w-full max-w-md h-auto min-h-80">
            <img src="/images/hero-child.png" alt="Happy child using a tablet" className="hero-image rounded-lg shadow-2xl w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-rose-50/50 animate-slide-in-right">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-slate-900">About Us</h2>
          <p className="text-4xl md:text-5xl font-extrabold mt-2">
            <span className="bg-gradient-to-r from-rose-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">Catch the Spark of Learning!</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Left large photo */}
          <div className="lg:col-span-1">
              <img
                src="/images/features-icon-1.png"
                alt="Happy child actively learning with a tablet"
                className="rounded-3xl shadow-2xl w-full h-full object-cover"
              />
          </div>

          {/* Right 2x2 grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Educators card */}
            <div className="rounded-3xl p-8 shadow-soft border border-white/70 text-center" style={{background:'#d1e8ff'}}>
              <div className="mx-auto w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow">
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="17" cy="18" r="6" fill="#0ea5e9"/>
                  <circle cx="31" cy="18" r="6" fill="#38bdf8"/>
                </svg>
              </div>
              <h3 className="mt-4 font-extrabold uppercase text-sm tracking-wider text-slate-800">For Educators</h3>
              <p className="text-slate-700 mt-3">EduCatch supports teachers and educators with interactive modules in literacy, numeracy, and science that spark curiosity and keep children actively engaged. With a blend of movement, voice, and play.</p>
            </div>

            {/* Mission card */}
            <div className="rounded-3xl p-8 shadow-soft border border-white/70 text-center" style={{background:'#f9d5d5'}}>
              <div className="mx-auto w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow">
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 6c7 0 12 5 12 12 0 8-8 10-8 16h-8c0-6-8-8-8-16 0-7 5-12 12-12z" fill="#fb7185"/>
                </svg>
              </div>
              <h3 className="mt-4 font-extrabold uppercase text-sm tracking-wider text-slate-800">Our Mission</h3>
              <p className="text-slate-700 mt-3">To reimagine early learning by blending movement, voice, and play to make literacy, numeracy, and science fun and accessible for every child.</p>
            </div>

            {/* Bottom-left small image */}
            
            <div className="rounded-3xl overflow-hidden border border-white/70 shadow-soft" style={{background:'#b3e0d2'}}>
              <img src="/images/features-icon-2.png" alt="Curious child laughing" className="w-full h-56 object-cover" />
            </div>

            {/* Bottom-right small image */}
            <div className="rounded-3xl overflow-hidden border border-white/70 shadow-soft" style={{background:'#fff9e0'}}>
              <img src="/images/about-child-3.png" alt="Joyful child smiling" className="w-full h-56 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function VideoSection() {
  return (
    <section id="watch" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Watch EduCatch in Action</h2>
          <p className="mt-2 text-3xl md:text-4xl font-extrabold">
            <span className="bg-gradient-to-r from-rose-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">See how kids learn through play</span>
          </p>
        </div>
        <div className="mx-auto max-w-4xl md:max-w-5xl rounded-2xl overflow-hidden shadow-xl">
          <video className="w-full h-auto aspect-video bg-black" controls muted playsInline preload="metadata" poster="/icons/icon-512.svg">
            <source src="/videos/educatch-demo.mp4" type="video/mp4" />
            {/* Optional alt formats if you add them later */}
            {/* <source src="/videos/educatch-demo.webm" type="video/webm" /> */}
            <a href="/videos/educatch-demo.mp4">Download the video</a>
          </video>
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-20 md:py-32 animate-slide-in-left">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Key Features</h2>
        <p className="text-4xl md:text-5xl font-extrabold mt-2">
          <span className="bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent">Services We Provide</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {/* 🤸 Active Learning */}
          <div className="feature-card md:col-span-2 lg:col-span-1 p-8 rounded-2xl shadow-lg bg-gradient-to-br from-rose-400 to-pink-500 text-white aspect-square flex flex-col justify-center items-center text-center">
            <div className="text-5xl mb-4">🤸</div>
            <h4 className="font-extrabold text-2xl mb-3">Active Learning</h4>
            <p className="text-sm leading-relaxed">Children learn by jumping, waving, and moving, turning screen time into a fun, physical adventure.</p>
          </div>

          {/* 🔤 Catch & Speak */}
          <div className="feature-card p-8 rounded-2xl shadow-lg aspect-square flex flex-col justify-center items-center text-center" style={{background:'#d1e8ff'}}>
            <div className="text-5xl mb-4">🔤</div>
            <h4 className="font-bold text-xl text-slate-900 mb-3">Catch & Speak</h4>
            <p className="text-slate-700 text-sm leading-relaxed">Kids catch floating letters, numbers, and objects with their hands/body and say them aloud to reinforce learning.</p>
          </div>

          {/* 🧠 Smart Recognition */}
          <div className="feature-card p-8 rounded-2xl shadow-lg bg-white aspect-square flex flex-col justify-center items-center text-center">
            <div className="text-5xl mb-4">🧠</div>
            <h4 className="font-bold text-xl text-slate-900 mb-3">Smart Recognition</h4>
            <p className="text-slate-600 text-sm leading-relaxed">Built-in motion and voice sensors detect gestures and spoken words, making learning dynamic and interactive.</p>
          </div>

          {/* 🎮 Self-Guided Play */}
          <div className="feature-card p-8 rounded-2xl shadow-lg bg-yellow-400 text-slate-900 aspect-square flex flex-col justify-center items-center text-center">
            <div className="text-5xl mb-4">🎮</div>
            <h4 className="font-extrabold text-2xl mb-3">Self-Guided Play</h4>
            <p className="text-sm leading-relaxed">The app gives visual and audio feedback so kids can learn independently at their own pace—no teacher required.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Adventure() {
  return (
    <section id="adventure" className="py-16 md:py-24 animate-fade-in-up">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-rose-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">
          Turn Learning Into an Adventure
        </h2>
        <p className="mt-4 text-lg text-slate-700 max-w-3xl mx-auto">
          Your child’s journey is broken into fun, daily steps that make progress feel natural and exciting.
        </p>

        <div className="relative mt-10 flex justify-center">
          <img
            src="/images/advanture.png"
            alt="Learning adventure path illustration"
            className="w-full max-w-4xl rounded-3xl shadow-2xl"
          />

          {/* Floating cards at the bottom-center of the image */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4">
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-4">
              <div className="flex-1 text-center rounded-2xl border shadow-md px-4 py-3 md:px-6 md:py-4 transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl" style={{background:'#d1e8ff'}}>
                <p className="font-semibold text-slate-800">No more searching for what to teach next</p>
              </div>
              <div className="flex-1 text-center rounded-2xl border shadow-md px-4 py-3 md:px-6 md:py-4 transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl" style={{background:'#fff9e0'}}>
                <p className="font-semibold text-slate-800">Adjusts automatically to your child’s pace</p>
              </div>
              <div className="flex-1 text-center rounded-2xl border shadow-md px-4 py-3 md:px-6 md:py-4 transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl" style={{background:'#b3e0d2'}}>
                <p className="font-semibold text-slate-800">Builds lasting mastery, one milestone at a time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer to account for floating cards overlap */}
        <div className="h-24 md:h-16" />
      </div>
    </section>
  )
}

function PlayLearnGrow() {
  const words = ['engage', 'educate', 'enrich']
  const wordColors = {
    engage: '#fb923c',   // orange
    educate: '#10b981',  // emerald
    enrich: '#8b5cf6'    // violet
  }
  const [index, setIndex] = React.useState(0)
  const wordsRef = React.useRef(null)

  React.useEffect(() => {
    const el = wordsRef.current
    if (!el) { return }
    let lastSwitch = 0
    let lastX = 0
    let lastY = 0
    let hovering = false

    const onEnter = () => { hovering = true }
    const onLeave = () => { hovering = false }
    const onMove = (e) => {
      if (!hovering) { return }
      const now = performance.now()
      const dx = Math.abs(e.clientX - lastX)
      const dy = Math.abs(e.clientY - lastY)
      const movedEnough = dx + dy > 12
      const slowEnough = now - lastSwitch > 600
      if (movedEnough && slowEnough) {
        setIndex((i) => (i + 1) % words.length)
        lastSwitch = now
      }
      lastX = e.clientX
      lastY = e.clientY
    }
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('mousemove', onMove)
    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <section className="py-16 md:py-28">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <img src="/images/2.png" alt="Kids learning" className="w-full max-w-xl rounded-3xl shadow-2xl" />
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">Play. Learn. Grow.</span>
          </h2>
          <div className="text-2xl md:text-3xl font-extrabold text-slate-900 flex items-baseline gap-2">
            <span>Experience games that</span>
            <span ref={wordsRef} className="relative inline-block h-8 md:h-9 overflow-hidden w-36 cursor-pointer select-none">
              {words.map((w, i) => {
                const rel = (i - index + words.length) % words.length
                // positions: 0 current, 1 next (below), 2 prev (above)
                let translateY = 0
                let opacity = 1
                const baseColor = wordColors[w]
                let color = '#111827'
                if (rel === 0) {
                  translateY = 0
                  opacity = 1
                  color = baseColor
                } else if (rel === 1) {
                  translateY = 32 // below
                  opacity = 0.9
                  color = baseColor + 'CC' // semi-opaque
                } else {
                  translateY = -32 // above
                  opacity = 0.4
                  color = baseColor + '66'
                }
                return (
                  <span
                    key={i}
                    className="absolute left-0 top-0 transition-transform duration-200 ease-out"
                    style={{ 
                      transform: `translateY(${translateY}px)`, 
                      opacity, 
                      color,
                      background: rel === 0 ? `linear-gradient(0deg, ${baseColor}22 0%, ${baseColor}22 100%)` : 'transparent',
                      padding: rel === 0 ? '0 6px' : undefined,
                      borderRadius: rel === 0 ? '8px' : undefined
                    }}
                  >
                    {w}
                  </span>
                )
              })}
            </span>
          </div>

          <div className="space-y-4 text-slate-700">
            <p>Every game is a new adventure! Your child will team up with fun characters to tackle exciting challenges, discovering that the best solutions come from creativity and imagination.</p>
            <p>Learning thrives without pressure. Our world is a judgment-free zone with no timers to beat or scores to stress over. It's a space designed purely for exploration, where every attempt is a step forward.</p>
            <p>We're serious about fun, and even more serious about results. Our games are crafted to build real-world skills and boost classroom confidence.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function DailyChoices() {
  return (
    <section className="py-20" style={{background:'#f6f6fb'}}> {/* very light off-white lavender */}
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold">
          <span className="bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
            Something new to choose from, every day
          </span>
        </h2>
        <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400" />
        <p className="mt-4 text-base md:text-lg text-slate-700 max-w-3xl mx-auto">
          With thousands of games, playsheets, books and videos at their fingertips, your child will never want to stop learning
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Games */}
          <div className="group relative rounded-2xl shadow-lg overflow-hidden">
            <img src="/images/3.png" alt="Games" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70" />
            <div className="absolute inset-0 bg-transparent group-hover:bg-white/70 transition-colors duration-300" />
            <div className="relative z-10 h-56 sm:h-64 lg:h-72" />
            <div className="absolute inset-0 flex items-end justify-center p-6 text-center text-black opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <div>
                <h3 className="text-xl font-bold">Games</h3>
                <p className="mt-2 text-sm">Dive into worlds where learning is a thrilling quest</p>
              </div>
            </div>
          </div>

          {/* Skill Builder Workouts */}
          <div className="group relative rounded-2xl shadow-lg overflow-hidden">
            <img src="/images/4.png" alt="Skill Builder Workouts" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70" />
            <div className="absolute inset-0 bg-transparent group-hover:bg-white/70 transition-colors duration-300" />
            <div className="relative z-10 h-56 sm:h-64 lg:h-72" />
            <div className="absolute inset-0 flex items-end justify-center p-6 text-center text-black opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <div>
                <h3 className="text-xl font-bold">Skill Builder Workouts</h3>
                <p className="mt-2 text-sm">Strengthen core concepts with engaging, gamified worksheets</p>
              </div>
            </div>
          </div>

          {/* A futuristic and inspiring journey */}
          <div className="group relative rounded-2xl shadow-lg overflow-hidden">
            <img src="/images/5.png" alt="A futuristic and inspiring journey" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70" />
            <div className="absolute inset-0 bg-transparent group-hover:bg-white/70 transition-colors duration-300" />
            <div className="relative z-10 h-56 sm:h-64 lg:h-72" />
            <div className="absolute inset-0 flex items-end justify-center p-6 text-center text-black opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <div>
                <h3 className="text-xl font-bold">A futuristic and inspiring journey</h3>
                <p className="mt-2 text-sm">Interacting seamlessly with augmented reality elements</p>
              </div>
            </div>
          </div>

          {/* Learning That Adapts to You */}
          <div className="group relative rounded-2xl shadow-lg overflow-hidden">
            <img src="/images/6.png" alt="Learning That Adapts to You" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70" />
            <div className="absolute inset-0 bg-transparent group-hover:bg-white/70 transition-colors duration-300" />
            <div className="relative z-10 h-56 sm:h-64 lg:h-72" />
            <div className="absolute inset-0 flex items-end justify-center p-6 text-center text-black opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <div>
                <h3 className="text-xl font-bold">Learning That Adapts to You</h3>
                <p className="mt-2 text-sm">From desktop to tablet to phone, learning syncs seamlessly across devices.</p>
              </div>
            </div>
          </div>
          </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="contact" className="bg-indigo-900 text-white relative overflow-hidden">
      {/* Wavy section divider */}
      <div className="w-full h-8 bg-gradient-to-r from-yellow-400 to-orange-500 relative">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" opacity="0.25"/>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="currentColor" opacity="0.5"/>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"/>
        </svg>
      </div>
      <div className="container mx-auto px-6 py-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Children Image Section */}
          <div className="relative h-full flex justify-center">
            <img src="/images/footer-icon.png" alt="Happy children learning" className="w-full max-w-sm h-auto rounded-lg object-cover shadow-md" />
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8">
            {/* Quick Links */}
            <div>
              <h5 className="font-bold text-lg mb-4 text-white">Quick Links</h5>
              <ul className="space-y-3">
                <li>
                  <a href="#home" className="text-gray-300 hover:text-white transition-colors text-sm">Home</a>
                </li>
                <li>
                  <a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</a>
                </li>
                <li>
                  <a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm">Key Features</a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-300 hover:text-white transition-colors text-sm">FAQ</a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h5 className="font-bold text-lg mb-4 text-white">Connect</h5>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                    </svg>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 3.46-2.07 4.667-1.177 1.208-2.826 1.876-4.498 1.876-1.672 0-3.321-.668-4.498-1.876-1.174-1.207-1.901-2.809-2.07-4.667-.034-.375-.034-.75 0-1.125.169-1.858.896-3.46 2.07-4.667C8.679 1.16 10.328.492 12 .492s3.321.668 4.498 1.876c1.174 1.207 1.901 2.809 2.07 4.667.034.375.034.75 0 1.125z"/>
                    </svg>
                    Globe
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-4 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs">
          <p className="text-gray-400">© 2025 Educatch. All Rights Reserved.</p>
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            <a href="/privacy.html" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
            <a href="/terms.html" className="text-gray-400 hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FAQ() {
  const items = [
    { q: 'What is EduCatch?', a: 'EduCatch is a motion and voice-powered learning app for kids aged 4–10. Children jump, wave, and speak to catch letters, numbers, and objects in fun, interactive games.' },
    { q: 'What ages is EduCatch for?', a: 'EduCatch is designed for children 4 to 10 years old, where active learning and foundational skills are most important.' },
    { q: 'What subjects does EduCatch cover?', a: 'EduCatch covers English, Hindi, Maths, Science, and Social Science through playful modules.' },
    { q: 'How does EduCatch work?', a: 'The camera detects hand and body movements while kids catch floating letters and objects. They then say them aloud for instant feedback.' }
  ]

  const [openIdx, setOpenIdx] = React.useState(-1)

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8">Frequently Asked Questions</h2>

          <div className="divide-y divide-slate-200">
            {items.map((item, idx) => (
              <div key={idx}>
                <button
                  onClick={() => setOpenIdx(idx === openIdx ? -1 : idx)}
                  className="w-full flex items-center justify-between py-4 text-left hover:text-rose-600 transition-colors"
                  aria-expanded={idx === openIdx}
                >
                  <span className="font-semibold text-slate-900 pr-3 text-left">{item.q}</span>
                  <span className="text-xl w-6 shrink-0 text-blue-600 text-right">{idx === openIdx ? '–' : '+'}</span>
                </button>

                <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${idx === openIdx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-90'}`}>
                  <div className="overflow-hidden">
                    <p className="pb-4 pl-9 pr-2 text-slate-700">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Features />
      <Adventure />
      <PlayLearnGrow />
      <VideoSection />
      <FAQ />
      <DailyChoices />
      <Footer />
    </main>
  )
}