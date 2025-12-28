const http = require('http')
const roundRobin = require('./algorithms/roundRobin')
const leastConnections = require('./algorithms/leastConnections')



const loadBalancingAlgorithm = 'leastConnections';

const server = http.createServer((req, res) => {
    if (loadBalancingAlgorithm == 'roundRobin') {
        roundRobin(servers, req, res);
    } else if (loadBalancingAlgorithm == 'leastConnections') {
        leastConnections(servers, req, res);
    } else {
        res.writeHead(500);
        res.end('Load balancing algorithm is not supported');
    }
})

server.listen(3000, ()=> {
    console.log('Load balancer is running on port: 3000');
})

module.exports = servers;