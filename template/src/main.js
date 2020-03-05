import Vue from "vue";
import App from "./App.vue";
import createStore from "./store";
import axios from "axios";
import Meta from "vue-meta";
import Vuex, { mapState } from "vuex";

Vue.use(Meta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
});

Vue.use(Vuex);

// Vue.config.devtools = true;

if (typeof window !== "undefined") {
}

// let api_root = '';
let api_root = "https://api.website.com";
let api_version = "v1";

// import

let axiosInstance = axios.create({
  baseURL: api_root + "/" + api_version,
  withCredentials: true
});

Vue.prototype.$http = axiosInstance;
Vue.config.productionTip = false;

export default (state = null, router) => {
  const store = createStore(Vuex, new Vue(), router);

  router.beforeEach((to, from, next) => {
    ////console.log("Route Loading");
    next();
  });

  router.afterEach((to, from) => {

    ////console.log("Route Loaded");
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
  };
};
