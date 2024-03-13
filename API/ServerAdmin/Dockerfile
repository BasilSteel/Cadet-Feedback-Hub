# Stage 1 - Build the application for ServerAdmin
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build_admin
WORKDIR /app

# Copy the project file and restore dependencies for ServerAdmin
COPY ./CFN-Server.csproj API/ServerAdmin/
RUN dotnet restore API/ServerAdmin/CFN-Server.csproj

# Copy the remaining files and build the application for ServerAdmin
COPY . .
WORKDIR /app/API/ServerAdmin
RUN dotnet build CFN-Server.csproj -c Release -o ./app/build/admin

# Stage 2 - Publish the application for ServerAdmin
FROM build_admin AS publish_admin
RUN dotnet publish CFN-Server.csproj -c Release -o /app/publish/admin

# Stage 3 - Create the final image for ServerAdmin
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS admin
WORKDIR /app
COPY --from=publish_admin /app/publish/admin .
ENTRYPOINT ["dotnet", "CFN-Server.dll"]
