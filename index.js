const  generator = require("vue-route-generator");
const fs = require('fs')

module.exports = (api,option) => {
    api.registerCommand(
        'generate-routes',
        {
            description: 'generates route',
            usage: 'vue-cli-service generate-routes'
        },
        () => {
            console.log('\n ⚙ Generating Routes\n')

            const  generateRoutes = generator.generateRoutes;

            const code_client = generateRoutes({
                pages: './src/pages/',
                dynamicImport: true
            })

            const code_server = generateRoutes({
                pages: './src/pages/',
                chunkNamePrefix: 'server-',
                dynamicImport: false
            });

            fs.writeFileSync('./src/router/routes-client.js', code_client);
            fs.writeFileSync('./src/router/routes-server.js', code_server);
            console.log('\n ✅ Routes generated \n')
        }
    )
}
