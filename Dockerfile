 # Stage 1: Build Vite app
FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Install envsubst for variable substitution
RUN apk --no-cache add gettext

# Copy custom NGINX template
COPY nginx.conf /etc/nginx/nginx.conf.template

# Copy built frontend
COPY --from=build /app/dist /usr/share/nginx/html

# Copy environment config template and entrypoint
COPY env-config.template.js /usr/share/nginx/html/env-config.template.js
COPY entrypoint.sh /docker-entrypoint.d/entrypoint.sh

# Ensure proper line endings and make entrypoint executable
RUN sed -i 's/\r$//' /docker-entrypoint.d/entrypoint.sh && \
    chmod +x /docker-entrypoint.d/entrypoint.sh

EXPOSE 80

# Use entrypoint script to run before nginx
ENTRYPOINT ["/docker-entrypoint.d/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
#  # Build stage
# FROM node:20 as build

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# # Stage 2: Serve with NGINX
# FROM nginx:alpine
# # Install envsubst for environment variable substitution
# RUN apk --no-cache add gettext
# # Copy custom NGINX config template (with environment variables placeholders)
# COPY nginx.conf /etc/nginx/nginx.conf.template
# # :white_tick: Use Vite's output directory for serving static files
# COPY --from=build /app/dist /usr/share/nginx/html
# # Copy the env config template and entrypoint script
# COPY env-config.template.js /usr/share/nginx/html/env-config.template.js
# COPY entrypoint.sh /docker-entrypoint.d/entrypoint.sh
# # Make entrypoint script executable
# RUN chmod +x /docker-entrypoint.d/entrypoint.sh
# # Expose port 80 to access the app
# EXPOSE 80
# # Set entrypoint to run the entrypoint script before NGINX starts
# ENTRYPOINT ["/docker-entrypoint.d/entrypoint.sh"]