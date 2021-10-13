import Vue from 'vue'
import VueRouter from 'vue-router'
import preHome from '../views/preHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../layouts/BGLoginLayout'),
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
    path: '/home',
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
    component: () => import('../layouts/BGLoginLayout'),
    children: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/Login.vue')
        },
        
    ]
  },
  {
    path: '/signUp',
    component: () => import('../layouts/BGLoginLayout'),
    children: [
        {
            path: '/signUp',
            name: 'SignUp',
            component: () => import('../views/SignUp.vue')
        },
        
    ]
  },
  {
    path: '/signUp',
    component: () => import('../layouts/BGLayout'),
    children: [        
      {
        path: '/search-routine',
        name: 'BuscarRutinas',
        component: () => import(/* webpackChunkName: "buscarRutinas" */ '../views/BuscarRutinas.vue')
      }
    ]
  },
  {
    path: '/profile',
    component: () => import('../layouts/BGLayout'),
    children: [    
        {
          path: '/profile',
          name: 'Profile',
          component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile.vue')
        }
    ]
  },
  {
    path: '/create-exercise',
    component: () => import('../layouts/BGLayout'),
    children: [    
        {
          path: '/create-exercise',
          name: 'CreateExercise',
          component: () => import(/* webpackChunkName: "CreateExercise" */ '../views/CreateExercise.vue')
        }
    ]
  },
  {
    path: '/create-routine',
    component: () => import('../layouts/BGLayout'),
    children: [    
        {
          path: '/create-routine',
          name: 'CreateRoutine',
          component: () => import(/* webpackChunkName: "CreateRoutine" */ '../views/CreateRoutine.vue')
        }
    ]
  },
  {
    path: '/library',
    component: () => import('../layouts/BGLayout'),
    children: [    
        {
          path: '/library',
          name: 'Library',
          component: () => import(/* webpackChunkName: "Library" */ '../views/Library.vue')
        }
    ]
  },
  {

    path: '/help',
    component: () => import('../layouts/BGLayout'),
    children: [    
        {
          path: '/help',
          name: 'Help',
          component: () => import(/* webpackChunkName: "Help" */ '../views/Help.vue')
        }
    ]
  },
  {
    path: '*',
    component: () => import('../layouts/BGLayout'),
      children: [
          {
              path: '',
              name: 'PageNotFound',
              component: () => import('../views/Page404')
          }
      ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
