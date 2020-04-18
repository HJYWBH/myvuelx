import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Index from '@/views/index.vue'
import Welcome from '@/views/welcome.vue'
import Userhome from '@/views/users/userHome.vue'
import Right from '@/views/right/rightlist.vue'
import Role from '@/views/right/rolelist.vue'
import Goods from '@/views/goods/goods.vue'
import Lists from '@/views/goods/lists.vue'
import Add from '@/views/goods/add.vue'
import Reports from '@/views/Reports/Reports.vue'

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
        name: 'reports',
        path: 'reports',
        component: Reports
      },
      {
        name: 'welcome',
        path: 'welcome',
        component: Welcome
      },
      {
        name: 'users',
        path: 'users',
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
      },
      {
        name: 'goods',
        path: 'goods',
        component: Goods,
        redirect: { name: 'lists' },
        children: [
          {
            name: 'lists',
            path: 'lists',
            component: Lists
          },
          {
            name: 'add',
            path: 'add',
            component: Add
          }
        ]
      }
    ]
  }
  ]
})

export default router
