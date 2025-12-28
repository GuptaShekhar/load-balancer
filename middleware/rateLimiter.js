const requests = {};

const rateLimiter = (req, res, limit = 50) => {
    const ip = req.socket.remoteAddress;
    console.log('ip: ', ip)
    requests[ip] = (requests[ip] || 0) + 1;

    setTimeout(()=> requests[ip]--, 60000);

    if (requests[ip] > limit) {
        res.writeHead(429);
        res.end(`Too many requests`);
        return false;
    }

    return true;
}

module.exports = rateLimiter;