const http = require('http');
const routes = require('../routes');
const Express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')

//const errorHandler = require('../middleware/errorhandler')

const app = new Express();

class ExpressServer {

    constructor() {
        app.use(bodyParser.json());
        app.use(Express.urlencoded({ extended: true }));
        app.use(Express.static(__dirname + '/../../client_end/')); // Setting directory for css and js
<<<<<<< HEAD
        app.use(fileUpload());
        console.log("Constructor running");
=======
        // console.log("Constructor running");
>>>>>>> bfd779caed8cb07c68c89c989dab581b50d8ecab
    }

    router(routes) {
        routes(app);
        return this;
    }

    listen(port = process.env.PORT || 3000) {
        const welcome = (p) => () =>
            console.log(
                `up and running in ${
            process.env.NODE_ENV || 'development'
            } @: ${os.hostname()} on port: ${p}}`
            );
        http.createServer(app).listen(port, welcome(port));
        return app;
    }
}

module.exports = ExpressServer;