const routes = require('./routes');

class Router {
    routes = [];
    
    add = (route) => {
        this.routes.push(route);
    }
    
    addRoutes = (routes) => {
        this.routes = this.routes.concat(routes);
    }

    register = (server) => {
        for (let route of this.routes) {
            server.route(route);
        }
    }
}

const router = new Router();

router.addRoutes(routes);

module.exports = router;