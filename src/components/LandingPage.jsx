import React, { useEffect, useRef, useState } from 'react'

function Header() {
  const [open, setOpen] = useState(false)
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
    }
    setOpen(false) // Close mobile menu after clicking
  }

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-3xl font-bold text-rose-500">Educatch</a>
        <div className="hidden md:flex space-x-8 items-center">
          <button onClick={() => scrollToSection('home')} className="text-slate-600 hover:text-rose-500 transition-colors">Home</button>
          <button onClick={() => scrollToSection('features')} className="text-slate-600 hover:text-rose-500 transition-colors">Features</button>
          <button onClick={() => scrollToSection('about')} className="text-slate-600 hover:text-rose-500 transition-colors">About Us</button>
          <button onClick={() => scrollToSection('waitlist')} className="bg-rose-500 text-white px-5 py-2 rounded-full hover:bg-rose-600 transition-transform hover:scale-105 shadow-md">Enroll Now</button>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-slate-700" aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3">
          <button onClick={() => scrollToSection('home')} className="block text-slate-600 hover:text-rose-500 text-left">Home</button>
          <button onClick={() => scrollToSection('features')} className="block text-slate-600 hover:text-rose-500 text-left">Features</button>
          <button onClick={() => scrollToSection('about')} className="block text-slate-600 hover:text-rose-500 text-left">About Us</button>
          <button onClick={() => scrollToSection('waitlist')} className="inline-block bg-rose-500 text-white px-5 py-2 rounded-full hover:bg-rose-600 shadow-md">Enroll Now</button>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="relative container mx-auto px-6 py-20 md:py-32 overflow-hidden">
      <div className="absolute top-0 -left-16 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"/>
      <div className="absolute top-0 -right-16 w-72 h-72 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"/>
      <div className="relative flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight"><span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">Education</span> Reimagined.</h1>
          <p className="mt-6 text-lg text-slate-600">Welcome to a new world of fun-filled, interactive learning designed to spark curiosity in your child.</p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img src="/images/hero-child.png" alt="Happy child using a tablet" className="rounded-lg shadow-2xl w-full h-full object-cover" />
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-rose-50/50 scroll-animate">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-slate-400">About Us</h2>
          <p className="text-4xl md:text-5xl font-bold text-slate-900 mt-2">Catch the Spark of Learning!</p>
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
              <img src="/images/about-child-2.png" alt="Curious child laughing" className="w-full h-56 object-cover" />
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

function Features() {
  return (
    <section id="features" className="py-20 md:py-32 scroll-animate">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-sm font-semibold text-rose-500 uppercase tracking-widest">Key Features</h2>
        <p className="text-4xl md:text-5xl font-bold text-slate-900 mt-2">Services We Provide</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
          {/* Top-Left: Large & Horizontal - Pink gradient */}
          <div className="md:col-span-6 p-8 rounded-4xl shadow-lg bg-gradient-to-r from-rose-400 to-pink-500 text-white">
            <div className="flex items-start gap-4">
              <div className="text-4xl">😁😌</div>
              <div>
                <h4 className="font-extrabold text-2xl">Active Learning</h4>
                <p className="mt-2">Hands-on, movement-powered activities that make learning engaging and memorable for kids.</p>
              </div>
            </div>
          </div>

          {/* Top-Right: Small & Square - Light Blue */}
          <div className="p-8 rounded-2xl shadow-lg" style={{background:'#d1e8ff'}}>
            <div className="text-4xl mb-3">📖</div>
            <h4 className="font-bold text-xl text-slate-900">Safe Environment</h4>
            <p className="text-slate-700 mt-2">A secure, welcoming space for children to explore and grow.</p>
          </div>

          {/* Bottom-Left: Medium Rectangle - White */}
          <div className="p-8 rounded-2xl shadow-lg bg-white">
            <div className="text-4xl mb-3">🗣️👫</div>
            <h4 className="font-bold text-xl text-slate-900">Smart Word & Letter Detection</h4>
            <p className="text-slate-600 mt-2">Creative sensors capture spoken words, drawn letters, and gestures, making learning dynamic and interactive.</p>
          </div>

          {/* Bottom-Right: Large & Horizontal - Solid Yellow */}
          <div className="md:col-span-2 p-8 rounded-2xl shadow-lg bg-yellow-400 text-slate-900">
            <div className="flex items-start gap-4">
              <div className="text-4xl">👩‍🏫</div>
              <div>
                <h4 className="font-extrabold text-2xl">Interactive & Self-Guided</h4>
                <p className="mt-2">The system guides children with visual and audio feedback—learning happens independently, without teachers.  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Waitlist() {
  return (
    <section id="waitlist" className="py-16 md:py-24">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold">Join the Waitlist!</h2>
        <p className="mt-4 text-lg text-slate-700">Spark joy in learning ✨ Join our waitlist to get the latest updates on our launch and upcoming features.🚀</p>
        <form onSubmit={(e)=>e.preventDefault()} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <input type="email" required placeholder="Enter your email" className="w-full sm:w-auto flex-1 px-5 py-3 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500" />
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/dashboard.html" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 shadow-md transition-all duration-200">
              Get Started
            </a>
            <a href="/dashboard.html?mode=login" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 shadow-md transition-all duration-200">
              Sign In
            </a>
          </div>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="contact" className="bg-indigo-900 text-white relative overflow-hidden">
      {/* Wavy section divider */}
      <div className="w-full h-24 bg-gradient-to-r from-yellow-400 to-orange-500 relative">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" opacity="0.25"/>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="currentColor" opacity="0.5"/>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"/>
        </svg>
      </div>


      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl font-extrabold">Educatch</div>
            </div>
            <a href="#" className="inline-block border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-900 transition-all duration-300 font-semibold">
              CONTACT US
            </a>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8">
            {/* Quick Links */}
            <div>
              <h5 className="font-bold text-lg mb-4 text-white">Quick Links</h5>
              <ul className="space-y-3">
                {['HOME', 'CLIENT WORK', 'OUR PRODUCTS', 'ABOUT'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
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
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 Educatch. All Rights Reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Features />
      <Waitlist />
      <Footer />
    </main>
  )
}

