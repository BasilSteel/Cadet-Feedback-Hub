FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 4001

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["CFN-Server.csproj", "."]
RUN dotnet restore "./CFN-Server.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "CFN-Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CFN-Server.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CFN-Server.dll"]
