const http = require('http');

const startHealthChecks = (servers, interval = 5000) => {
    setInterval(() => {
        servers.forEach(server => {
            const req = http.get(
                `http://${server.host}:${server.port}`,
                (res) => {
                    console.log('Info=> Health check api status:', res.statusCode);
                    if (res.statusCode == 200) {
                        server.healthy = true,
                        server.failureCount = 0;
                    } else {
                        server.healthy = false;
                        server.failureCount++;
                    }

                    res.resume();
                }
            );

            req.on('error', () => {
                console.error('Error=> Health check api is down')
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