const http = require('http');

const startHealthChecks = (servers, interval = 5000) => {
    setInterval(() => {
        servers.forEach(server => {
            const req = http.get(
                `http://${server.host}:${server.port}`,
                () => server.healthy = true
            );

            req.on('error', () => {
                server.healthy = false;
                server.failureCount++;
            });

            req.setTimeout(1000, () => {
                server.healthy = false;
                server.failureCount++;
                req.destroy();
            });
        });
    }, interval);
}

module.exports = startHealthChecks;