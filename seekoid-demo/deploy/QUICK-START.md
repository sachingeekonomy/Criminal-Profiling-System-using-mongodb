# Quick Start Guide - AWS EC2 Deployment

This is a condensed guide for quickly deploying the application. For detailed instructions, see [DEPLOYMENT.md](../DEPLOYMENT.md).

## Prerequisites Checklist

- [ ] EC2 instance running Ubuntu 24.04 LTS
- [ ] Security group configured (SSH, HTTP, HTTPS)
- [ ] SSH access to EC2 instance
- [ ] MongoDB connection (local or Atlas)

## Step 1: Initial EC2 Setup

```bash
# Connect to your EC2 instance
ssh -i /path/to/your-key.pem ubuntu@your-ec2-ip

# Upload setup script
# From your local machine:
scp -i /path/to/your-key.pem deploy/ec2-setup.sh ubuntu@your-ec2-ip:~/

# On EC2 instance, run setup
chmod +x ec2-setup.sh
./ec2-setup.sh
```

## Step 2: Deploy Application

### Option A: Using Git (Recommended)

```bash
# On EC2 instance
cd /var/www
sudo git clone YOUR_REPO_URL criminal-profiling
sudo chown -R $USER:$USER criminal-profiling
cd criminal-profiling

# Configure environment
cp env.template .env
nano .env  # Edit with your MongoDB URI

# Deploy
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

### Option B: Manual Upload

```bash
# Upload your project files (from local machine)
scp -r -i /path/to/your-key.pem . ubuntu@your-ec2-ip:/var/www/criminal-profiling/

# On EC2 instance
cd /var/www/criminal-profiling
cp env.template .env
nano .env
npm ci --production
npm run build
pm2 start ecosystem.config.js
pm2 save
```

## Step 3: Configure Nginx

```bash
# On EC2 instance
sudo cp deploy/nginx.conf /etc/nginx/sites-available/criminal-profiling
sudo nano /etc/nginx/sites-available/criminal-profiling  # Edit server_name if needed
sudo ln -s /etc/nginx/sites-available/criminal-profiling /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## Step 4: Test

```bash
# Check application
curl http://localhost:3000/health

# Check through Nginx
curl http://localhost/health

# Visit in browser
http://your-ec2-public-ip
```

## Useful Commands

```bash
# PM2
pm2 status
pm2 logs criminal-profiling-api
pm2 restart criminal-profiling-api

# Nginx
sudo systemctl status nginx
sudo nginx -t
sudo systemctl reload nginx

# MongoDB (if local)
sudo systemctl status mongod
mongosh "mongodb://root:password@localhost:27017/criminal-profiling?authSource=admin"
```

## Environment Variables

Copy `env.template` to `.env` and configure:

```env
PORT=3000
NODE_ENV=production
MONGODB_URI=your-mongodb-connection-string
```

## Troubleshooting

- **App not starting**: Check `pm2 logs criminal-profiling-api`
- **502 Bad Gateway**: Verify app is running with `pm2 status`
- **MongoDB connection error**: Check connection string in `.env`
- **Can't access from browser**: Verify security group allows HTTP/HTTPS

---

For detailed troubleshooting and advanced configuration, see [DEPLOYMENT.md](../DEPLOYMENT.md).

