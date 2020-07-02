import Vue from "vue";
import createApp from "../main.js";
import renderToString from "vue-server-renderer/basic";
import createRouter from "../router/server";
import template from "lodash.template";
//import 404 page
Vue.config.productionTip = false;
const error_404_path = "/404_page";


import templateContent from 'raw-loader!./app.template.html';

// see: https://lodash.com/docs#template
const compiled = template(templateContent, { interpolate: /{{([\s\S]+?)}}/g });

if (typeof context != "undefined") {
    const route = context.route;
    const state = context.state || {};
    main(route, state)
        .then( app => {

            // console.log(JSON.stringify(state.search_result));

            if (typeof dispatch !== "undefined") {
                renderToString(app, (err, html) => {
                    // console.log({tttt: app.$meta().inject()});
                    dispatch(compiled({
                        app: html,
                        ...app.$meta().inject()
                    }));

                });
            }
        })
        .catch(({ app, error_file_found, code }) => {

            if (typeof dispatch !== "undefined") {

                renderToString(app,(err, html) => {
                    // console.log({tttt: app.$meta().inject()});
                    // return;

                    const pageHtml = compiled({
                        app: html,
                        ...app.$meta().inject()
                    });

                    if (err) {
                        throw new Error(err);
                    }
                    if (code === 404) {
                        if (error_file_found) {
                            dispatch(pageHtml);
                        } else {
                            dispatch(`
<h1 style="text-align: center">
PAGE NOT FOUND
</h1>
    `);
                        }
                    } else {
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



function main(url, state) {
    return new Promise((resolve, reject) => {
        const router = createRouter();

        const { app, store } = createApp(null, router);


        store.replaceState(Object.assign(store.state,state));
        // Vue.prototype.$state = state;
        router.push(url);



        router.onReady(
            () => {
                const matchedComponents = router.getMatchedComponents();
                // no matched routes, reject with 404
                if (!matchedComponents.length) {
                    return reject({
                        app,
                        code: 404,
                        error: "not matched",
                        error_file_found: true
                    });
                }

                // the Promise should resolve to the app instance so it can be rendered
                resolve(app);
            },
            error => {
                reject({
                    app,
                    code: 500,
                    error
                });
            }
        );
    });
}
