function Index() {
  return import(/* webpackChunkName: "index" */ '@/pages/index.vue')
}
function _404Page() {
  return import(/* webpackChunkName: "404_page" */ '@/pages/404_page.vue')
}

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
