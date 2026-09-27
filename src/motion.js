// Small motion helpers: scroll reveal, image fade-in, count-up, scroll state and
// page-transition timing. Everything here only enhances: the pre-rendered HTML shows all
// content, and CSS hides reveal/fade targets only while <html> has the `js` class
// (set by the inline script in index.html, removed again if the app never starts).
import { ref, readonly } from 'vue'

const isBrowser = typeof window !== 'undefined'

export const prefersReducedMotion = () =>
  isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ---------- v-reveal: fade + rise into view, once ----------
// v-reveal            -> no delay
// v-reveal="i"        -> stagger step i (60ms each, see --reveal-step in main.css)
let revealObserver = null
function getRevealObserver() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-revealed')
          revealObserver.unobserve(entry.target)
        }
      },
      { threshold: 0.15 },
    )
  }
  return revealObserver
}

const staggerStyle = (value) => (typeof value === 'number' ? `--reveal-i:${value}` : undefined)

export const vReveal = {
  // Rendered into the pre-built HTML, so hidden-until-revealed applies before hydration.
  getSSRProps(binding) {
    return { 'data-reveal': '', style: staggerStyle(binding.value) }
  },
  mounted(el, binding) {
    el.setAttribute('data-reveal', '')
    if (typeof binding.value === 'number') el.style.setProperty('--reveal-i', binding.value)
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      el.classList.add('is-revealed')
      return
    }
    getRevealObserver().observe(el)
  },
  beforeUnmount(el) {
    revealObserver?.unobserve(el)
  },
}

// Also watch every pre-rendered reveal target on the page, including ones inside parts that
// hydrate later (lazy components), so they are not left hidden until their JS arrives.
export function scanReveals() {
  if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-revealed'))
    return
  }
  const observer = getRevealObserver()
  document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => observer.observe(el))
}

// ---------- v-fade-img: lazy images fade in once loaded ----------
export const vFadeImg = {
  getSSRProps() {
    return { 'data-fade': '' }
  },
  mounted(el) {
    el.setAttribute('data-fade', '')
    const done = () => el.classList.add('is-loaded')
    if (el.complete && el.naturalWidth) done()
    else {
      el.addEventListener('load', done, { once: true })
      el.addEventListener('error', done, { once: true })
    }
  },
}

// ---------- v-count-up: "400+" counts up from 0 when first visible ----------
export const vCountUp = {
  mounted(el) {
    const text = el.textContent.trim()
    const match = text.match(/^(\D*)(\d+)(.*)$/)
    if (!match || !('IntersectionObserver' in window) || prefersReducedMotion()) return
    const [, prefix, digits, suffix] = match
    const target = Number(digits)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const duration = 1200
        const start = performance.now()
        const frame = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 4) // matches the ease-out feel of --ease
          el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`
          if (p < 1) requestAnimationFrame(frame)
        }
        el.textContent = `${prefix}0${suffix}`
        requestAnimationFrame(frame)
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    el._countUpObserver = observer
  },
  beforeUnmount(el) {
    el._countUpObserver?.disconnect()
  },
}

// ---------- shared scroll state (one passive listener for the whole app) ----------
const scrollY = ref(0)
const scrollDelta = ref(0) // px moved since the previous frame (+ down, - up)
let scrollStarted = false

export function useScrollState() {
  if (isBrowser && !scrollStarted) {
    scrollStarted = true
    let last = window.scrollY
    let ticking = false
    scrollY.value = last
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return
        ticking = true
        requestAnimationFrame(() => {
          const y = window.scrollY
          scrollDelta.value = y - last
          scrollY.value = y
          last = y
          ticking = false
        })
      },
      { passive: true },
    )
  }
  return { scrollY: readonly(scrollY), scrollDelta: readonly(scrollDelta) }
}

// ---------- hero registry: pages with a photo hero register it here ----------
// heroVisible is true while any part of the current page's hero is on screen.
export const heroVisible = ref(false)
let heroObserver = null

export function registerHero(el) {
  if (!isBrowser || !el) return
  heroObserver?.disconnect()
  heroVisible.value = true // pages open at the top; the observer corrects it at once
  heroObserver = new IntersectionObserver(([entry]) => {
    heroVisible.value = entry.isIntersecting
  })
  heroObserver.observe(el)
}
export function unregisterHero() {
  heroObserver?.disconnect()
  heroObserver = null
  heroVisible.value = false
}

// ---------- page transition <-> scrollBehavior ----------
// The router waits until the old page has faded out and the new one is in the DOM
// before it scrolls, so the jump to the top is never visible.
let pendingEnter = []
export function waitForPageEnter() {
  return new Promise((resolve) => {
    pendingEnter.push(resolve)
    setTimeout(resolve, 800) // never block scrolling if a transition is skipped
  })
}
export function pageEntered() {
  const list = pendingEnter
  pendingEnter = []
  list.forEach((resolve) => resolve())
  requestAnimationFrame(scanReveals)
}
