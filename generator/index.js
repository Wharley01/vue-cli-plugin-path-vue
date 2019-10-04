module.exports = api => {
    api.extendPackage({
        dependencies: {
            "axios": "^0.19.0",
            "vue-server-renderer": "^2.6.10"
        }
    });

    api.render("../template");

    api.exitLog("plugin successfully installed \n","done");
    console.log("To try the server side rendering, run \n");
    console.info("yarn build \n");
    console.info("./path start server \n");
    console.log("To run from client side, run \n\n");
    console.info("yarn serve\n");


};
