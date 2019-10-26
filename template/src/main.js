import Vue from 'vue'
import App from './App.vue'

import store from './store'

Vue.config.productionTip = false

export default  (state = null,router) => {
    const app = new Vue({
        // inject router into root Vue instance
        router,
        store,
        render: h => h(App)
    })

    // return both the app and the router
    return { app, router, store, Vue }
}
