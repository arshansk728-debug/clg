@echo off
echo ========================================
echo  College Query Chatbot - Docker Setup
echo ========================================
echo.

echo [1/3] Checking Docker installation...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not installed or not running
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)

echo Docker is installed ✓
echo.

echo [2/3] Setting up environment...
if not exist .env (
    copy env.example .env
    echo Created .env file from template
    echo.
    echo ⚠️  IMPORTANT: Please edit .env file with your OpenAI API key:
    echo    - OPENAI_API_KEY: Your OpenAI API key (optional but recommended)
    echo.
    pause
)

echo.
echo [3/3] Starting with Docker Compose...
echo.
echo ========================================
echo    Docker Services Starting...
echo ========================================
echo.
echo 🐳 Starting MongoDB, Backend, and Nginx...
echo.
echo This may take a few minutes on first run...
echo.
echo 🚀 Application: http://localhost:3000
echo 📱 Student Chat: http://localhost:3000
echo 👨‍💼 Admin Panel: http://localhost:3000/admin.html
echo 🔍 Health Check: http://localhost:3000/api/health
echo.
echo Press Ctrl+C to stop all services
echo ========================================
echo.

docker-compose up


