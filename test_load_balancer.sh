#!/bin/bash

# Number of request to send
REQUESTS=20

# URL of load balancer
URL="http://localhost:3000"

# Loop to send requests
for ((i=1; i<=REQUESTS; i++)); do
    curl "$URL" &
    sleep 0.1
done

wait
echo "All requests has been sent."