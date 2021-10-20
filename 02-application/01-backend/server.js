const http = require('http');
const debug = require('debug')('node-angular');
const app = require('./app');


const normalizePort = val => {
    var port_number = parseInt(val, 10);

    if (isNaN(port_number)) {
        return val;
    }

    if (port_number >= 0) {
        return port_number;
    }

    return false;
};

const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    switch (error.code) {
        case "EACCESS":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
        case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
        default:
        throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    debug("Listening on " + bind);
}

const port = normalizePort(process.env.PORT || "3000");
app.set('port', port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
