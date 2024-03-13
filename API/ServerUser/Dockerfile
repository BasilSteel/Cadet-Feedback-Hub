# Stage 1 - Build the application for ServerUser
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build_user
WORKDIR /app

# Copy the project file and restore dependencies for ServerUser
COPY ./CFN-Server.csproj API/ServerUser/
RUN dotnet restore API/ServerUser/CFN-Server.csproj

# Copy the remaining files and build the application for ServerUser
COPY . .
WORKDIR /app/API/ServerUser
RUN dotnet build CFN-Server.csproj -c Release -o /app/build/user

# Stage 2 - Publish the application for ServerUser
FROM build_user AS publish_user
RUN dotnet publish CFN-Server.csproj -c Release -o /app/publish/user

# Stage 3 - Create the final image for ServerUser
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS user
WORKDIR /app
COPY --from=publish_user /app/publish/user .
ENTRYPOINT ["dotnet", "CFN-Server.dll"]
