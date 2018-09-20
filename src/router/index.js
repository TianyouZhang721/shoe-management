import Vue from 'vue'
import Router from 'vue-router'
import Banner from '@/view/banner/banner.vue'
import Indexnav from '@/view/index-nav/index-nav.vue'
import Class from '@/view/class/class.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/shoe-management/',
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
    },
    {
      path: '/class',
      name: 'Class',
      component: Class
    }
  ]
})
