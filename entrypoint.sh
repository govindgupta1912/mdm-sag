#!/bin/sh

set -e

echo "Generating env-config.js..."
if [ -f /usr/share/nginx/html/env-config.template.js ]; then
    envsubst '$VITE_API_BASE_URL' < /usr/share/nginx/html/env-config.template.js > /usr/share/nginx/html/env-config.js
else
    echo "Error: env-config.template.js not found"
    exit 1
fi

# Start NGINX
exec "$@"

 