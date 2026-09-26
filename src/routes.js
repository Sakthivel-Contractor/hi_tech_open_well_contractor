export const routes = [
  { path: '/', name: 'home', component: () => import('./pages/HomePage.vue') },
  { path: '/contact', name: 'contact', component: () => import('./pages/ContactPage.vue') },
  { path: '/privacy', name: 'privacy', component: () => import('./pages/PrivacyPage.vue') },
  {
    path: '/:state/:district',
    name: 'district',
    component: () => import('./pages/DistrictPage.vue'),
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./pages/NotFound.vue') },
]
