module.exports = api => {
    api.extendPackage({
        dependencies: {
            "axios": "^0.19.0",
            "vue-server-renderer": "^2.6.10"
        }
    });

    api.render("../template");

    api.exitLog("Vue PathPHP plugin successfully installed \n\n","done");

    api.exitLog("To try the server side rendering, run \n","info");
    api.exitLog("yarn build \n","log");

    api.exitLog("./path start server \n\n","log");

    api.exitLog("To run from client side, run \n","info");
    api.exitLog("yarn serve\n","log");

};
