import Vue from 'vue'
import createApp from '../main.js'
import renderToString from "vue-server-renderer/basic";
import createRouter from '../router/server'
//import 404 page
Vue.config.productionTip = false
const error_404_path = '/404_page'

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
    router.push(error_404_path);
    router.onReady(() => {
     return reject({app, code: 404,error:'not matched',error_file_found: true})
    },() => {
     reject({app, code: 404,error:'not matched',error_file_found: true});
    })
   }

   // the Promise should resolve to the app instance so it can be rendered
   resolve(app)
  }, (error) => {
   reject({app,code: 500,error});
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
 }).catch(({app,error,error_file_found,code}) => {
  if(typeof dispatch !== 'undefined')
  {
   renderToString(app, (err, html) => {
    if(err)
    {
     throw new Error(err);
    }
    if(code === 404){
    if(error_file_found){

      dispatch(`
     ${html}
     <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(state)};
    </script>
    `);
    }else{
     dispatch(`
<h1 style="text-align: center">
PAGE NOT FOUND
</h1>
     <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(state)};
    </script>
    `);
    }
    }else{
     dispatch(`
<h1 style="text-align: center">
ERROR 500
</h1>
     
    `);
    }



   });
  }


 });
}
