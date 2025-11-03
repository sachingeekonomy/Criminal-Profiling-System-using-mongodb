# AWS EC2 Deployment Checklist

Use this checklist to track your deployment progress.

## Pre-Deployment

- [ ] AWS Account created and accessible
- [ ] EC2 Instance launched (Ubuntu 24.04 LTS)
- [ ] Security Group configured (SSH, HTTP, HTTPS)
- [ ] Key pair (.pem file) downloaded and saved securely
- [ ] EC2 Public IP noted
- [ ] MongoDB setup decided (Local or Atlas)

## Step 1: Launch EC2 Instance

- [ ] Instance name configured
- [ ] Ubuntu 24.04 LTS AMI selected
- [ ] Instance type selected (t3.micro or larger)
- [ ] Key pair created/downloaded
- [ ] Security Group rules configured:
  - [ ] SSH (22) - My IP only
  - [ ] HTTP (80) - 0.0.0.0/0
  - [ ] HTTPS (443) - 0.0.0.0/0
  - [ ] Custom TCP (3000) - 127.0.0.1/32
- [ ] Instance launched successfully
- [ ] Instance state is "running"

## Step 2: Connect to EC2

- [ ] SSH connection successful
- [ ] Can run commands on EC2

## Step 3: Initial Setup

- [ ] `ec2-setup.sh` uploaded to EC2
- [ ] Setup script executed successfully
- [ ] Node.js installed and verified (`node --version`)
- [ ] PM2 installed (`pm2 --version`)
- [ ] MongoDB installed (if using local)
- [ ] Nginx installed (`nginx -v`)
- [ ] Git installed
- [ ] Firewall (UFW) configured

## Step 4: Deploy Application

- [ ] Application files uploaded/cloned to `/var/www/criminal-profiling/seekoid-demo`
- [ ] `.env` file created from `env.template`
- [ ] Environment variables configured:
  - [ ] PORT=3000
  - [ ] NODE_ENV=production
  - [ ] MONGODB_URI configured
- [ ] Dependencies installed (`npm ci`)
- [ ] Application built (`npm run build`)
- [ ] Application started with PM2
- [ ] PM2 save executed
- [ ] Application health check passed (`curl http://localhost:3000/health`)

## Step 5: MongoDB Configuration

### If Using Local MongoDB:
- [ ] MongoDB admin user created
- [ ] MongoDB authentication enabled in config
- [ ] MongoDB restarted
- [ ] MongoDB connection tested
- [ ] `.env` updated with MongoDB credentials

### If Using MongoDB Atlas:
- [ ] Atlas cluster created
- [ ] Database user created
- [ ] EC2 IP whitelisted in Atlas
- [ ] Connection string obtained
- [ ] `.env` updated with Atlas connection string
- [ ] Application restarted and tested

## Step 6: Nginx Configuration

- [ ] Nginx config file copied to `/etc/nginx/sites-available/`
- [ ] Server name configured (if domain available)
- [ ] Site enabled (symlink created)
- [ ] Default site removed (optional)
- [ ] Nginx config tested (`sudo nginx -t`)
- [ ] Nginx reloaded (`sudo systemctl reload nginx`)
- [ ] Nginx status verified (`sudo systemctl status nginx`)

## Step 7: Testing

- [ ] Application accessible via `http://localhost:3000/health`
- [ ] Application accessible via `http://localhost/health` (through Nginx)
- [ ] Application accessible from browser at `http://YOUR_EC2_IP/health`
- [ ] Swagger docs accessible at `http://YOUR_EC2_IP/api`
- [ ] API endpoints responding correctly

## Step 8: Optional SSL Setup

- [ ] Domain name pointing to EC2 IP
- [ ] Certbot installed
- [ ] SSL certificate obtained
- [ ] HTTPS redirect configured
- [ ] SSL auto-renewal tested
- [ ] Site accessible via HTTPS

## Post-Deployment

- [ ] PM2 startup script configured (auto-start on reboot)
- [ ] Backup strategy planned
- [ ] Monitoring setup considered
- [ ] Security reviewed:
  - [ ] SSH restricted to specific IP
  - [ ] Strong passwords used
  - [ ] `.env` not in Git
  - [ ] Firewall enabled
- [ ] Documentation reviewed
- [ ] Team members have access (if applicable)

## Quick Commands Reference

```bash
# Check application status
pm2 status

# View logs
pm2 logs criminal-profiling-api

# Restart application
pm2 restart criminal-profiling-api

# Check Nginx
sudo systemctl status nginx

# Test health endpoint
curl http://localhost/health
```

## Support Resources

- Main Guide: `AWS-EC2-DEPLOYMENT-GUIDE.md`
- Detailed Guide: `DEPLOYMENT.md`
- Quick Start: `deploy/QUICK-START.md`

---

**Date Started**: _______________  
**Date Completed**: _______________  
**EC2 Public IP**: _______________  
**Domain** (if applicable): _______________

