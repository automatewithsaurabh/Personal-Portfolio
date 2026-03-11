import './style.css'
import './particles.js'

// Page Load Animation
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded')

  // Initialize typing animation
  initTypingAnimation()
})

// Typing Animation for Hero
function initTypingAnimation() {
  const typingElement = document.getElementById('typingText')
  if (!typingElement) return

  const phrases = [
    'AI-Assisted Developer',
    'Building @Commerceflo',
    'Claude AI Enthusiast',
    'Web App Creator'
  ]

  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 100

  function type() {
    const currentPhrase = phrases[phraseIndex]

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1)
      charIndex--
      typingSpeed = 50
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1)
      charIndex++
      typingSpeed = 100
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true
      typingSpeed = 2000 // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      typingSpeed = 500 // Pause before next phrase
    }

    setTimeout(type, typingSpeed)
  }

  setTimeout(type, 1000)
}

// Mobile menu functionality
const menuBtn = document.getElementById('menuBtn')
const closeMenu = document.getElementById('closeMenu')
const mobileMenu = document.getElementById('mobileMenu')
const mobileOverlay = document.getElementById('mobileOverlay')
const mobileLinks = mobileMenu.querySelectorAll('a')

function openMenu() {
  mobileMenu.classList.add('active')
  mobileOverlay.classList.add('active')
  document.body.style.overflow = 'hidden'
}

function closeMenuFn() {
  mobileMenu.classList.remove('active')
  mobileOverlay.classList.remove('active')
  document.body.style.overflow = ''
}

menuBtn.addEventListener('click', openMenu)
closeMenu.addEventListener('click', closeMenuFn)
mobileOverlay.addEventListener('click', closeMenuFn)
mobileLinks.forEach(link => link.addEventListener('click', closeMenuFn))

// Scroll Progress Indicator
const scrollProgress = document.getElementById('scrollProgress')

// Navbar, Back to Top, and Scroll Progress
const navbar = document.getElementById('navbar')
const backToTop = document.getElementById('backToTop')

window.addEventListener('scroll', () => {
  // Scroll Progress
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = (scrollTop / docHeight) * 100
  if (scrollProgress) {
    scrollProgress.style.width = `${progress}%`
  }

  // Navbar background
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)'
    navbar.style.backdropFilter = 'blur(12px)'
    navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)'
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.9)'
    navbar.style.backdropFilter = 'blur(12px)'
    navbar.style.boxShadow = 'none'
  }

  // Back to Top button visibility
  if (window.scrollY > 500) {
    backToTop.classList.remove('opacity-0', 'invisible')
    backToTop.classList.add('opacity-100', 'visible')
  } else {
    backToTop.classList.add('opacity-0', 'invisible')
    backToTop.classList.remove('opacity-100', 'visible')
  }

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('.nav-link')

  let current = ''
  sections.forEach(section => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id')
    }
  })

  navLinks.forEach(link => {
    link.classList.remove('active')
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active')
    }
  })
})

// Back to Top click handler
backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
})

// Create floating particles
const particlesContainer = document.getElementById('particles')
for (let i = 0; i < 20; i++) {
  const particle = document.createElement('div')
  particle.className = 'particle'
  particle.style.left = Math.random() * 100 + '%'
  particle.style.top = Math.random() * 100 + '%'
  particle.style.animationDelay = Math.random() * 5 + 's'
  particle.style.animationDuration = (5 + Math.random() * 5) + 's'
  particle.style.opacity = 0.2 + Math.random() * 0.3
  particlesContainer.appendChild(particle)
}

// Parallax effect on hero
const hero = document.getElementById('hero')
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY
  if (scrolled < window.innerHeight) {
    const heroGradient = hero.querySelector('.hero-gradient')
    if (heroGradient) {
      heroGradient.style.transform = `translateY(${scrolled * 0.3}px)`
    }
  }
})

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-[slide-up_0.6s_ease-out_forwards]')
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Only animate on desktop for performance
const isMobile = window.innerWidth < 640

document.querySelectorAll('.card, .timeline-item, .about-animate, .experience-card, .cert-card').forEach(el => {
  if (!isMobile) {
    el.style.opacity = '0'
    observer.observe(el)
  }
})

// Contact Form Handling with Loading State
const contactForm = document.getElementById('contactForm')
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    // Add loading state
    submitBtn.disabled = true
    submitBtn.classList.add('btn-loading')
    submitBtn.innerHTML = '<span class="opacity-0">Sending...</span>'

    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Success state
    submitBtn.classList.remove('btn-loading')
    submitBtn.innerHTML = `
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
      </svg>
      <span>Message Sent!</span>
    `
    submitBtn.classList.add('bg-green-500')

    // Reset form
    contactForm.reset()

    // Reset button after delay
    setTimeout(() => {
      submitBtn.disabled = false
      submitBtn.classList.remove('bg-green-500')
      submitBtn.innerHTML = originalText
    }, 3000)
  })
}

// Konami Code Easter Egg
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']
let konamiIndex = 0

document.addEventListener('keydown', (e) => {
  if (e.code === konamiCode[konamiIndex]) {
    konamiIndex++
    if (konamiIndex === konamiCode.length) {
      activateEasterEgg()
      konamiIndex = 0
    }
  } else {
    konamiIndex = 0
  }
})

function activateEasterEgg() {
  // Create easter egg overlay
  const overlay = document.createElement('div')
  overlay.className = 'fixed inset-0 bg-dark-bg/95 backdrop-blur-xl z-[999] flex items-center justify-center animate-[fade-in_0.3s_ease-out]'
  overlay.innerHTML = `
    <div class="text-center p-8 max-w-lg">
      <div class="text-6xl mb-6">🎮✨</div>
      <h2 class="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">You found it!</h2>
      <p class="text-text-secondary mb-6">You've unlocked the secret Konami code! Thanks for exploring my portfolio. Built with ❤️ using Antigravity and Claude AI.</p>
      <p class="text-primary font-mono text-sm mb-6">↑ ↑ ↓ ↓ ← → ← → B A</p>
      <button id="closeEasterEgg" class="btn-primary">Cool! 🚀</button>
    </div>
  `
  document.body.appendChild(overlay)
  document.body.style.overflow = 'hidden'

  // Confetti effect
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div')
    confetti.className = 'fixed w-3 h-3 pointer-events-none z-[1000]'
    confetti.style.left = Math.random() * 100 + '%'
    confetti.style.top = '-20px'
    confetti.style.background = ['#8b5cf6', '#6366f1', '#22d3ee', '#f472b6'][Math.floor(Math.random() * 4)]
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0'
    confetti.style.animation = `confetti-fall ${2 + Math.random() * 2}s ease-out forwards`
    confetti.style.animationDelay = Math.random() * 0.5 + 's'
    overlay.appendChild(confetti)
  }

  document.getElementById('closeEasterEgg').addEventListener('click', () => {
    overlay.style.animation = 'fade-in 0.3s ease-out reverse'
    setTimeout(() => {
      overlay.remove()
      document.body.style.overflow = ''
    }, 300)
  })
}

// Keyboard Navigation Enhancement
document.addEventListener('keydown', (e) => {
  // ESC to close mobile menu
  if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
    closeMenuFn()
  }
})

// Focus trap for mobile menu
mobileMenu.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    const focusableElements = mobileMenu.querySelectorAll('button, a')
    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
})

console.log('%c🚀 Built with Antigravity and Claude AI', 'background: linear-gradient(90deg, #8b5cf6, #6366f1); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px;')
console.log('%c💡 Hint: Try the Konami code!', 'color: #8b5cf6; font-size: 12px;')
