# FROM node:alpine3.20 as build

#Build App
# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .
# RUN npm run build


# #serve with Ngnix
# FROM nginx:1.23-alpine
# WORKDIR /usr/share/nginx/html
# RUN rm -rf *
# COPY --from=build app/build .
# EXPOSE 80
# ENTRYPOINT [ "nginx", "-g","daemon off;" ]


# Build Stage
FROM node:20-alpine AS build 
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Caddy Stage
FROM caddy:alpine
COPY --from=build /app/build /usr/share/caddy
EXPOSE 80
CMD ["caddy", "file-server", "--root", "/usr/share/caddy", "--browse"]