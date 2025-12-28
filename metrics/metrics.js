const getMetrics = servers => ({
    servers: servers.map(s => ({
      port: s.port,
      healthy: s.healthy,
      connections: s.connections,
      latency: s.latency
    }))
  });
  
  module.exports = getMetrics;
  