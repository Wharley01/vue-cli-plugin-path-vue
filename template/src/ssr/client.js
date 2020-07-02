import createApp from "../main.js"
import createRouter from '../router/index'
const r = createRouter();

const {app,router,store} = createApp(null,r);

if(window.__INITIAL_STATE__){
    //TODO: don't forget this in the main plugin
    let __state = {
        ...store.state,
        ...window.__INITIAL_STATE__
    };
    store.replaceState(__state);
}

app.$mount('#app',true);
