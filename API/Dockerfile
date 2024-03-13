# Stage 1 - Build the application
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copy the project file and restore dependencies
COPY API/ServerAdmin/CFN-Server.csproj API/ServerAdmin/
COPY API/ServerUser/CFN-Server.csproj API/ServerUser/
RUN dotnet restore API/ServerAdmin/CFN-Server.csproj
RUN dotnet restore API/ServerUser/CFN-Server.csproj

# Copy the remaining files and build the application
COPY . .
WORKDIR /app/API/ServerAdmin
RUN dotnet build CFN-Server.csproj -c Release -o /app/build

# Stage 2 - Publish the application
FROM build AS publish
RUN dotnet publish CFN-Server.csproj -c Release -o /app/publish

# Stage 3 - Create the final image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CFN-Server.dll"]
