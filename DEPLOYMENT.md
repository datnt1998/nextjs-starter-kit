# Deployment Guide

This guide covers deploying the NextJS Starter Kit to various platforms and environments.

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Vercel Deployment](#vercel-deployment)
- [Netlify Deployment](#netlify-deployment)
- [AWS Amplify Deployment](#aws-amplify-deployment)
- [Docker Deployment](#docker-deployment)
- [Self-Hosted Deployment](#self-hosted-deployment)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

## Pre-Deployment Checklist

Before deploying to production, ensure you have completed the following:

### Code Quality

- [ ] All tests pass (`npm run test`)
- [ ] No linting errors (`npm run lint`)
- [ ] Code is properly formatted (`npm run format:check`)
- [ ] TypeScript compiles without errors (`npm run type-check`)
- [ ] Production build succeeds (`npm run build`)

### Configuration

- [ ] Environment variables are configured
- [ ] Supabase production project is set up
- [ ] Authentication callbacks are configured
- [ ] CORS settings are configured (if using API routes)
- [ ] Security headers are configured

### Content & Assets

- [ ] All images are optimized
- [ ] Favicon and app icons are added
- [ ] Meta tags are configured (SEO)
- [ ] robots.txt is configured
- [ ] sitemap.xml is generated (if applicable)

### Performance

- [ ] Lighthouse score is acceptable (>90)
- [ ] Core Web Vitals are optimized
- [ ] Bundle size is reasonable
- [ ] Unused dependencies are removed

## Vercel Deployment

Vercel is the recommended platform for deploying NextJS applications. It provides zero-configuration deployment with automatic HTTPS, CDN, and edge functions.

### Quick Deploy

#### Option 1: GitHub Integration (Recommended)

1. **Push your code to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect NextJS settings

3. **Configure Environment Variables**

   In the Vercel dashboard, add the following environment variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

4. **Deploy**

   Click "Deploy" and Vercel will build and deploy your application.

#### Option 2: Vercel CLI

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy**

   ```bash
   # Deploy to preview
   vercel

   # Deploy to production
   vercel --prod
   ```

4. **Set Environment Variables**

   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add NEXT_PUBLIC_APP_URL
   ```

### Vercel Configuration

Create a `vercel.json` file for advanced configuration:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Automatic Deployments

Vercel automatically deploys:

- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

### Custom Domain

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `NEXT_PUBLIC_APP_URL` environment variable

## Netlify Deployment

### Deploy via Git

1. **Push to GitHub/GitLab/Bitbucket**

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your repository

3. **Configure Build Settings**

   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Add Environment Variables**

   In Netlify dashboard > Site settings > Environment variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
   ```

5. **Install NextJS Plugin**

   Add to `netlify.toml`:

   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

### Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

## AWS Amplify Deployment

### Deploy via Console

1. **Go to AWS Amplify Console**

2. **Connect Repository**
   - Click "New app" > "Host web app"
   - Connect your Git provider
   - Select your repository and branch

3. **Configure Build Settings**

   Amplify auto-detects NextJS. Verify the build settings:

   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - "**/*"
     cache:
       paths:
         - node_modules/**/*
   ```

4. **Add Environment Variables**

   In Amplify Console > App settings > Environment variables

5. **Deploy**

   Amplify will automatically build and deploy

### Amplify CLI

```bash
# Install Amplify CLI
npm i -g @aws-amplify/cli

# Initialize
amplify init

# Add hosting
amplify add hosting

# Publish
amplify publish
```

## Docker Deployment

### Dockerfile

Create a `Dockerfile` in the project root:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose port
EXPOSE 3000

# Set environment variable for port
ENV PORT 3000

# Start the application
CMD ["node", "server.js"]
```

### Docker Compose

Create a `docker-compose.yml`:

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
    restart: unless-stopped
```

### Build and Run

```bash
# Build image
docker build -t nextjs-starter-kit .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your-url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key \
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  nextjs-starter-kit

# Or use Docker Compose
docker-compose up -d
```

### Update next.config.js

Enable standalone output for Docker:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // ... other config
};

module.exports = nextConfig;
```

## Self-Hosted Deployment

### Using PM2 (Process Manager)

1. **Install PM2**

   ```bash
   npm i -g pm2
   ```

2. **Build the application**

   ```bash
   npm run build
   ```

3. **Create PM2 ecosystem file**

   Create `ecosystem.config.js`:

   ```javascript
   module.exports = {
     apps: [
       {
         name: "nextjs-starter-kit",
         script: "npm",
         args: "start",
         env: {
           NODE_ENV: "production",
           PORT: 3000,
           NEXT_PUBLIC_SUPABASE_URL: "your-url",
           NEXT_PUBLIC_SUPABASE_ANON_KEY: "your-key",
           NEXT_PUBLIC_APP_URL: "https://your-domain.com",
         },
       },
     ],
   };
   ```

4. **Start with PM2**

   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

### Using Nginx as Reverse Proxy

1. **Install Nginx**

   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Configure Nginx**

   Create `/etc/nginx/sites-available/nextjs-starter-kit`:

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable site**

   ```bash
   sudo ln -s /etc/nginx/sites-available/nextjs-starter-kit /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

4. **Set up SSL with Let's Encrypt**

   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Environment Variables

### Required Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Application
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Optional Variables

```bash
# Supabase Service Role (server-side only)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Error Tracking
SENTRY_DSN=https://xxx@sentry.io/xxx

# Node Environment
NODE_ENV=production
```

### Setting Environment Variables

**Vercel**: Project Settings > Environment Variables  
**Netlify**: Site Settings > Environment Variables  
**AWS Amplify**: App Settings > Environment Variables  
**Docker**: Use `-e` flag or `.env` file  
**Self-hosted**: Use `.env.local` or PM2 ecosystem file

## Database Setup

### Supabase Production Setup

1. **Create Production Project**
   - Go to [app.supabase.com](https://app.supabase.com)
   - Create a new project for production
   - Choose a strong database password

2. **Configure Authentication**
   - Enable email authentication
   - Configure redirect URLs:
     - Site URL: `https://your-domain.com`
     - Redirect URLs: `https://your-domain.com/auth/callback`

3. **Set Up Database Tables**

   Run your database migrations or SQL scripts in the Supabase SQL editor.

4. **Configure Row Level Security (RLS)**

   Enable RLS on all tables and create appropriate policies.

5. **Update Environment Variables**

   Use the production project's URL and keys in your deployment.

## Post-Deployment

### Verification Checklist

- [ ] Application loads correctly
- [ ] Authentication works (login/signup/logout)
- [ ] Protected routes are secured
- [ ] Theme switching works
- [ ] Forms submit successfully
- [ ] Data fetching works
- [ ] Images load correctly
- [ ] No console errors
- [ ] SSL certificate is valid
- [ ] Custom domain works (if configured)

### Monitoring

Set up monitoring for:

- **Uptime**: Use services like UptimeRobot or Pingdom
- **Performance**: Use Vercel Analytics or Google Analytics
- **Errors**: Use Sentry or similar error tracking
- **Logs**: Check platform logs regularly

### Performance Optimization

The starter kit includes several production optimizations configured in `next.config.js`:

1. **React Strict Mode**: Enabled for better development practices
2. **SWC Minification**: Fast JavaScript/TypeScript minification
3. **Console Removal**: Removes console.log in production (keeps error/warn)
4. **Standalone Output**: Optimized for Docker and serverless deployments
5. **Package Import Optimization**: Optimizes imports from common paths

**Image Optimization**:

- AVIF and WebP format support
- Responsive image sizes for different devices
- Minimum cache TTL of 60 seconds
- SVG support with security policies

**Additional Optimizations**:

- Use NextJS Image component for automatic optimization
- Enable compression (gzip/brotli) - included by default on most platforms
- Use CDN - Vercel, Netlify, and Amplify include CDN by default

### Security

1. **Security Headers**

   Security headers are already configured in `next.config.js` with the following protections:
   - X-DNS-Prefetch-Control: Enables DNS prefetching
   - Strict-Transport-Security: Enforces HTTPS
   - X-Frame-Options: Prevents clickjacking
   - X-Content-Type-Options: Prevents MIME sniffing
   - X-XSS-Protection: Enables XSS filtering
   - Referrer-Policy: Controls referrer information
   - Permissions-Policy: Restricts browser features

   These headers are automatically applied to all routes.

2. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use platform-specific secret management
   - Rotate keys regularly

3. **Rate Limiting**

   Implement rate limiting for API routes

## Troubleshooting

### Build Failures

**Issue**: Build fails with TypeScript errors

```bash
# Solution: Run type check locally
npm run type-check
# Fix all type errors before deploying
```

**Issue**: Build fails with missing dependencies

```bash
# Solution: Ensure all dependencies are in package.json
npm install
# Commit package-lock.json
```

### Runtime Errors

**Issue**: Environment variables not working

- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Restart the development server after changing variables
- Verify variables are set in the deployment platform

**Issue**: Authentication not working

- Check Supabase redirect URLs are configured correctly
- Verify `NEXT_PUBLIC_APP_URL` matches your domain
- Check browser console for CORS errors

### Performance Issues

**Issue**: Slow page loads

- Check bundle size with `npm run build`
- Optimize images using NextJS Image component
- Enable caching headers
- Use dynamic imports for large components

**Issue**: High memory usage

- Check for memory leaks in components
- Optimize data fetching queries
- Reduce bundle size

### Getting Help

If you encounter issues:

1. Check the [NextJS documentation](https://nextjs.org/docs)
2. Review platform-specific documentation
3. Search existing GitHub issues
4. Ask in the project's Discord/Slack
5. Open a new issue with detailed information

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
      # Add deployment steps for your platform
```

### Deployment Strategies

- **Blue-Green**: Deploy to a new environment, then switch traffic
- **Canary**: Gradually roll out to a percentage of users
- **Rolling**: Update instances one at a time

Most platforms (Vercel, Netlify) handle this automatically.

---

For more information, refer to the [README.md](README.md) and platform-specific documentation.
