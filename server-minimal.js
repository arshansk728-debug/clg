const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('./frontend'));

// Mock database responses for testing
const mockFAQs = [
  {
    _id: '1',
    question: 'What courses are available?',
    answer: 'We offer various undergraduate and graduate programs in Computer Science, Business Administration, Engineering, and Liberal Arts.',
    category: 'courses',
    priority: 1,
    viewCount: 0,
    isActive: true
  },
  {
    _id: '2',
    question: 'How do I apply for admission?',
    answer: 'You can apply online through our website or visit the admissions office. Required documents include transcripts, test scores, and application fee.',
    category: 'admissions',
    priority: 1,
    viewCount: 0,
    isActive: true
  },
  {
    _id: '3',
    question: 'What are the tuition fees?',
    answer: 'Tuition fees vary by program. Please contact our financial aid office for detailed information about current rates and available scholarships.',
    category: 'fees',
    priority: 1,
    viewCount: 0,
    isActive: true
  },
  {
    _id: '4',
    question: 'When are the exams?',
    answer: 'Exam schedules are posted on our website and notice boards. Mid-term exams are usually in October and March, final exams in December and May.',
    category: 'exams',
    priority: 1,
    viewCount: 0,
    isActive: true
  },
  {
    _id: '5',
    question: 'What facilities are available?',
    answer: 'We have a modern library, computer labs, sports facilities, cafeteria, and student lounge. All facilities are open during college hours.',
    category: 'facilities',
    priority: 1,
    viewCount: 0,
    isActive: true
  }
];

// Mock AI service
const generateAIResponse = (userQuery) => {
  const responses = [
    `Based on your question about "${userQuery}", I can provide some general information. For specific details, please contact our administration directly.`,
    `That's an interesting question about "${userQuery}". While I don't have specific information about this topic in my database, I'd recommend reaching out to our relevant department for accurate details.`,
    `I understand you're asking about "${userQuery}". This is a great question that our staff would be happy to help you with. Please visit our main office or call our information line.`,
    `Regarding "${userQuery}", I can offer some general guidance. For the most current and specific information, I suggest contacting our administration or checking our official website.`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'College Chatbot API is running (Minimal Mode)',
    timestamp: new Date().toISOString(),
    database: { status: 'mock' }
  });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { message, sessionId } = req.body;
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }
    
    // Simple FAQ matching
    let bestMatch = null;
    let bestScore = 0;
    
    for (const faq of mockFAQs) {
      const questionWords = faq.question.toLowerCase().split(' ');
      const messageWords = message.toLowerCase().split(' ');
      const commonWords = questionWords.filter(word => messageWords.includes(word));
      const score = commonWords.length / Math.max(questionWords.length, messageWords.length);
      
      if (score > bestScore && score > 0.1) {
        bestScore = score;
        bestMatch = faq;
      }
    }
    
    let response;
    let source = 'ai';
    
    if (bestMatch && bestScore > 0.2) {
      response = bestMatch.answer;
      source = 'faq';
    } else {
      response = generateAIResponse(message);
      source = 'ai';
    }
    
    const responseTime = Date.now() - startTime;
    
    res.json({
      success: true,
      data: {
        response: response,
        confidence: bestScore || 0.7,
        category: bestMatch?.category || 'general',
        suggestions: mockFAQs.slice(0, 3).map(faq => ({
          question: faq.question,
          category: faq.category
        })),
        sessionId: sessionId || 'session_' + Date.now(),
        responseTime,
        source: source,
        model: source === 'ai' ? 'mock-ai' : null
      }
    });
    
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing your request'
    });
  }
});

// FAQ endpoints
app.get('/api/faq', (req, res) => {
  res.json({
    success: true,
    data: mockFAQs,
    pagination: {
      current: 1,
      total: 1,
      count: mockFAQs.length
    }
  });
});

app.get('/api/faq/:id', (req, res) => {
  const faq = mockFAQs.find(f => f._id === req.params.id);
  if (!faq) {
    return res.status(404).json({
      success: false,
      message: 'FAQ not found'
    });
  }
  res.json({
    success: true,
    data: faq
  });
});

// Chat suggestions
app.get('/api/chat/suggestions', (req, res) => {
  res.json({
    success: true,
    data: mockFAQs.map(faq => ({
      question: faq.question,
      category: faq.category
    }))
  });
});

// Quick actions
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

// AI service status
app.get('/api/chat/ai-status', (req, res) => {
  res.json({
    success: true,
    data: {
      available: false,
      model: 'not-configured',
      configured: false,
      lastChecked: new Date().toISOString()
    }
  });
});

// Test AI service
app.post('/api/chat/test-ai', (req, res) => {
  res.json({
    success: true,
    message: 'AI service test - using mock responses',
    data: {
      response: generateAIResponse('test query'),
      confidence: 0.5,
      source: 'mock'
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
  console.log(`🚀 Minimal Server running on http://localhost:${PORT}`);
  console.log(`📱 Student Chat: http://localhost:${PORT}`);
  console.log(`👨‍💼 Admin Panel: http://localhost:${PORT}/admin.html`);
  console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
  console.log('\n✅ This server works with mock data - no database or API keys required!');
  console.log('💡 Features: FAQ matching, mock AI responses, chat interface');
  console.log('🔧 To enable real AI: Add OPENAI_API_KEY to .env file');
});
