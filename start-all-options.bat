@echo off
echo ========================================
echo    College Query Chatbot - Start Menu
echo ========================================
echo.
echo Choose an option:
echo.
echo 1. Start Minimal Server (No Database Required)
echo 2. Start Fixed Server (Full Database Support)
echo 3. Start with Docker (Full Stack)
echo 4. Install Dependencies Only
echo 5. Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto minimal
if "%choice%"=="2" goto fixed
if "%choice%"=="3" goto docker
if "%choice%"=="4" goto install
if "%choice%"=="5" goto exit
goto invalid

:minimal
echo.
echo Starting Minimal Server (No Database Required)...
echo This version works with mock data and doesn't need MongoDB or API keys.
echo.
taskkill /f /im node.exe >nul 2>&1
node server-minimal.js
goto end

:fixed
echo.
echo Starting Fixed Server (Full Database Support)...
echo This version requires MongoDB and proper .env configuration.
echo.
if not exist .env (
    echo Creating .env file from template...
    copy env.example .env >nul
    echo Please edit .env file with your MongoDB URI and OpenAI API Key.
    pause
)
taskkill /f /im node.exe >nul 2>&1
node server-fixed.js
goto end

:docker
echo.
echo Starting with Docker Compose...
echo This will start the full stack with MongoDB and Nginx.
echo.
taskkill /f /im node.exe >nul 2>&1
docker-compose up -d
echo.
echo Project started with Docker!
echo Access Student Chat: http://localhost:3000
echo Access Admin Panel: http://localhost:3000/admin.html
pause
goto end

:install
echo.
echo Installing Dependencies...
cd backend
npm install
cd ..
echo Dependencies installed successfully!
pause
goto end

:invalid
echo.
echo Invalid choice. Please try again.
pause
goto start

:exit
echo.
echo Goodbye!
goto end

:end
