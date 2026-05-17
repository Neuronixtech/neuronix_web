# Multi-stage build for Neuronix React SPA
# Stage 1: Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# CRITICAL: Override any NODE_ENV to ensure devDependencies are installed
# This must be set BEFORE npm install
ENV NODE_ENV=development

# Copy only package files first
COPY package.json ./

# Install ALL dependencies including devDependencies
RUN npm install --legacy-peer-deps

# Copy source code  
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runtime stage
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
