const Hapi = require("@hapi/hapi");
const dotenv = require('dotenv');
const router = require('./src/router');
const { Ruleset } = require("./src/utils/ruleset.utils");
dotenv.config()

const startServer = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
    });
    router.register(server);

    await server.start();
    // its an empty one, but we can load it here and update before anything
    server.app.fees_ruleset = new Ruleset();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

startServer();