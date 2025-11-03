#!/bin/bash

# Deployment Script for Criminal Profiling System
# Run this script after initial EC2 setup to deploy/update the application

set -e

APP_DIR="/var/www/criminal-profiling"
APP_NAME="criminal-profiling-api"

echo "=========================================="
echo "Deploying Criminal Profiling System"
echo "=========================================="

# Navigate to application directory
cd $APP_DIR

# Pull latest code (if using git)
echo "Pulling latest code..."
if [ -d .git ]; then
    git pull origin main || git pull origin master
else
    echo "Git repository not found. Skipping git pull."
fi

# Install/update dependencies
echo "Installing dependencies..."
npm ci --production

# Build the application
echo "Building application..."
npm run build

# Check if .env file exists
if [ ! -f .env ]; then
    echo "WARNING: .env file not found!"
    echo "Please copy env.template to .env and configure it:"
    if [ -f env.template ]; then
        echo "  cp env.template .env"
    elif [ -f .env.example ]; then
        echo "  cp .env.example .env"
    fi
    echo "  nano .env"
    exit 1
fi

# Stop existing PM2 process (if running)
echo "Stopping existing PM2 process..."
pm2 stop $APP_NAME || echo "No existing process to stop"
pm2 delete $APP_NAME || echo "No existing process to delete"

# Start application with PM2
echo "Starting application with PM2..."
pm2 start ecosystem.config.js

# Save PM2 process list
echo "Saving PM2 process list..."
pm2 save

# Show PM2 status
echo "PM2 Status:"
pm2 status

# Show logs
echo "=========================================="
echo "Recent application logs:"
pm2 logs $APP_NAME --lines 20 --nostream

echo "=========================================="
echo "Deployment Complete!"
echo "=========================================="
echo "Application is running on: http://localhost:3000"
echo "Swagger documentation: http://localhost:3000/api"
echo ""
echo "Useful commands:"
echo "  pm2 status              - Check application status"
echo "  pm2 logs $APP_NAME     - View application logs"
echo "  pm2 restart $APP_NAME  - Restart application"
echo "  pm2 stop $APP_NAME     - Stop application"
echo "=========================================="

