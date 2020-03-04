import Vue from 'vue'
import App from './App.vue'
import createStore from './store'
import axios from 'axios';
import Meta from 'vue-meta'

Vue.use(Meta,{
    // optional pluginOptions
    refreshOnceOnNavigation: true
})

Vue.use(Vuex)

// Vue.config.devtools = true;

if (typeof window !== 'undefined') {

}


// let api_root = '';
let api_root = 'https://api.website.com';
let api_version = 'v1';

// import

let axiosInstance = axios.create({
    baseURL: api_root + '/' + api_version,
    withCredentials: true
});

Vue.prototype.$http = axiosInstance;
Vue.config.productionTip = false;

export default (state = null, router) => {
    const store = createStore(Vuex, new Vue, router);

    router.beforeEach((to, from, next) => {
        store.commit("SET_GLOBAL_LOADING_STATE", true);
        ////console.log("Route Loading");
        next();
    });

    router.afterEach((to, from) => {
        store.commit("SET_GLOBAL_LOADING_STATE", false);

        ////console.log("Route Loaded");
    });

    Vue.use(VueAnalytics, {
        id: 'UA-39050107-1',
        router
    });

    const app = new Vue({
        // inject router into root Vue instance
        router,
        store,
        render: h => h(App)
    });

    // return both the app and the router
    return {
        app,
        router,
        store,
        Vue
    }
}
