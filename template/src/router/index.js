import Vue from 'vue'
import Router from 'vue-router'
import routesClient from "./routes-client";

let has_context = typeof context != 'undefined'

Vue.use(Router)

export default () => {

  return new Router({
    mode: 'history',
    routes: routesClient,
    scrollBehavior() {
      return { x: 0, y: 0 };
    },
  })
}
