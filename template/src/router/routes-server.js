import Index from '@/pages/index.vue'
import _404Page from '@/pages/404_page.vue'

export default [
  {
    name: 'index',
    path: '/',
    component: Index
  },
  {
    name: '404_page',
    path: '/404_page',
    component: _404Page
  }
]
