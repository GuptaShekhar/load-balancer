const http = require('http')
const roundRobin = require('./algorithms/roundRobin')
const leastConnections = require('./algorithms/leastConnections');
const startHealthChecks = require('./health/healthCheck');
const servers = require('./state/serverState');
const getMetrics = require('./metrics/metrics');
const rateLimiter = require('./middleware/rateLimiter');


startHealthChecks(servers);

const loadBalancingAlgorithm = 'leastConnections';

const server = http.createServer((req, res) => {
    if (req.url == '/metrics') {
        res.writeHead(200, { 'content-type': 'application/json'});
        return res.end(JSON.stringify(getMetrics(servers)));
    }

    if (!rateLimiter(req, res)) return;

    if (loadBalancingAlgorithm == 'roundRobin') {
        roundRobin(servers, req, res);
    } else if (loadBalancingAlgorithm == 'leastConnections') {
        leastConnections(servers, req, res);
    } else {
        res.writeHead(500);
        return res.end('Load balancing algorithm is not supported.');
    }
})

server.listen(3000, ()=> {
    console.log('Load balancer is running on port: 3000');
})