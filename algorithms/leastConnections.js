const proxy = require('../proxy/proxy')

const leastConnections = (servers, req, res) => {
    const healthy = servers.filter(server => server.healthy);
    if (!healthy.length) {
        res.writeHead(503);
        return res.end('No healthy backend server found!');
    }

    let target = healthy[0];
    // using forEach will cause rece conditions as forEach is async method
    for (const server of healthy) {
        if (server.connections < target.connections) {
            target = server;
        }
    }
    target.connections++;

    const startTime = Date.now();
    console.log(`Routing to ${target.port}, active connections: ${target.connections}`);
    proxy.web(req, res, { target: `http://${target.host}:${target.port}` });

    res.once('close', cleanUp);
    // Prevent leaked connections
    res.once('finish', cleanUp);

    function cleanUp() {
        // Prevent negative counters
        if (target.connections > 0) {
            target.connections--;
            target.latency = Date.now() - startTime;
            console.log(`Completed ${target.port}, active: ${target.connections}`);
        }
    };
}


module.exports = leastConnections