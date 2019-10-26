import Vue from 'vue'
import createApp from '../main.js'
import renderToString from "vue-server-renderer/basic";
import createRouter from '../router/server'

Vue.config.productionTip = false


 function main(url,state){
 return new Promise((resolve, reject) => {
  const router = createRouter();

  const {app,Vue,store} = createApp(state,router);
  store.replaceState(state);
  // Vue.prototype.$state = state;
  router.push(url);

  router.onReady(() => {
   const matchedComponents = router.getMatchedComponents();
   // no matched routes, reject with 404
   if (!matchedComponents.length) {
    return reject({app, code: 404,error:'not matched'})
   }

   // the Promise should resolve to the app instance so it can be rendered
   resolve(app)
  }, (error) => {
   reject({app,error});
  })
 })
 }

if(typeof context != 'undefined'){
 const route = context.route;
 const state = context.state || {};
 main(route,state).then(app => {
  if(typeof dispatch !== 'undefined')
  {
   renderToString(app, (err, html) => {
    if(err)
    {
     throw new Error(err);
    }
    dispatch(`
    ${html}
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(state)};
    </script>
    `);
   });
  }
 }).catch(({app,error}) => {
  if(typeof dispatch !== 'undefined')
  {
   renderToString(app, (err, html) => {
    if(err)
    {
     throw new Error(err);
    }
    dispatch(`
    Catch: <b>${JSON.stringify(context.route)}</b><br>
    error: <b>${JSON.stringify(error)}</b><br>
    `);
   });
  }


 });
}
