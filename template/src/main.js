import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import store from './store'
const router = createRouter();

Vue.config.productionTip = false

export default  (state = null) => {
 Vue.prototype.$state = state;

 const app = new Vue({
  // inject router into root Vue instance
  router,
  store,
  render: h => h(App)
 })

 // return both the app and the router
 return { app, router }
}
