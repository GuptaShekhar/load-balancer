const http = require('http');
const servers = require('./state/serverState')

const createServer = (host, port, timeout) => {

    http.createServer((req, res) => {
        setTimeout(() => {
            res.writeHead(200);
            res.end(`Server response from port: ${port}`)
        }, timeout);

    }).listen(port, host, () => {
        console.log(`Server is running at http://${host}:${port}`)
    })

}


servers.forEach(server => createServer(server.host, server.port, server.timeout));