const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { connectDB, healthCheck } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Serve static files from frontend
app.use(express.static('./frontend'));

// Connect to database
connectDB();

// Routes
app.use('/api/faq', require('./routes/faq'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/admin', require('./routes/admin'));

// Default route
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './frontend' });
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const dbHealth = await healthCheck();
    res.json({ 
      status: 'OK', 
      message: 'College Chatbot API is running',
      timestamp: new Date().toISOString(),
      database: dbHealth
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Health check failed',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Fixed Server running on http://localhost:${PORT}`);
  console.log(`📱 Student Chat: http://localhost:${PORT}`);
  console.log(`👨‍💼 Admin Panel: http://localhost:${PORT}/admin.html`);
  console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
  console.log('\n✅ This server has full functionality with database support!');
  console.log('💡 Make sure MongoDB is running and .env is configured');
});
