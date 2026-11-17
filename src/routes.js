export const routes = [
  { path: '/', name: 'home', component: () => import('./pages/HomePage.vue') },
  { path: '/contact', name: 'contact', component: () => import('./pages/ContactPage.vue') },
  { path: '/privacy', name: 'privacy', component: () => import('./pages/PrivacyPage.vue') },
  { path: '/about-us', name: 'about', component: () => import('./pages/AboutPage.vue') },
  { path: '/cost-guide', name: 'cost', component: () => import('./pages/CostGuidePage.vue') },
  { path: '/gallery', name: 'gallery', component: () => import('./pages/GalleryPage.vue') },
  {
    path: '/service-areas',
    name: 'areas',
    component: () => import('./pages/ServiceAreasPage.vue'),
  },
  {
    path: '/services/:service',
    name: 'service',
    component: () => import('./pages/ServicePage.vue'),
  },
  {
    path: '/:state/:district',
    name: 'district',
    component: () => import('./pages/DistrictPage.vue'),
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./pages/NotFound.vue') },
]
