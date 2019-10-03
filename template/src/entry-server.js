import main from "./main-server"
import renderToString from "vue-server-renderer/basic";
const route = context.route;
const state = context.state;

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


