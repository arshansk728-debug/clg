const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('./frontend'));

// Mock responses for testing
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'College Chatbot API is running (Test Mode)',
    timestamp: new Date().toISOString(),
    database: { status: 'mock' }
  });
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  
  // Mock response
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

app.get('/api/chat/suggestions', (req, res) => {
  res.json({
    success: true,
    data: [
      { question: 'What courses are available?', category: 'courses' },
      { question: 'How do I apply for admission?', category: 'admissions' },
      { question: 'What are the fees?', category: 'fees' },
      { question: 'When are the exams?', category: 'exams' },
      { question: 'What facilities are available?', category: 'facilities' }
    ]
  });
});

app.get('/api/chat/quick-actions', (req, res) => {
  res.json({
    success: true,
    data: [
      { text: 'Admission Process', category: 'admissions' },
      { text: 'Fee Structure', category: 'fees' },
      { text: 'Course Details', category: 'courses' },
      { text: 'Exam Schedule', category: 'exams' },
      { text: 'College Events', category: 'events' },
      { text: 'Facilities', category: 'facilities' },
      { text: 'Scholarships', category: 'scholarships' },
      { text: 'Contact Information', category: 'general' }
    ]
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
  console.log(`🚀 Test Server running on http://localhost:${PORT}`);
  console.log(`📱 Student Chat: http://localhost:${PORT}`);
  console.log(`👨‍💼 Admin Panel: http://localhost:${PORT}/admin.html`);
  console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
  console.log('\n⚠️  This is TEST MODE - No database required!');
  console.log('💡 For full functionality, set up MongoDB and OpenAI API key');
});
