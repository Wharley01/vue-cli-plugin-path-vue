import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import '@__path/bool'
import BindPlugins from "./BindPlugins";
import GlobalMixins from "./GlobalMixins";
import createStore from "./store";
BindPlugins(Vue, Vuex);
GlobalMixins(Vue);

// Vue.config.devtools = true;
Vue.config.productionTip = false;

export default (state = null, router) => {
  const store = createStore(Vuex, new Vue(), router);

  router.beforeEach((to, from, next) => {
    ////console.log("Route Loading");
    // store.commit('STARTED_LOADING');
    next();
  });

  router.afterEach((to, from) => {
    // store.commit('STOPPED_LOADING');
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
