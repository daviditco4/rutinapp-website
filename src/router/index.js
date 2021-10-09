import Vue from 'vue'
import VueRouter from 'vue-router'
import preHome from '../views/preHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../layouts/BGLayout'),
    children: [
        {
            // path: '/preHome',
            // name: 'PreHome',
            // component: () => import('../views/preHome.vue')
            path: '/',
            name: 'PreHome',
            component: preHome,
        },
        
    ]
  },
  {
    path: '/',
    component: () => import('../layouts/BGLayout'),
    children: [
        {
          // path: '/',
          // name: 'Home',
          // component: Home
          path: '/home',
          name: 'Home',
          component: () => import('../views/Home.vue')
        }
    ] 
  },
  {
    path: '/login',
    component: () => import('../layouts/BGLayout'),
    children: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/Login.vue')
        },
        
    ]
  },
  {
    path: '/singUp',
    component: () => import('../layouts/BGLayout'),
    children: [
        {
            path: '/signUp',
            name: 'SignUp',
            component: () => import('../views/SignUp.vue')
        },
        
    ]
  },
  {
    path: '/buscar-rutinas',
    name: 'BuscarRutinas',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "buscarRutinas" */ '../views/BuscarRutinas.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
