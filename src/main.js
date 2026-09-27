import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './routes.js'
import { vReveal, vFadeImg, vCountUp, waitForPageEnter, prefersReducedMotion } from './motion.js'
import './styles/fonts.css'
import './styles/main.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    async scrollBehavior(to, from, savedPosition) {
      // Changing page: scroll once the old page has faded out and the new one is in.
      if (from.matched.length && to.path !== from.path) await waitForPageEnter()
      if (savedPosition) return savedPosition
      const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
      // top: clears the sticky header (same as scroll-margin-top in main.css)
      if (to.hash) return { el: to.hash, top: 72, behavior }
      // <SectionLink>: home page section without a #hash in the URL
      const section = window.history.state?.section
      if (section) return { el: `#${section}`, top: 72, behavior }
      return { top: 0 }
    },
  },
  ({ app }) => {
    app.directive('reveal', vReveal)
    app.directive('fade-img', vFadeImg)
    app.directive('count-up', vCountUp)
  },
)
