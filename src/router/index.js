import Vue from 'vue'
import Router from 'vue-router'
import Banner from '@/view/banner/banner.vue'
import Indexnav from '@/view/index-nav/index-nav.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Banner'
    },
    {
      path: '/banner',
      name: 'Banner',
      component: Banner
    },
    {
      path: '/index-nav',
      name: 'Indexnav',
      component: Indexnav
    }
  ]
})
