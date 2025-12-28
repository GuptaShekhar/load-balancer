const serverConfig = require('../config.json').servers


const servers = serverConfig.map(server => ({
    ...server,
    connections: 0,
    healthy: true,
    failureCount: 0
}));

module.exports = servers