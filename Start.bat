@echo off
start cmd.exe /k "cd /d %~dp0\API\ServerAdmin & dotnet run"
start cmd.exe /k "cd /d %~dp0\API\ServerUser & dotnet run"
start cmd.exe /k "cd /d %~dp0\Client\Admin & npm i && npm run dev"
start cmd.exe /k "cd /d %~dp0\Client\User & npm i && npm run dev"
