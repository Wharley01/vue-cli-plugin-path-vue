import Vue from 'vue'
import Router from 'vue-router'

let has_context = typeof context != 'undefined'

import routesServer from '../router/routes-server'
//import entrance

Vue.use(Router)

export default () => {

  return new Router({
    mode: 'history',
    routes: routesServer
});

}
