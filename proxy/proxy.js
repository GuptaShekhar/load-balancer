const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();


proxy.on('error', (err, req, res) => {
    res.writeHead(502);
    res.end('Bad Gateway')
})

module.exports = proxy;