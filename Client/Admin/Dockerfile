# Stage 1 - Build the application for Admin
FROM node:18 AS build_admin
WORKDIR /app_admin
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Create the final image for Admin
FROM node:18 AS admin
WORKDIR /app_admin
COPY --from=build_admin /app_admin/dist .
EXPOSE 3001
CMD ["npm", "run", "dev"]
