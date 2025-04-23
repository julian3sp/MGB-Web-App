#!/bin/sh

# Log environment variables
echo "Starting with environment:"
echo "PORT: $PORT"
echo "BACKEND_PORT: $BACKEND_PORT"
echo "NODE_ENV: $NODE_ENV"
echo "Database: $POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB"


# Start the backend server in the background
echo "Starting backend..."
cd /app/apps/backend
PORT=$BACKEND_PORT yarn docker:run &
BACKEND_PID=$!

yarn workspace database push
yarn workspace database seed

# Handle signals properly
trap "kill $BACKEND_PID; exit" SIGINT SIGTERM

# Start nginx in the foreground
echo "Starting nginx..."
nginx -g "daemon off;"
