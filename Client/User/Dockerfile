# Stage 1 - Build the application for User
FROM node:18 AS build_user
WORKDIR /app_user
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Create the final image for User
FROM node:18 AS user
WORKDIR /app_user
COPY --from=build_user /app_user/dist .
EXPOSE 3000
CMD ["npm", "run", "dev"]
