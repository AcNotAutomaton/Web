import { createRouter, createWebHistory } from 'vue-router'
import NavBar from '../components/NavBar'
import HomeView from '../views/HomeView'
import NotFound from '../views/NotFound'

const routes = [
  {
    path: '/',
    name: 'NavVar',
    component: NavBar,
  },
  {
    path: '/home/',
    name: 'home_view',
    component: HomeView,
  },
  {
    path: "/404/",
    name: "404",
    component: NotFound,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/"
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
