import Vue from 'vue'
import VueRouter from 'vue-router'

const search = () => import('../views/search/search.vue')
const mymusic = () => import('../views/my-music/MyMusic.vue')
const history = () => import('../views/history/History.vue')
const find = () => import('../views/find/Find.vue')
const show = () => import('../views/showRecommend/Show.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/find'

  },

  {
    path: '/search',
    component: search
  },
  {
    path: '/mymusic',
    component: mymusic
  },
  {
    path: '/history',
    component: history
  },
  {
    path: '/find',
    component: find
  },
  {
    path: '/show',
    component: show
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
