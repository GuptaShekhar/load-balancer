const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();

const leastConnections = (servers, req, res) => {
    let target = servers[0];
    // using forEach will cause rece conditions as forEach is async method
    for (const server of servers) {
        if (server.connections < target.connections) {
            target = server;
        }
    }
    target.connections++;
    console.log(`Routing to ${target.port}, active connections: ${target.connections}`);
    
    proxy.web(req, res, { target: `http://${target.host}:${target.port}` });

    res.once('close', cleanUp);
    res.once('finish', cleanUp);
    res.once('errors', cleanUp);

    function cleanUp() {
        if (target.connections > 0) {
            target.connections--;
            console.log(`Completed ${target.port}, active: ${target.connections}`);
        }
    };
}


module.exports = leastConnections