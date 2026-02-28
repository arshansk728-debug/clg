# College Query Chatbot

An intelligent chatbot system designed to provide instant responses to students' queries about courses, events, exam schedules, admissions, fees, and other college-related information. Features both FAQ-based responses and AI-powered fallback using OpenAI's GPT models.

## ✨ Features

### 🤖 Intelligent Chatbot
- **Hybrid response system** - FAQ matching with AI fallback
- **OpenAI GPT integration** for intelligent responses when FAQs don't match
- **NLP-powered responses** with confidence scoring
- **Real-time chat interface** with typing indicators
- **Context-aware conversations** with session management
- **Rating system** for response quality feedback
- **Suggestion system** for related questions
- **Source attribution** (FAQ vs AI response)

### 👨‍💼 Admin Panel
- **Comprehensive dashboard** with analytics and AI service status
- **FAQ management** (add, edit, delete, categorize)
- **Chat logs monitoring** and analytics
- **User engagement metrics** and performance tracking
- **Secure JWT authentication** with role-based access
- **AI service monitoring** and configuration

### 🎨 Modern UI/UX
- **Responsive design** for desktop and mobile
- **Clean, professional interface** with smooth animations
- **Category-based navigation** for easy browsing
- **Real-time notifications** and feedback system
- **AI response indicators** and source attribution

### 🔧 Technical Features
- **RESTful API architecture** with comprehensive error handling
- **MongoDB database** with optimized schemas and indexing
- **Natural Language Processing** with advanced similarity matching
- **OpenAI API integration** with fallback mechanisms
- **JWT-based authentication** with refresh tokens
- **Caching and request queuing** for performance
- **Database connection management** with retry logic

## 🛠️ Technology Stack

### Backend
- **Node.js** + **Express.js** - Server framework
- **MongoDB** + **Mongoose** - Database with connection management
- **JWT** - Authentication with refresh tokens
- **OpenAI API** - AI-powered responses
- **Natural** - NLP processing and similarity matching
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **Express Rate Limit** - API rate limiting

### Frontend
- **HTML5** + **CSS3** + **JavaScript** (ES6+)
- **Responsive design** with CSS Grid/Flexbox
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## 📋 Prerequisites

- **Node.js** (v14.0 or higher)
- **MongoDB** (v4.0 or higher)
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd college-query-chatbot
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Set Up Environment Variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your settings
```

**Required Environment Variables:**
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/college_chatbot

# JWT Secret (Generate a secure random string for production)
JWT_SECRET=your_jwt_secret_key_here

# OpenAI API Configuration (Required for AI responses)
OPENAI_API_KEY=your_openai_api_key_here
```

**Optional Environment Variables:**
```env
# Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Redis Configuration (for session storage)
REDIS_URL=redis://localhost:6379

# Security Configuration
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:

**Windows:**
```bash
# If MongoDB is installed as a service
net start MongoDB
```

**macOS/Linux:**
```bash
# Start MongoDB
mongod
```

**Or use MongoDB Atlas (Cloud):**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster and get the connection string
3. Update `MONGO_URI` in your `.env` file

### 5. Seed the Database
Populate the database with sample data:
```bash
node seedData.js
```

This will create:
- ✅ **30+ sample FAQs** across different categories
- ✅ **Admin user** (username: `admin`, password: `admin123`)

### 6. Get OpenAI API Key (Optional but Recommended)
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Add it to your `.env` file as `OPENAI_API_KEY`

**Note:** Without the OpenAI API key, the chatbot will only use FAQ matching and won't provide AI-powered responses for unmatched queries.

### 7. Start the Server
```bash
npm start
# or for development with auto-restart
npm run dev
```

The server will start at `http://localhost:3000`

## 📱 Usage

### Student Interface
1. Open `http://localhost:3000` in your browser
2. Use the chatbot to ask questions about:
   - Admissions and applications
   - Course information and programs
   - Fees and financial aid
   - Exam schedules and results
   - Campus events and activities
   - Facilities and services

### Admin Panel
1. Go to `http://localhost:3000/admin.html`
2. Login with credentials:
   - **Username:** `admin`
   - **Password:** `admin123`
3. Access features:
   - **Dashboard:** View statistics and analytics
   - **Manage FAQs:** Add, edit, delete questions and answers
   - **Chat Logs:** Monitor conversations and user feedback
   - **Analytics:** Track usage patterns and performance
   - **Profile:** Update admin account settings

## 📊 API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `POST /api/chat` - Send message to chatbot
- `GET /api/chat/suggestions` - Get suggested questions
- `GET /api/chat/quick-actions` - Get quick action buttons
- `GET /api/faq` - Get FAQs (public)
- `GET /api/faq/:id` - Get specific FAQ
- `GET /api/faq/category/:category` - Get FAQs by category

### Admin Endpoints (Authentication Required)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Admin registration
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/profile` - Get admin profile
- `PUT /api/admin/profile` - Update admin profile
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/analytics` - Usage analytics
- `GET /api/admin/chatlogs` - Chat logs
- `POST /api/faq` - Create FAQ
- `PUT /api/faq/:id` - Update FAQ
- `DELETE /api/faq/:id` - Delete FAQ

### AI Service Endpoints
- `GET /api/chat/ai-status` - Check AI service status
- `POST /api/chat/test-ai` - Test AI service connection

## 🏗️ Project Structure

```
college-query-chatbot/
├── backend/
│   ├── controllers/
│   │   ├── authController.js      # Authentication controller
│   │   └── chatController.js      # Chat logic and NLP
│   ├── middleware/
│   │   └── auth.js                # Authentication middleware
│   ├── models/
│   │   ├── Admin.js               # Admin user model
│   │   ├── ChatLog.js             # Chat conversation model
│   │   └── FAQ.js                 # FAQ model
│   ├── routes/
│   │   ├── admin.js               # Admin routes
│   │   ├── chat.js                # Chat routes
│   │   └── faq.js                 # FAQ routes
│   ├── services/
│   │   └── aiService.js           # OpenAI AI service integration
│   ├── db.js                      # Database connection management
│   ├── env.example                # Environment variables template
│   ├── package.json               # Backend dependencies
│   ├── seedData.js                # Database seeding script
│   └── server.js                  # Main server file
├── frontend/
│   ├── css/
│   │   ├── admin.css              # Admin panel styles
│   │   └── style.css              # Main application styles
│   ├── js/
│   │   ├── admin.js               # Admin panel functionality
│   │   ├── api.js                 # API communication layer
│   │   ├── chat.js                # Chat interface logic
│   │   ├── config.js              # Configuration and utilities
│   │   ├── main.js                # Application entry point
│   │   └── ui.js                  # UI utilities and components
│   ├── admin.html                 # Admin panel page
│   └── index.html                 # Main chatbot page
└── README.md                      # This file
```

## 🧪 Testing the Application

### Test the Chatbot
Try these sample questions:
- "What are the admission requirements?"
- "How much are the tuition fees?"
- "What courses do you offer?"
- "When are the exams?"
- "What events are coming up?"
- "Tell me about campus facilities"

### Test the Admin Panel
1. Login to admin panel
2. Add a new FAQ
3. Edit existing FAQs
4. Check analytics and chat logs
5. Test the search and filter functionality

## 🔧 Configuration

### Adding New FAQ Categories
1. Update `CONFIG.CATEGORIES` in `frontend/js/config.js`
2. Add corresponding icons and labels
3. Update the FAQ form in `admin.html`

### Customizing NLP Behavior
Edit `backend/controllers/chatController.js` to:
- Adjust confidence thresholds
- Modify similarity algorithms
- Add new keyword patterns
- Customize response templates

### Styling Customization
- **Main app:** Edit `frontend/css/style.css`
- **Admin panel:** Edit `frontend/css/admin.css`
- **Colors/themes:** Update CSS custom properties in `:root`

## 🚀 Deployment

### Docker Deployment (Recommended)

#### Quick Start with Docker Compose
```bash
# Clone the repository
git clone <repository-url>
cd college-query-chatbot

# Set up environment variables
cp env.example .env
# Edit .env with your configuration

# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

#### Development with Docker
```bash
# Start only database services for development
docker-compose -f docker-compose.dev.yml up -d

# Run the backend locally
cd backend
npm install
npm run dev
```

#### Production Environment Variables
```env
NODE_ENV=production
PORT=3000
MONGO_URI=mongodb://admin:password123@mongodb:27017/college_chatbot?authSource=admin
JWT_SECRET=generate_a_secure_random_string_here_32_characters_min
OPENAI_API_KEY=your_openai_api_key_here
```

### Deployment Options
1. **Docker Compose** (Recommended for VPS, AWS EC2, DigitalOcean)
2. **Traditional Hosting** (VPS, AWS EC2, DigitalOcean)
3. **Platform as a Service** (Heroku, Vercel, Railway)
4. **Containerized** (Docker, Kubernetes)

### Security Checklist
- ✅ Change default admin credentials
- ✅ Use strong JWT secret
- ✅ Enable HTTPS in production
- ✅ Set up proper CORS policies
- ✅ Implement rate limiting
- ✅ Regular security updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
```bash
# Make sure MongoDB is running
mongod

# Or check if MongoDB service is started
# Windows: net start MongoDB
# Linux/macOS: sudo systemctl start mongod
```

**Port Already in Use:**
```bash
# Find and kill process using port 3000
# Windows: netstat -ano | findstr :3000
# Linux/macOS: lsof -ti:3000 | xargs kill
```

**Dependencies Issues:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Getting Help
- Check the console for error messages
- Verify all environment variables are set correctly
- Ensure MongoDB is running and accessible
- Check that all dependencies are installed

## 🎯 Future Enhancements

- 🔤 **Multi-language support**
- 🎙️ **Voice interaction capabilities**
- 📊 **Advanced analytics and reporting**
- 🔗 **Integration with college management systems**
- 📱 **Mobile app development**
- 🤖 **Advanced AI/ML models for better responses**
- 📧 **Email notifications and alerts**
- 🌐 **RESTful API documentation with Swagger**

---

**Built with ❤️ for better student experience**