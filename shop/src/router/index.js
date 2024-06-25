import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import AddView from '../views/AddView.vue'
import MyCart from '../views/MyCart.vue'
import UpdateView from '../views/UpdateView.vue'
import EditView from '../views/EditView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/detail/:i',
    name: 'Detail',
    component: DetailView
  },
  {
    path: '/add',
    name: 'Add',
    component: AddView
  },
  {
    path: '/mycart',
    name: 'MyCart',
    component: MyCart
  },
  {
    path: '/update/:i',
    name: 'Update',
    component: UpdateView
  },
  {
    path: '/edit',
    name: 'Edit',
    component: EditView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
