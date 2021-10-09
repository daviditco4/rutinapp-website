import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../layouts/BGLayout'),
    children: [
        {
          path: '/',
          name: 'Home',
          component: Home
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
            component: () => import('../views/Login')
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
