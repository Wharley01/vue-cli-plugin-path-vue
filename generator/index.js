const chalk = require("chalk");
const fs = require('fs')

//vue-cli-service generate-routes
module.exports = api => {
    api.extendPackage({
        scripts:{
            "serve": "vue-cli-service generate-routes && vue-cli-service serve",
            "build": "vue-cli-service generate-routes && vue-cli-service build"
        },
        dependencies: {
            "axios": "^0.19.0",
            "chalk": "^2.4.2",
            "vue-server-renderer": "^2.6.10",
            "vuex-router-sync": "^5.0.0"
        },
        devDependencies: {
            "vue-route-generator": "^0.4.1"
        }
    });

    api.render("../template");
    api.exitLog("plugin successfully installed \n","done");

    api.onCreateComplete(() => {

        console.log(chalk.blue.bold("\n\n >> To try the server side rendering, run \n"));
        console.info(chalk.green.bold(" $ yarn build "));
        console.info(chalk.green.bold(" $ ./__path start server\n"));
        console.log(chalk.blue.bold(" >> To run from client side, run \n"));
        console.info(chalk.green.bold(" $ yarn serve\n\n"));

    })



};
