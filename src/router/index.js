import {
    createRouter, 
    createWebHistory 
  } from 'vue-router'
  
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/plus3',
        name: 'plus3',
        component: () => import('@/views/Plus3/index.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: {
          name: 'plus3',
          params: {} 
        } 
      }
    ]
  })
  
  export default router