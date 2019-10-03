module.exports = api => {
    api.extendPackage({
        dependencies: {
            "axios": "^0.19.0",
            "vue-server-renderer": "^2.6.10"
        }
    });

    api.render("./generator");
};
