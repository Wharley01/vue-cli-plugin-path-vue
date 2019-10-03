import Vue from 'vue'
import createApp from './main'

Vue.config.productionTip = false

 export default (url,state) => {

 return new Promise((resolve, reject) => {
  const {router,app} = createApp(state);
  router.push(url);

  router.onReady(() => {
   const matchedComponents = router.getMatchedComponents()
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
