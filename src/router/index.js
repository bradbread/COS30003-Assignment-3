import { createRouter, createWebHistory } from 'vue-router';
import MenuComponent from '../components/MenuComponent.vue';
import CartComponent from '../components/CartComponent.vue';
import ReserveForm from '../components/ReserveForm.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: MenuComponent
  },
  {
    path: '/order',
    name: 'cart',
    component: CartComponent
  },
  {
    path: '/reserve',
    name: 'reserve',
    component: ReserveForm
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
