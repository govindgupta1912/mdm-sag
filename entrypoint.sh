#!/bin/sh

set -e

echo "Generating the configuration file..."
envsubst < /usr/share/nginx/html/env-config.template.js > /usr/share/nginx/html/env-config.js

echo "Configuring nginx.conf..."
envsubst '$VITE_API_BASE_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start NGINX
exec "$@"