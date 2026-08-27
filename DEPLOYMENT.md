# AWS EC2 Deployment Guide (Native Node.js & PM2)

This guide walks you through deploying your Next.js application natively on an AWS EC2 instance using Node.js, PM2 (Process Manager), and Nginx as a reverse proxy with SSL.

---

## Table of Contents
1. [Prerequisites & EC2 Setup](#1-prerequisites--ec2-setup)
2. [EC2 Security Group Configuration](#2-ec2-security-group-configuration)
3. [Installing Node.js & PM2 on EC2](#3-installing-nodejs--pm2-on-ec2)
4. [Cloning the Repo & Building the App](#4-cloning-the-repo--building-the-app)
5. [Starting the App with PM2](#5-starting-the-app-with-pm2)
6. [Configuring Nginx Reverse Proxy & SSL (HTTPS)](#6-configuring-nginx-reverse-proxy--ssl-https)
7. [Updating and Maintaining the App](#7-updating-and-maintaining-the-app)

---

## 1. Prerequisites & EC2 Setup

1. Launch an AWS EC2 instance:
   - **AMI**: Ubuntu Server 24.04 LTS (or Amazon Linux 2023)
   - **Instance Type**: `t3.micro` or `t3.small` (recommended for building Next.js apps)
   - **Storage**: At least 15–20 GB gp3 root volume
   - **Key Pair**: Download and secure your `.pem` key file
2. Connect to your instance via SSH:
   ```bash
   ssh -i /path/to/your-key.pem ubuntu@<YOUR_EC2_PUBLIC_IP>
   ```

---

## 2. EC2 Security Group Configuration

In the AWS EC2 Management Console, go to your instance's **Security Groups** and configure the following **Inbound Rules**:

| Type | Protocol | Port Range | Source | Description |
| :--- | :--- | :--- | :--- | :--- |
| **SSH** | TCP | `22` | My IP (or `0.0.0.0/0`) | SSH connection |
| **HTTP** | TCP | `80` | `0.0.0.0/0` | Web traffic |
| **HTTPS** | TCP | `443` | `0.0.0.0/0` | Secure web traffic |
| **Custom TCP** | TCP | `3000` | `0.0.0.0/0` | Direct testing port (optional) |

---

## 3. Installing Node.js & PM2 on EC2

### For Ubuntu (22.04 / 24.04 LTS):
```bash
# Update package list and install basic utilities
sudo apt-get update
sudo apt-get install -y curl git build-essential

# Install Node.js 20.x LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node -v
npm -v

# Install PM2 globally to manage Node processes
sudo npm install -g pm2
```

---

## 4. Cloning the Repo & Building the App

1. **Clone the repository onto EC2:**
   ```bash
   git clone <YOUR_GIT_REPO_URL>
   cd door-to-sakthi
   ```

2. **Install dependencies and build the Next.js project:**
   ```bash
   npm install
   npm run build
   ```

---

## 5. Starting the App with PM2

PM2 ensures your Next.js application runs continuously in the background and restarts automatically if the server reboots.

1. **Start the Next.js production server with PM2:**
   ```bash
   pm2 start npm --name "door-to-sakthi" -- start
   ```

2. **Configure PM2 to restart on server reboot:**
   ```bash
   pm2 startup
   # Run the command generated in terminal output, then:
   pm2 save
   ```

3. **Useful PM2 commands:**
   ```bash
   pm2 status               # Check app status
   pm2 logs door-to-sakthi  # View live application logs
   pm2 restart door-to-sakthi # Restart application
   pm2 stop door-to-sakthi  # Stop application
   ```

---

## 6. Configuring Nginx Reverse Proxy & SSL (HTTPS)

### Step 1: Install Nginx and Certbot
```bash
sudo apt-get install -y nginx certbot python3-certbot-nginx
```

### Step 2: Configure Nginx Reverse Proxy
Edit `/etc/nginx/sites-available/default`:
```bash
sudo nano /etc/nginx/sites-available/default
```

Replace or configure the `server` block:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com; # Or your EC2 Public IP / DNS

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 3: Test and restart Nginx
```bash
sudo nginx -t
sudo systemctl restart nginx
```

### Step 4: Obtain Free SSL Certificate (Optional with domain)
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 7. Updating and Maintaining the App

When you push new changes to your repository, update your EC2 deployment with:

```bash
cd ~/door-to-sakthi
git pull origin main
npm install
npm run build
pm2 reload door-to-sakthi
```
