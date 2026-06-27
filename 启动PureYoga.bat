@echo off
title PureYoga Schedule Server

cd /d "%~dp0"

echo.
echo  ==========================================
echo    PURE YOGA  Schedule Generator
echo    URL :  http://localhost:3000
echo    Close this window to stop the server.
echo  ==========================================
echo.

start /b cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:3000"

node server.js

echo.
pause
