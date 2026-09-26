import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './routes.js'
import './styles/main.css'

export const createApp = ViteSSG(App, {
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 12, behavior: 'smooth' }
    return { top: 0 }
  },
})
