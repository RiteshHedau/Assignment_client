FROM node:alpine3.20 as build

# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy the rest and build
COPY . .
RUN npm run build

# Install serve
RUN npm install -g serve

# Expose port and serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]


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