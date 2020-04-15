import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Index from '@/views/index.vue'
import Welcome from '@/views/welcome.vue'
import Userhome from '@/views/users/userHome.vue'
import Right from '@/views/right/rightlist.vue'
import Role from '@/views/right/rolelist.vue'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [{
    path: '/',
    redirect: {
      name: 'index'
    }
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'index',
    path: '/index',
    component: Index,
    redirect: { path: '/index/welcome' },
    children: [
      {
        name: 'welcome',
        path: 'welcome',
        component: Welcome
      },
      {
        name: 'userhome',
        path: 'userhome',
        component: Userhome
      },
      {
        name: 'right',
        path: 'rights',
        component: Right
      },
      {
        name: 'role',
        path: 'roles',
        component: Role
      }
    ]
  }
  ]
})

export default router
