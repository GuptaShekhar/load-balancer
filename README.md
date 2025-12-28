# 🚦 Node.js Load Balancer (Learning Project)

A simple **HTTP load balancer built using Node.js and `http-proxy`** to understand how load balancing works internally.  
This project focuses on core concepts such as request routing, connection tracking, rate limiting, and observability.

---

## 📌 Overview

- Load balancer runs on **port `3000`**
- Backend servers are created using **Node.js `http` module**
- Requests are proxied using **`http-proxy`**
- Backend servers are configurable via `config.json`
- Implements **Round Robin** and **Least Connections** algorithms
- Includes **rate limiting** and **basic metrics**
- Traffic is generated using a **shell script**

---

## 🏗 Architecture

---

## Project Structure
```
.
├── server.js # Load balancer entry point
├── backendServer.js # Backend server implementation
├── config.json # Backend server configuration
├── algorithms/
|   ├──roundRobin.js # Round-robin load balancing
|   └───leastConnections.js # Least-connections load balancing
├── heath/
│ ├── healthCheck.js # health check logic
├── middleware/
│ ├── rateLimiter.js # IP-based rate limiting
|── metrics/
│ └── metrics.js # Basic request metrics
└── test_load_balancer.sh # Load testing script
```


---

## Backend Servers

Backend servers are simple HTTP servers created using Node’s `http` module.

### Configuration (`config.json`)

```json
{
  "servers": [
    { "host": "localhost", "port": 3001, "timeout": 500 },
    { "host": "localhost", "port": 3002, "timeout": 800 },
    { "host": "localhost", "port": 3003, "timeout": 200 },
    { "host": "localhost", "port": 3004, "timeout": 300 }
  ]
}
```

Each server simulates processing time using setTimeout.

## Start backend servers
```bash
node backendServer.js
```

## Load Balancer

The load balancer listens on port 3000 and routes requests to healthy backend servers.

Start load balancer
```bash
node server.js
```

Responsibilities:

- Select backend using configured algorithm
- Track active connections
- Enforce rate limiting
- Record metrics
- Skip unhealthy servers

## Load Balancing Algorithms
### Round Robin (roundRobin.js)
- Distributes requests sequentially
- Simple and deterministic
- No load awareness

### Least Connections (leastConnections.js)
- Routes to the server with the fewest active connections
- Better for uneven response times
- Uses in-memory connection counters

## Health Checks

Implemented in health/healthCheck.js.

- Periodically pings backend servers
- Marks servers as healthy / unhealthy
- Unhealthy servers are excluded from routing
- Failure count increases on timeout or error
- This simulates basic failover behavior.

## Rate Limiting

Implemented in middleware/rateLimiter.js.

- IP-based in-memory rate limiter
- Protects the load balancer from request floods
- Returns HTTP 429 when limit is exceeded
- Designed as middleware-style logic for vanilla Node.js