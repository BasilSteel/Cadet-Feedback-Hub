# Stage 1 - Build the application
FROM node:18 AS build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Create the final image
FROM node:18 AS final
WORKDIR /app
COPY --from=build /app/dist .
EXPOSE 3000
CMD ["npm", "run", "dev"]
