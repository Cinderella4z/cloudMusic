import Vue from 'vue'
import VueRouter from 'vue-router'

const search = () => import('../views/search/search.vue')
const mymusic = () => import('../views/my-music/MyMusic.vue')
const history = () => import('../views/history/History.vue')
const find = () => import('../views/find/Find.vue')
const show = () => import('../views/showRecommend/Show.vue')
const recommend = () => import('../views/find/children/Recommend.vue')
const List = () => import('../views/find/children/List.vue')

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
    component: find,
    children: [
      {
        path: '/',
        redirect: '/recommend'

      },
      {
        path: '/recommend',
        component: recommend,
      },
      {
        path: '/list',
        component: List
      },
    ],
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
