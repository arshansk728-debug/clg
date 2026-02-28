@echo off
echo ========================================
echo  College Query Chatbot - Full Project
echo ========================================
echo.

echo [1/5] Installing dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/5] Setting up environment...
cd ..
if not exist .env (
    copy env.example .env
    echo Created .env file from template
    echo.
    echo ⚠️  IMPORTANT: Please edit .env file with your settings:
    echo    - MONGO_URI: Your MongoDB connection string
    echo    - JWT_SECRET: A secure random string
    echo    - OPENAI_API_KEY: Your OpenAI API key (optional)
    echo.
    pause
)

echo.
echo [3/5] Checking MongoDB connection...
echo Please ensure MongoDB is running on your system
echo.

echo [4/5] Seeding database (optional)...
echo Do you want to seed the database with sample data? (y/n)
set /p seed_choice=
if /i "%seed_choice%"=="y" (
    cd backend
    node seedData.js
    cd ..
)

echo.
echo [5/5] Starting the full server...
echo.
echo ========================================
echo    Full Server Starting...
echo ========================================
echo.
echo 🚀 Full Server: http://localhost:3000
echo 📱 Student Chat: http://localhost:3000
echo 👨‍💼 Admin Panel: http://localhost:3000/admin.html
echo 🔍 Health Check: http://localhost:3000/api/health
echo.
echo ✅ Full functionality with database and AI support
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

cd backend
node server.js


