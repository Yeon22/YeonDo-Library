import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/books/:id',
    name: 'Book',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "book" */ '../views/Book.vue')
  },
  {
    path: '/books/create',
    name: 'Create',
    component: () => import(/* webpackChunkName: "create" */ '../views/Book.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/404"
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
