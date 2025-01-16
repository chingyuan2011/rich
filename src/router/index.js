import {
    createRouter, 
    createWebHistory 
  } from 'vue-router'
  import Rich23 from '@/views/Rich23/index.vue'
  
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/rich23',
        name: 'rich23',
        component: Rich23
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