# Complete AWS EC2 Deployment Guide - Step by Step

This guide will walk you through deploying your Criminal Profiling System backend to AWS EC2 from start to finish.

## Table of Contents

1. [Launch EC2 Instance](#1-launch-ec2-instance)
2. [Configure Security Group](#2-configure-security-group)
3. [Connect to EC2 Instance](#3-connect-to-ec2-instance)
4. [Initial Server Setup](#4-initial-server-setup)
5. [Deploy Application](#5-deploy-application)
6. [Configure MongoDB](#6-configure-mongodb)
7. [Configure Nginx](#7-configure-nginx)
8. [Test Deployment](#8-test-deployment)
9. [Optional: Setup SSL/HTTPS](#9-optional-setup-sslhttps)
10. [Maintenance Commands](#10-maintenance-commands)

---

## 1. Launch EC2 Instance

### Step 1.1: Configure Name and Tags

On the AWS EC2 Launch Instance page:

1. **Name**: Enter a descriptive name like `criminal-profiling-backend` or `seekoid-api`

### Step 1.2: Application and OS Images (AMI)

1. **Select**: Keep **Ubuntu Server 24.04 LTS** selected (as shown in your current page)
2. **Architecture**: Choose **64-bit (x86)** (unless you specifically need Arm)
3. **Note**: Make sure it shows "Free tier eligible" if you want to stay within free tier limits

### Step 1.3: Instance Type

1. Click **"Choose instance type"** or scroll down
2. Select:
   - **t3.micro** (1 vCPU, 1 GB RAM) - Free tier eligible
   - **t3.small** (2 vCPU, 2 GB RAM) - Recommended for production ($0.0208/hour)
   - **t3.medium** (2 vCPU, 4 GB RAM) - For higher load

**Note**: For development/testing, t3.micro is fine. For production with MongoDB on the same instance, consider t3.small or larger.

### Step 1.4: Key Pair (Login)

1. In the **Key pair (login)** section:
   - If you have an existing key pair: Select it from the dropdown
   - If you need a new key pair: Click **"Create new key pair"**
     - Name: `criminal-profiling-key` (or any name)
     - Key pair type: **RSA**
     - Private key file format: **.pem** (for Linux/Mac) or **.ppk** (for Windows PuTTY)
   - **IMPORTANT**: Download and save the `.pem` file securely! You won't be able to download it again.

### Step 1.5: Network Settings

Click **"Edit"** next to Network settings:

1. **VPC**: Keep default (or select your VPC)
2. **Subnet**: Keep default
3. **Auto-assign Public IP**: Enable (important!)
4. **Firewall (Security group)**: Select **"Create security group"**
5. **Security group name**: `criminal-profiling-sg`

6. **Inbound security group rules**: Add the following:

   | Type | Protocol | Port Range | Source | Description |
   |------|----------|------------|--------|-------------|
   | SSH | TCP | 22 | My IP | SSH access from your IP |
   | HTTP | TCP |8 0 | 0.0.0.0/0 | Web access |
   | HTTPS | TCP | 443 | 0.0.0.0/0 | Secure web access |
   | Custom TCP | TCP | 3000 | 127.0.0.1/32 | App port (localhost only) |

   **Note**: For SSH, click "My IP" to automatically add your IP, or manually enter it for better security.

### Step 1.6: Configure Storage

1. **Volume size**: 8 GiB is fine for free tier, 20-30 GiB recommended for production
2. **Volume type**: gp3 (General Purpose SSD)
3. Click **"Advanced options"** if you want to add User Data script (optional)

### Step 1.7: Launch Instance

1. Review your settings in the **Summary** panel on the right
2. Click **"Launch instance"**
3. Wait for the instance to be created (usually 1-2 minutes)
4. Click **"View all instances"** or go to EC2 Dashboard

---

## 2. Configure Security Group

After the instance is launched:

1. Go to **EC2 Dashboard** → **Instances**
2. Select your instance
3. Go to **Security** tab → Click on the **Security group** link
4. **Edit inbound rules** if needed:
   - Ensure SSH (22) is restricted to your IP
   - HTTP (80) and HTTPS (443) are open to 0.0.0.0/0 (or specific IPs)
   - Port 3000 should only allow 127.0.0.1/32 (localhost)

---

## 3. Connect to EC2 Instance

### For Windows (PowerShell or Command Prompt):

```powershell
# Navigate to the folder where your .pem file is located
cd C:\path\to\your\key\file

# Connect (replace with your actual values)
ssh -i criminal-profiling-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

**Note**: If you get permission errors, you may need to:
1. Use Windows Subsystem for Linux (WSL)
2. Or use PuTTY with the .ppk format key
3. Or use AWS Systems Manager Session Manager

### For Mac/Linux:

```bash
# Set proper permissions on the key file
chmod 400 criminal-profiling-key.pem

# Connect
ssh -i criminal-profiling-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

**To find your EC2 Public IP**:
- Go to EC2 Dashboard → Instances
- Find your instance → Check the **Public IPv4 address** column

---

## 4. Initial Server Setup

### Step 4.1: Upload Setup Script

**From your local machine** (in PowerShell or Terminal):

```powershell
# Navigate to your project directory
cd "C:\Geekonomy Projects\Criminal-Profiling-System-using-mongodb\seekoid-demo"

# Upload the setup script
scp -i path/to/criminal-profiling-key.pem deploy/ec2-setup.sh ubuntu@YOUR_EC2_PUBLIC_IP:~/
```

### Step 4.2: Run Setup Script

**On EC2 instance** (via SSH):

```bash
# Make script executable
chmod +x ec2-setup.sh

# Run the setup script
./ec2-setup.sh
```

This script will install:
- Node.js 20.x
- PM2 (Process Manager)
- MongoDB 7.0
- Nginx
- Git
- Firewall configuration

**Wait 5-10 minutes** for the setup to complete.

### Step 4.3: Verify Installation

```bash
# Check Node.js
node --version  # Should show v20.x.x
npm --version

# Check PM2
pm2 --version

# Check MongoDB
mongod --version

# Check Nginx
nginx -v
```

---

## 5. Deploy Application

### Option A: Deploy from Git Repository (Recommended)

**On EC2 instance:**

```bash
# Create application directory
cd /var/www

# Clone your repository (replace with your actual repo URL)
sudo git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git criminal-profiling

# If repository is private, you may need to set up SSH keys or use HTTPS with token

# Set ownership
sudo chown -R $USER:$USER criminal-profiling

# Navigate to project
cd criminal-profiling/seekoid-demo
```

**Note**: If your repo structure has `seekoid-demo` as a subdirectory, adjust the path accordingly.

### Option B: Upload Files Manually

**From your local machine:**

```powershell
# Upload entire project directory
scp -r -i path/to/criminal-profiling-key.pem seekoid-demo ubuntu@YOUR_EC2_PUBLIC_IP:/var/www/criminal-profiling/

# Or upload specific files using SFTP client like WinSCP, FileZilla, etc.
```

**On EC2 instance:**

```bash
# Ensure proper ownership
sudo chown -R $USER:$USER /var/www/criminal-profiling
cd /var/www/criminal-profiling/seekoid-demo
```

### Step 5.1: Configure Environment Variables

**On EC2 instance:**

```bash
# Copy template
cp env.template .env

# Edit the .env file
nano .env
```

**Update `.env` file with your configuration:**

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# MongoDB Configuration
# For LOCAL MongoDB (on same EC2):
MONGODB_URI=mongodb://root:YOUR_SECURE_PASSWORD@localhost:27017/criminal-profiling?authSource=admin

# For MongoDB Atlas (Cloud - Recommended):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/criminal-profiling?retryWrites=true&w=majority
```

**Save and exit**: `Ctrl + X`, then `Y`, then `Enter`

### Step 5.2: Run Deployment Script

```bash
# Make deploy script executable
chmod +x deploy/deploy.sh

# Run deployment
./deploy/deploy.sh
```

This script will:
- Install dependencies (`npm ci --production`)
- Build the application (`npm run build`)
- Start the application with PM2
- Show you the status

**Expected output**: You should see "Deployment Complete!" and PM2 status showing the app as "online"

### Step 5.3: Verify Application is Running

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs criminal-profiling-api

# Test the application
curl http://localhost:3000/health
```

You should see a response from the health endpoint.

---

## 6. Configure MongoDB

### Option A: Local MongoDB (On EC2 Instance)

**On EC2 instance:**

```bash
# Connect to MongoDB
mongosh
```

**In MongoDB shell:**

```javascript
// Switch to admin database
use admin

// Create admin user (replace 'YOUR_SECURE_PASSWORD' with a strong password)
db.createUser({
  user: "root",
  pwd: "YOUR_SECURE_PASSWORD",
  roles: [ { role: "root", db: "admin" } ]
})

// Exit
exit
```

**Configure MongoDB to require authentication:**

```bash
# Edit MongoDB config
sudo nano /etc/mongod.conf
```

Find the `security:` section and add/update:

```yaml
security:
  authorization: enabled
```

**Restart MongoDB:**

```bash
sudo systemctl restart mongod
sudo systemctl status mongod
```

**Test connection:**

```bash
# Test connection with authentication
mongosh "mongodb://root:YOUR_SECURE_PASSWORD@localhost:27017/criminal-profiling?authSource=admin"
```

**Update `.env` file** with the MongoDB credentials you just created.

### Option B: MongoDB Atlas (Cloud - Recommended for Production)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login
3. Create a new cluster (Free tier available)
4. Create a database user
5. Whitelist your EC2 IP address (Security → Network Access)
6. Get connection string (Database → Connect → Drivers)
7. Update `MONGODB_URI` in your `.env` file on EC2

**Update `.env` on EC2:**

```bash
nano /var/www/criminal-profiling/seekoid-demo/.env
```

Paste your Atlas connection string.

**Restart the application:**

```bash
cd /var/www/criminal-profiling/seekoid-demo
pm2 restart criminal-profiling-api
```

---

## 7. Configure Nginx

**On EC2 instance:**

```bash
# Copy Nginx configuration
sudo cp /var/www/criminal-profiling/seekoid-demo/deploy/nginx.conf /etc/nginx/sites-available/criminal-profiling

# Edit configuration (optional - to set server_name)
sudo nano /etc/nginx/sites-available/criminal-profiling
```

**If you have a domain name**, replace `server_name _;` with your domain:
```
server_name yourdomain.com www.yourdomain.com;
```

**Otherwise**, leave it as `server_name _;` (accepts all domains).

**Enable the site:**

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/criminal-profiling /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx

# Check Nginx status
sudo systemctl status nginx
```

---

## 8. Test Deployment

### Step 8.1: Test from EC2 Instance

```bash
# Test application directly
curl http://localhost:3000/health

# Test through Nginx
curl http://localhost/health

# Test Swagger docs
curl http://localhost/api
```

### Step 8.2: Test from Your Browser

1. Get your **EC2 Public IP** from AWS Console
2. Open browser and visit:
   - `http://YOUR_EC2_PUBLIC_IP/health`
   - `http://YOUR_EC2_PUBLIC_IP/api` (Swagger documentation)
   - `http://YOUR_EC2_PUBLIC_IP/` (API root)

**If you can't access:**
- Check Security Group allows HTTP (80) from your IP
- Check UFW firewall: `sudo ufw status`
- Check PM2 is running: `pm2 status`
- Check Nginx is running: `sudo systemctl status nginx`

---

## 9. Optional: Setup SSL/HTTPS

### Using Let's Encrypt (Free SSL Certificate)

**Prerequisites**: You need a domain name pointing to your EC2 IP.

**On EC2 instance:**

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Obtain SSL certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (recommended)
```

**Test auto-renewal:**

```bash
sudo certbot renew --dry-run
```

**Your site will now be accessible at `https://yourdomain.com`**

---

## 10. Maintenance Commands

### PM2 Commands (Process Management)

```bash
# Check application status
pm2 status

# View logs
pm2 logs criminal-profiling-api

# View last 50 lines of logs
pm2 logs criminal-profiling-api --lines 50

# Restart application
pm2 restart criminal-profiling-api

# Stop application
pm2 stop criminal-profiling-api

# Delete from PM2
pm2 delete criminal-profiling-api

# Save current process list (auto-start on reboot)
pm2 save

# Monitor in real-time
pm2 monit
```

### Application Updates

**On EC2 instance:**

```bash
cd /var/www/criminal-profiling/seekoid-demo

# If using Git:
git pull origin main
./deploy/deploy.sh

# Or manually:
npm ci --production
npm run build
pm2 restart criminal-profiling-api
```

### View Logs

```bash
# PM2 logs
pm2 logs criminal-profiling-api

# Application logs (if configured)
tail -f /var/www/criminal-profiling/seekoid-demo/logs/pm2-out.log
tail -f /var/www/criminal-profiling/seekoid-demo/logs/pm2-error.log

# Nginx logs
sudo tail -f /var/log/nginx/criminal-profiling-access.log
sudo tail -f /var/log/nginx/criminal-profiling-error.log
```

### System Status Checks

```bash
# Check application
pm2 status
curl http://localhost:3000/health

# Check Nginx
sudo systemctl status nginx

# Check MongoDB (if local)
sudo systemctl status mongod

# Check disk space
df -h

# Check memory
free -h

# Check running processes
top
```

---

## Troubleshooting

### Application Won't Start

```bash
# Check PM2 logs
pm2 logs criminal-profiling-api --lines 100

# Verify .env file exists and is configured
cat /var/www/criminal-profiling/seekoid-demo/.env

# Check if port 3000 is in use
sudo lsof -i :3000

# Test MongoDB connection
mongosh "YOUR_MONGODB_URI"
```

### Nginx 502 Bad Gateway

```bash
# Verify application is running
pm2 status

# Check Nginx error logs
sudo tail -f /var/log/nginx/criminal-profiling-error.log

# Verify upstream in Nginx config
sudo cat /etc/nginx/sites-available/criminal-profiling | grep upstream

# Restart both services
pm2 restart criminal-profiling-api
sudo systemctl restart nginx
```

### Can't Access from Browser

```bash
# Check Security Group in AWS Console allows HTTP (80)

# Check UFW firewall
sudo ufw status

# If needed, allow HTTP
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload

# Check Nginx is running
sudo systemctl status nginx

# Test locally first
curl http://localhost/health
```

### MongoDB Connection Issues

```bash
# Check MongoDB status (if local)
sudo systemctl status mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log

# Test connection string
mongosh "YOUR_MONGODB_URI"

# Verify .env file
cat /var/www/criminal-profiling/seekoid-demo/.env | grep MONGODB
```

---

## Security Checklist

- [ ] SSH access restricted to your IP only in Security Group
- [ ] Strong MongoDB password set
- [ ] `.env` file not committed to Git
- [ ] UFW firewall enabled
- [ ] Nginx security headers configured
- [ ] HTTPS/SSL enabled (for production)
- [ ] Regular backups configured
- [ ] System updates installed regularly

---

## Next Steps

1. **Set up backups**: Configure automated MongoDB backups
2. **Domain name**: Point your domain to EC2 IP
3. **Monitoring**: Set up CloudWatch alarms
4. **Auto-scaling**: Configure auto-scaling if needed
5. **CI/CD**: Set up automated deployment pipeline

---

## Quick Reference

### Access Your Application

- **API**: `http://YOUR_EC2_IP/`
- **Health Check**: `http://YOUR_EC2_IP/health`
- **Swagger Docs**: `http://YOUR_EC2_IP/api`
- **HTTPS** (if configured): `https://yourdomain.com`

### Important File Locations

- **Application**: `/var/www/criminal-profiling/seekoid-demo/`
- **Environment**: `/var/www/criminal-profiling/seekoid-demo/.env`
- **Nginx Config**: `/etc/nginx/sites-available/criminal-profiling`
- **PM2 Config**: `/var/www/criminal-profiling/seekoid-demo/ecosystem.config.js`
- **Logs**: `/var/www/criminal-profiling/seekoid-demo/logs/`

---

**Congratulations!** Your Criminal Profiling System backend is now deployed on AWS EC2! 🎉

If you encounter any issues, check the logs and troubleshooting section above.

