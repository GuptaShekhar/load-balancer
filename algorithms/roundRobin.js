const proxy = require('../proxy/proxy')

let current = 0;

const roundRobin = (servers, req, res) => {
    const healthy = servers.filter( server => server.healthy);
    if (!healthy.length) {
        res.writeHead(503);
        return res.end('No healthy backend server found!');
    }
    const target = healthy[current];
    current = (current + 1) % healthy.length;

    const startTime = Date.now();
    console.log(`Routing to port: ${target.port}`);
    proxy.web(req, res, { target: `http://${target.host}:${target.port}` });
    
    // metrics
    target.latency = Date.now() - startTime;
}

module.exports = roundRobin