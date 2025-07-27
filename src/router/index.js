import {
    createRouter, 
    createWebHistory 
  } from 'vue-router'
  
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/rich23',
        name: 'rich23',
        component: () => import('@/views/Rich23/index.vue')
      },
      {
        path: '/thanks2025',
        name: 'thanks2025',
        component: () => import('@/views/Thanks2025/index.vue')
      },
      {
        path: '/plus1',
        name: 'plus1',
        component: () => import('@/views/Plus1/index.vue')
      },
      {
        path: '/plus2',
        name: 'plus2',
        component: () => import('@/views/Plus2/index.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: {
          name: 'rich23',
          params: {} 
        } 
      }
    ]
  })
  
  export default router