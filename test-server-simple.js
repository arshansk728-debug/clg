const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('./frontend'));

// Test route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'College Chatbot API is running (Simple Test Mode)',
    timestamp: new Date().toISOString()
  });
});

// Mock chat endpoint
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  
  const responses = [
    "Hello! I'm your College Assistant. I can help you with questions about admissions, courses, fees, and more!",
    "That's a great question! In test mode, I can provide general information. For specific details, please contact our administration.",
    "I understand you're asking about college information. This is a test response - the full system will have AI-powered answers!",
    "Thanks for your question! The chatbot is currently in test mode. The full version will have comprehensive FAQ and AI responses."
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  res.json({
    success: true,
    data: {
      response: randomResponse,
      confidence: 0.8,
      category: 'general',
      suggestions: [
        { question: 'What courses are available?', category: 'courses' },
        { question: 'How do I apply for admission?', category: 'admissions' },
        { question: 'What are the fees?', category: 'fees' }
      ],
      sessionId: 'test_session_' + Date.now(),
      responseTime: 100,
      source: 'test',
      model: null
    }
  });
});

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/index.html'));
});

// Admin route
app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/admin.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Simple Test Server running on http://localhost:${PORT}`);
  console.log(`📱 Student Chat: http://localhost:3000`);
  console.log(`👨‍💼 Admin Panel: http://localhost:3000/admin.html`);
  console.log(`🔍 Health Check: http://localhost:3000/api/health`);
  console.log('\n✅ This server works without database requirements!');
  console.log('💡 For full functionality, fix the main server and set up MongoDB');
});

