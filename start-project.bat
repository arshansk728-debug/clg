@echo off
echo ========================================
echo    College Query Chatbot - Easy Start
echo ========================================
echo.

echo [1/4] Installing dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Setting up environment...
cd ..
if not exist .env (
    copy env.example .env
    echo Created .env file from template
)

echo.
echo [3/4] Starting the test server...
echo.
echo ========================================
echo    Server Starting...
echo ========================================
echo.
echo 🚀 Test Server: http://localhost:3000
echo 📱 Student Chat: http://localhost:3000
echo 👨‍💼 Admin Panel: http://localhost:3000/admin.html
echo 🔍 Health Check: http://localhost:3000/api/health
echo.
echo ⚠️  This is TEST MODE - No database required!
echo 💡 For full functionality, set up MongoDB and OpenAI API key
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

node server-minimal.js

