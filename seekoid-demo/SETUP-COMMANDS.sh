#!/bin/bash

# AWS EC2 Initial Setup Script for Criminal Profiling System
# This script sets up the EC2 instance with all required dependencies

set -e

echo "=========================================="
echo "Starting EC2 Setup for Criminal Profiling System"
echo "=========================================="

# Update system packages
echo "Updating system packages..."
sudo apt-get update -y
sudo apt-get upgrade -y

# Install Node.js 20.x (LTS)
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify Node.js and npm installation
echo "Verifying Node.js installation..."
node --version
npm --version

# Install PM2 globally for process management
echo "Installing PM2..."
sudo npm install -g pm2

# Install MongoDB (if running MongoDB on same instance)
echo "Installing MongoDB..."
sudo apt-get install -y gnupg
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update -y
sudo apt-get install -y mongodb-org

# Start and enable MongoDB
echo "Starting MongoDB..."
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Nginx (for reverse proxy)
echo "Installing Nginx..."
sudo apt-get install -y nginx

# Install Git
echo "Installing Git..."
sudo apt-get install -y git

# Install UFW (Firewall) if not present
echo "Setting up firewall..."
sudo apt-get install -y ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp
sudo ufw --force enable

# Create application directory
echo "Creating application directory..."
sudo mkdir -p /var/www/criminal-profiling
sudo chown -R $USER:$USER /var/www/criminal-profiling

# Create logs directory
echo "Creating logs directory..."
mkdir -p /var/www/criminal-profiling/logs

# Set up PM2 startup script
echo "Setting up PM2 startup script..."
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp /home/$USER

echo "=========================================="
echo "EC2 Setup Complete!"
echo "=========================================="
echo "Next steps:"
echo "1. Configure MongoDB (if using local MongoDB)"
echo "2. Clone your repository to /var/www/criminal-profiling"
echo "3. Copy env.template to .env and configure it"
echo "4. Run npm install"
echo "5. Run npm run build"
echo "6. Start the application with PM2: pm2 start ecosystem.config.js"
echo "7. Save PM2 process list: pm2 save"
echo "=========================================="

