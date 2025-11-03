# AWS EC2 Deployment Guide

This guide will help you deploy the Criminal Profiling System backend on an AWS EC2 instance.

## Prerequisites

1. An AWS account with EC2 access
2. An EC2 instance running Ubuntu 24.04 LTS (or similar)
3. SSH access to your EC2 instance
4. MongoDB instance (can be on the same EC2 or use MongoDB Atlas)

## Table of Contents

1. [EC2 Instance Setup](#1-ec2-instance-setup)
2. [Initial Server Configuration](#2-initial-server-configuration)
3. [Application Deployment](#3-application-deployment)
4. [MongoDB Setup](#4-mongodb-setup)
5. [Nginx Configuration](#5-nginx-configuration)
6. [SSL/TLS Setup (Optional)](#6-ssltls-setup-optional)
7. [Monitoring and Maintenance](#7-monitoring-and-maintenance)

## 1. EC2 Instance Setup

### Launch EC2 Instance

1. Go to AWS Console → EC2 → Launch Instance
2. Select **Ubuntu Server 24.04 LTS** AMI
3. Choose instance type (minimum: **t3.micro** for free tier, recommended: **t3.small** or larger)
4. Configure security group:
   - **SSH (22)** - Your IP only
   - **HTTP (80)** - 0.0.0.0/0 (or your IP)
   - **HTTPS (443)** - 0.0.0.0/0 (if using SSL)
   - **Custom TCP (3000)** - 127.0.0.1/32 (only localhost, for Nginx reverse proxy)
5. Launch instance and download/save your `.pem` key file

### Connect to EC2 Instance

```bash
# Replace with your key file path and EC2 public IP
ssh -i /path/to/your-key.pem ubuntu@your-ec2-public-ip
```

## 2. Initial Server Configuration

### Option A: Automated Setup (Recommended)

1. **Upload the setup script to your EC2 instance:**

```bash
# From your local machine
scp -i /path/to/your-key.pem deploy/ec2-setup.sh ubuntu@your-ec2-public-ip:~/
```

2. **Make the script executable and run it:**

```bash
# On EC2 instance
chmod +x ec2-setup.sh
./ec2-setup.sh
```

### Option B: Manual Setup

If you prefer to set up manually, install these dependencies:

```bash
# Update system
sudo apt-get update && sudo apt-get upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install MongoDB (if using local MongoDB)
sudo apt-get install -y gnupg
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update -y
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Nginx
sudo apt-get install -y nginx

# Install Git
sudo apt-get install -y git

# Configure Firewall
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp
sudo ufw --force enable
```

## 3. Application Deployment

### Method 1: Deploy from Git Repository (Recommended)

1. **Clone your repository:**

```bash
cd /var/www
sudo git clone https://github.com/your-username/your-repo.git criminal-profiling
sudo chown -R $USER:$USER criminal-profiling
cd criminal-profiling
```

2. **Configure environment variables:**

```bash
cp env.template .env
nano .env  # or use vim/vi
```

Update the `.env` file with your configuration:

```env
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb://root:your-password@localhost:27017/criminal-profiling?authSource=admin
```

If using MongoDB Atlas:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/criminal-profiling?retryWrites=true&w=majority
```

3. **Deploy the application:**

```bash
# Make deploy script executable
chmod +x deploy/deploy.sh

# Run deployment
./deploy/deploy.sh
```

### Method 2: Upload Files Manually

1. **Create application directory:**

```bash
sudo mkdir -p /var/www/criminal-profiling
sudo chown -R $USER:$USER /var/www/criminal-profiling
```

2. **Upload your project files** (using SCP, SFTP, or other method)

3. **Install dependencies and build:**

```bash
cd /var/www/criminal-profiling
npm ci --production
npm run build
```

4. **Configure environment variables** (same as Method 1)

5. **Start with PM2:**

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Run this once to enable auto-start on reboot
```

## 4. MongoDB Setup

### Option A: Local MongoDB (on same EC2 instance)

1. **Secure MongoDB:**

```bash
# Connect to MongoDB
mongosh

# Create admin user (if not exists)
use admin
db.createUser({
  user: "root",
  pwd: "your-secure-password",
  roles: [ { role: "root", db: "admin" } ]
})
exit
```

2. **Update MongoDB configuration:**

```bash
sudo nano /etc/mongod.conf
```

Make sure authentication is enabled:
```yaml
security:
  authorization: enabled
```

Restart MongoDB:
```bash
sudo systemctl restart mongod
```

3. **Update `.env` file** with your MongoDB credentials

### Option B: MongoDB Atlas (Cloud - Recommended for Production)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

## 5. Nginx Configuration

1. **Copy Nginx configuration:**

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/criminal-profiling
```

2. **Edit configuration** (replace `server_name _;` with your domain or remove it):

```bash
sudo nano /etc/nginx/sites-available/criminal-profiling
```

3. **Enable the site:**

```bash
sudo ln -s /etc/nginx/sites-available/criminal-profiling /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default site
```

4. **Test and reload Nginx:**

```bash
sudo nginx -t
sudo systemctl reload nginx
```

5. **Verify it's working:**

```bash
curl http://localhost
# or visit http://your-ec2-public-ip in your browser
```

## 6. SSL/TLS Setup (Optional but Recommended)

### Using Let's Encrypt (Free SSL)

1. **Install Certbot:**

```bash
sudo apt-get install -y certbot python3-certbot-nginx
```

2. **Obtain SSL certificate:**

```bash
sudo certbot --nginx -d your-domain.com
```

3. **Auto-renewal is set up automatically**, but test it:

```bash
sudo certbot renew --dry-run
```

## 7. Monitoring and Maintenance

### PM2 Commands

```bash
pm2 status                    # Check application status
pm2 logs criminal-profiling-api  # View logs
pm2 monit                     # Real-time monitoring
pm2 restart criminal-profiling-api  # Restart application
pm2 stop criminal-profiling-api    # Stop application
pm2 delete criminal-profiling-api   # Remove from PM2
pm2 save                      # Save current process list
```

### Application Logs

```bash
# PM2 logs
pm2 logs criminal-profiling-api

# Application logs
tail -f /var/www/criminal-profiling/logs/pm2-out.log
tail -f /var/www/criminal-profiling/logs/pm2-error.log

# Nginx logs
sudo tail -f /var/log/nginx/criminal-profiling-access.log
sudo tail -f /var/log/nginx/criminal-profiling-error.log
```

### Updating the Application

```bash
cd /var/www/criminal-profiling

# If using Git
git pull origin main
./deploy/deploy.sh

# Or manually
npm ci --production
npm run build
pm2 restart criminal-profiling-api
```

### Health Checks

- Application: `http://your-domain.com/health` or `http://your-ec2-ip/health`
- Swagger Docs: `http://your-domain.com/api` or `http://your-ec2-ip/api`

### Backup Strategy

1. **MongoDB Backup:**

```bash
# Local MongoDB backup
mongodump --uri="mongodb://root:password@localhost:27017/criminal-profiling?authSource=admin" --out=/backup/$(date +%Y%m%d)
```

2. **Application Backup:**

```bash
tar -czf app-backup-$(date +%Y%m%d).tar.gz /var/www/criminal-profiling
```

## Troubleshooting

### Application won't start

1. Check PM2 logs: `pm2 logs criminal-profiling-api`
2. Verify `.env` file exists and is configured correctly
3. Check MongoDB connection
4. Verify port 3000 is not in use: `sudo lsof -i :3000`

### Nginx 502 Bad Gateway

1. Verify application is running: `pm2 status`
2. Check Nginx error logs: `sudo tail -f /var/log/nginx/criminal-profiling-error.log`
3. Verify upstream in Nginx config points to correct port

### MongoDB Connection Issues

1. Check MongoDB is running: `sudo systemctl status mongod`
2. Verify connection string in `.env`
3. Check firewall rules for MongoDB port (if remote)
4. Test connection: `mongosh "your-connection-string"`

### Can't access from browser

1. Verify security group allows HTTP (80) and HTTPS (443)
2. Check UFW firewall: `sudo ufw status`
3. Verify Nginx is running: `sudo systemctl status nginx`

## Security Recommendations

1. **Never commit `.env` file to version control**
2. **Use strong MongoDB passwords**
3. **Limit SSH access to specific IPs in security group**
4. **Keep system and dependencies updated:**
   ```bash
   sudo apt-get update && sudo apt-get upgrade -y
   ```
5. **Enable MongoDB authentication**
6. **Use HTTPS in production (SSL/TLS)**
7. **Regular backups of database and application**

## Support

For issues or questions:
- Check application logs
- Review PM2 status
- Verify all configuration files
- Ensure all ports are properly configured

---

**Last Updated:** $(date)
**Version:** 1.0

