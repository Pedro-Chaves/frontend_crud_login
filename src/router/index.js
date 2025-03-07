import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import UsersView from '@/views/UsersView.vue'
import UpdateView from '@/views/UpdateView.vue'
import axios from 'axios'

const AdminAuth = (to, from, next) => {
  if(localStorage.getItem('token') != undefined) {
    const req = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    axios.post(`${process.env.VUE_APP_API_URL}/user/validate_admin`, {}, req).then(() => {
      next();
    }).catch(err => {
      console.log('err', err);
      next('/login')
    })
  }
  else next('/login')
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin/users',
    name: 'users',
    component: UsersView,
    beforeEnter: AdminAuth
  },
  {
    path: '/users/edit/:id',
    name: 'edit',
    component: UpdateView,
    beforeEnter: AdminAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
