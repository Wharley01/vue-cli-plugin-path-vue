import c from "chalk"
module.exports = api => {
    api.extendPackage({
        dependencies: {
            "axios": "^0.19.0",
            "vue-server-renderer": "^2.6.10"
        }
    });

    api.render("../template");
    api.exitLog("plugin successfully installed \n","done");
    api.onCreateComplete = () => {
        console.log(c.blue.bold(" >> To try the server side rendering, run \n"));
        console.info(c.green.bold(" $ yarn build "));
        console.info(c.green.bold(" $ ./path start server"));
        console.log(c.blue.bold(" >> To run from client side, run \n"));
        console.info(c.green.bold("yarn serve\n"));
    }



};
