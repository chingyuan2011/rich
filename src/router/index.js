import {
    createRouter, 
    createWebHistory 
  } from 'vue-router'
  
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/plus4',
        name: 'plus4',
        component: () => import('@/views/Plus4/index.vue')
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