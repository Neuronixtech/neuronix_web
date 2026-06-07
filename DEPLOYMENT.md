# Deployment Guide for Neuronix

This guide explains how to deploy the Neuronix React SPA to a Coolify instance.

## Prerequisites

- Coolify instance running and accessible
- Docker installed on the Coolify server
- Git repository with this project
- Domain name (optional, for production)

## Deployment Steps on Coolify

### 1. Connect Your Repository

1. Go to your Coolify dashboard
2. Click **"Create New"** → **"Docker Container"** or **"Service"**
3. Select **"Git Deployment"** or **"Docker"** as the deployment type
4. Connect your GitHub/GitLab repository containing this project
5. Select the correct branch (e.g., `main`, `develop`)

### 2. Configuration

Coolify will auto-detect the `Dockerfile` in the root directory.

**Environment Variables:**
- `VITE_API_BASE_URL`: Backend API URL (default: `/api`)
  - Example: `https://api.yourdomain.com`
  - For local development: `http://localhost:3001`

Add these in Coolify's environment variables section.

### 3. Port Mapping

- The Docker container exposes port `80` (HTTP)
- Coolify will automatically manage port allocation
- Configure your domain via Coolify's reverse proxy settings

### 4. Deploy

1. Click **"Deploy"** in Coolify
2. Watch the build logs in real-time
3. Once complete, your app will be running

## Local Testing Before Deployment

### Build and Run Locally

```bash
# Build the Docker image
docker build -t neuronix:latest .

# Run the container
docker run -p 3000:80 neuronix:latest

# Access the app at http://localhost:3000
```

### Using Docker Compose

```bash
# Build and run with docker-compose
docker-compose up

# For production mode
docker-compose -f docker-compose.yml up -d

# Stop the containers
docker-compose down
```

## Production Optimizations

### Coolify Settings

1. **Restart Policy**: Set to "unless-stopped"
2. **Memory Limit**: Recommended 512MB - 1GB
3. **CPU Shares**: Adjust based on traffic
4. **Auto-deploy**: Enable to auto-deploy on git push
5. **SSL/TLS**: Enable via Coolify's certificate manager

### Build Optimization

The multi-stage Dockerfile already includes:
- ✅ Alpine Linux for minimal image size
- ✅ npm ci for reproducible builds
- ✅ Nginx for static file serving
- ✅ Gzip compression
- ✅ Security headers
- ✅ Cache headers for static assets
- ✅ Health checks

### Environment Variables

Set these in Coolify:

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `/api` | Backend API endpoint |
| `NODE_ENV` | `production` | Environment mode |

## Monitoring & Debugging

### View Logs

```bash
# In Coolify dashboard, click the service and view "Logs"
# Or via Docker CLI:
docker logs <container_id>
```

### Health Check

The app includes a `/health` endpoint that returns `healthy` if the server is running.

```bash
curl http://your-domain.com/health
```

### Performance Tips

1. **Enable Coolify's CDN** for faster static asset delivery
2. **Configure DNS** for optimal routing
3. **Monitor resource usage** in Coolify dashboard
4. **Set up notifications** for deployment failures

## Troubleshooting

### Build Fails
- Check the build logs in Coolify
- Ensure `package-lock.json` is committed to git
- Verify all dependencies are correct in `package.json`

### App Not Responding
- Check container logs: `docker logs <container_id>`
- Verify health check: `curl http://localhost/health`
- Check port mappings in Coolify

### API Not Connecting
- Verify `VITE_API_BASE_URL` environment variable
- Ensure backend service is running and accessible
- Check CORS headers if API is on different domain

### High Memory Usage
- Check for memory leaks in browser console
- Increase memory limit in Coolify
- Clear browser cache and reload

## Rollback

To rollback to a previous deployment in Coolify:

1. Go to your service in Coolify
2. Click **"Deployments"** tab
3. Select a previous deployment
4. Click **"Rollback"**

## Additional Resources

- [Coolify Documentation](https://coolify.io)
- [Docker Documentation](https://docs.docker.com)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [Nginx Configuration](https://nginx.org/en/docs/)

## Next Steps

1. Commit all changes to git:
   ```bash
   git add Dockerfile docker-compose.yml nginx.conf .dockerignore .coolify.yml DEPLOYMENT.md
   git commit -m "chore: add Coolify deployment configuration"
   git push origin main
   ```

2. Connect your repository to Coolify

3. Configure environment variables

4. Deploy and monitor

Happy deploying! 🚀
