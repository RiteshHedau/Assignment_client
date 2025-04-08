# ===== Stage 1: Build React App =====
FROM node:18 AS build

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# ===== Stage 2: Serve with Nginx =====
FROM nginx:1.25-alpine

# Remove default nginx configuration and static files
RUN rm -rf /etc/nginx/conf.d/* /usr/share/nginx/html/*

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]