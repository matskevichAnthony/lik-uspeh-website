#!/bin/bash

echo "🚀 Starting development servers..."

# Start Decap CMS local backend in background
echo "📁 Starting Decap CMS local backend on port 8081..."
npx decap-server &
DECAP_PID=$!

# Wait a moment for the backend to start
sleep 3

# Start Hugo server in background
echo "🏗️ Starting Hugo server on port 1320..."
hugo server --buildDrafts --buildFuture --bind=0.0.0.0 --port=1320 --disableFastRender &
HUGO_PID=$!

echo ""
echo "✅ Development servers started!"
echo "🌐 Website: http://localhost:1320"
echo "⚙️ Admin Panel: http://localhost:1320/admin/"
echo "🔧 Decap Backend: http://localhost:8081"
echo ""
echo "Press Ctrl+C to stop all servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $DECAP_PID 2>/dev/null
    kill $HUGO_PID 2>/dev/null
    echo "✅ All servers stopped"
    exit 0
}

# Trap Ctrl+C
trap cleanup INT

# Wait for both processes
wait