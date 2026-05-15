import {
    createRouter, 
    createWebHistory 
  } from 'vue-router'
  
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/impact',
        name: 'impact',
        component: () => import('@/views/Impact/index.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: {
          name: 'impact',
          params: {} 
        } 
      }
    ]
  })
  
  export default router