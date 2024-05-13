import { createRouter, createWebHistory } from 'vue-router'
import TheWelcomeView from '@/views/TheWelcomeView.vue'
import TodoView from '@/views/TodoView.vue'

const routes = [
  { path: '/', component: TheWelcomeView },
  { path: '/todo-app', component: TodoView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
