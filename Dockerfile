FROM node:alpine3.20 as build

# ===== Stage 1: Build React App =====
FROM node:18 AS build

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# ===== Stage 2: Serve with Nginx =====
FROM nginx:1.23-alpine

# Remove default static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]



# # Build Stage
# FROM node:20-alpine AS build 
# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .
# RUN npm run build

# # Caddy Stage
# FROM caddy:alpine
# COPY --from=build /app/build /usr/share/caddy
# EXPOSE 80
# CMD ["caddy", "file-server", "--root", "/usr/share/caddy", "--browse"]