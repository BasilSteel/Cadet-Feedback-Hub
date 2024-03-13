# Stage 1 - Build the application
FROM node:16 AS build
WORKDIR /app

# Copy package.json and install dependencies
COPY Client/Client/package.json .
COPY Client/Client/package-lock.json .
RUN npm install

# Copy the rest of the application and build
COPY Client/Client .
RUN npm run build

# Stage 2 - Create the final image
FROM nginx:1.21
COPY --from=build /app/dist /usr/share/nginx/html
COPY Client/Client/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
