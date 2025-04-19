

# 1. Build stage
FROM node:20-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env .env    
RUN npm run build         


# 2. Serve with Nginx
FROM nginx:stable-alpine

# Install envsubst
RUN apk add --no-cache gettext

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template

ENV VITE_API_BASE_URL=http://0.0.0.0:9001/api

CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
