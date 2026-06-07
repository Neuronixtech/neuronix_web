#!/bin/bash

# Coolify Setup Script for Neuronix Project
# This script helps set up the project for deployment on Coolify

set -e

echo "🚀 Neuronix Coolify Setup Script"
echo "=================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "✅ Docker found"

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "⚠️  Docker Compose is not installed. Installing..."
    # Installation instructions can vary by OS
    echo "Please install Docker Compose from: https://docs.docker.com/compose/install/"
fi

# Validate Dockerfile exists
if [ ! -f "Dockerfile" ]; then
    echo "❌ Dockerfile not found in current directory"
    exit 1
fi

echo "✅ Dockerfile found"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ .env file created. Please update the values as needed."
    else
        echo "⚠️  .env.example not found. Creating basic .env..."
        echo "VITE_API_BASE_URL=/api" > .env
    fi
else
    echo "✅ .env file already exists"
fi

# Check if node_modules is needed for build
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm ci
    echo "✅ Dependencies installed"
fi

# Build the Docker image
echo "🐳 Building Docker image..."
docker build -t neuronix:latest .
echo "✅ Docker image built successfully"

# Optional: Run the container
read -p "Do you want to run the container now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Starting container..."
    docker run -p 3000:80 --name neuronix_dev neuronix:latest &
    echo "✅ Container started at http://localhost:3000"
    echo "To stop: docker stop neuronix_dev"
fi

echo ""
echo "=================================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your configuration"
echo "2. Push changes to your repository"
echo "3. Create a new service in Coolify"
echo "4. Connect your Git repository"
echo "5. Deploy!"
echo ""
echo "For more details, see DEPLOYMENT.md"
