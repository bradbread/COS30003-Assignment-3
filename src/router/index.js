import { createRouter, createWebHistory } from 'vue-router'
import MainComponent from '../components/MainComponent.vue'
import CartComponent from '../components/CartComponent.vue'
import ReserveComponent from '../components/ReserveComponent.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainComponent,
    props: {MainComponent: true}
  },
  {
    path: '/order',
    name: 'cart',
    component: CartComponent
  },
  {
    path: '/reserve',
    name: 'reserve',
    component: ReserveComponent
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
