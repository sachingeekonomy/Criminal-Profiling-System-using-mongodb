# AWS EC2 Security Group Configuration Guide

## Complete Security Group Rules

Configure your security group with these rules:

### Rule 1: SSH Access (Port 22)
- **Type**: SSH
- **Protocol**: TCP
- **Port Range**: 22
- **Source Type**: **My IP** (Important: Don't use "Anywhere" for security!)
- **Source**: Your IP will be auto-filled when you select "My IP"
- **Description**: "SSH access from my IP"

### Rule 2: HTTP Access (Port 80)
- **Type**: HTTP
- **Protocol**: TCP
- **Port Range**: 80
- **Source Type**: Anywhere
- **Source**: 0.0.0.0/0
- **Description**: "Web access (HTTP)"

### Rule 3: HTTPS Access (Port 443)
- **Type**: HTTPS
- **Protocol**: TCP
- **Port Range**: 443
- **Source Type**: Anywhere
- **Source**: 0.0.0.0/0
- **Description**: "Secure web access (HTTPS)"

### Rule 4: Application Port (Port 3000) - ADD THIS!
- **Type**: Custom TCP
- **Protocol**: TCP
- **Port Range**: 3000
- **Source Type**: Custom
- **Source**: **127.0.0.1/32** (localhost only)
- **Description**: "Application port (localhost only for Nginx reverse proxy)"

## Why These Rules?

1. **SSH (22) - My IP only**: 
   - Security best practice: Only allow SSH from your own IP address
   - Prevents unauthorized access attempts
   - You can always add more IPs later if needed

2. **HTTP (80) & HTTPS (443) - Open**:
   - Allows users to access your web application
   - Nginx will receive traffic on these ports and forward to your app

3. **Port 3000 - Localhost only**:
   - Your NestJS app runs on port 3000
   - Only Nginx (running on the same server) can access it
   - External users cannot directly access port 3000
   - This is a security best practice (reverse proxy pattern)

## Step-by-Step Instructions

### Fix SSH Rule:
1. Find the SSH rule (Rule 1) in your list
2. Click on the **Source type** dropdown
3. Change from "Custom" to **"My IP"**
4. Your IP address will automatically appear in the Source field
5. Add description: "SSH access from my IP"

### Add Port 3000 Rule:
1. Click the **"Add security group rule"** button
2. Configure the new rule:
   - **Type**: Select "Custom TCP" from dropdown
   - **Protocol**: Should auto-fill as "TCP"
   - **Port range**: Enter `3000`
   - **Source type**: Select "Custom"
   - **Source**: Enter `127.0.0.1/32`
   - **Description**: Enter "Application port (localhost only)"
3. Click outside the rule or wait for it to save

### Final Check:
Your security group should have 4 rules total:
- ✅ SSH (22) from My IP
- ✅ HTTP (80) from Anywhere
- ✅ HTTPS (443) from Anywhere  
- ✅ Custom TCP (3000) from 127.0.0.1/32

## Security Group Name and Description

- **Security group name**: `criminal-profiling-sg` ✅ (You already have this)
- **Description**: You can update this to: "Security group for Criminal Profiling System backend"

## Important Notes

⚠️ **Security Warning**: Never set SSH (22) to "Anywhere" (0.0.0.0/0) in production! Always restrict it to specific IPs.

✅ After creating the instance, you can:
- Add more IPs to SSH rule if you need access from multiple locations
- Modify rules anytime in the EC2 Security Groups console
- Review rules in EC2 Dashboard → Security Groups

## Troubleshooting

**If "My IP" option is not available:**
- You can manually enter your IP address
- Find your IP: Visit https://whatismyipaddress.com/
- Enter it as: `YOUR_IP/32` (e.g., `203.0.113.42/32`)

**If you get "Invalid source" error for 127.0.0.1/32:**
- Some AWS regions require a different format
- Try: `127.0.0.1` or just leave it as `127.0.0.1/32`
- Alternatively, you can use the Security Group's own ID (but localhost is preferred)

