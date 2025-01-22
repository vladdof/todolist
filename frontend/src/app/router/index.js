import { createRouter, createWebHistory } from 'vue-router'
import TheWelcome from '@/pages/TheWelcome/TheWelcome.vue'
import TodoList from '@/pages/TodoList/TodoList.vue'

const routes = [
  { path: '/', component: TheWelcome },
  { path: '/todos', component: TodoList }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
