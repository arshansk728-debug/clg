const mongoose = require('mongoose');

/**
 * Database connection configuration and management
 * Handles MongoDB connection with proper error handling and reconnection logic
 */

// Connection options
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  bufferMaxEntries: 0, // Disable mongoose buffering
  bufferCommands: false, // Disable mongoose buffering
};

// Connection state tracking
let isConnected = false;
let connectionRetries = 0;
const maxRetries = 5;

/**
 * Connect to MongoDB database
 * @param {string} mongoURI - MongoDB connection string
 * @returns {Promise<void>}
 */
const connectDB = async (mongoURI = null) => {
  try {
    // Use provided URI or environment variable or default
    const uri = mongoURI || process.env.MONGO_URI || 'mongodb://localhost:27017/college_chatbot';
    
    // Prevent multiple connections
    if (isConnected) {
      console.log('📦 Database already connected');
      return;
    }

    console.log('🔄 Connecting to MongoDB...');
    
    // Attempt connection
    await mongoose.connect(uri, connectionOptions);
    
    // Set connection state
    isConnected = true;
    connectionRetries = 0;
    
    console.log('✅ MongoDB connected successfully');
    console.log(`📍 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}:${mongoose.connection.port}`);
    
    // Set up connection event listeners
    setupConnectionListeners();
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    // Handle connection retries
    if (connectionRetries < maxRetries) {
      connectionRetries++;
      console.log(`🔄 Retrying connection (${connectionRetries}/${maxRetries})...`);
      
      // Wait before retry (exponential backoff)
      const retryDelay = Math.pow(2, connectionRetries) * 1000;
      setTimeout(() => {
        connectDB(mongoURI);
      }, retryDelay);
    } else {
      console.error('💥 Max connection retries reached. Exiting...');
      process.exit(1);
    }
  }
};

/**
 * Setup connection event listeners
 */
const setupConnectionListeners = () => {
  // Connection successful
  mongoose.connection.on('connected', () => {
    console.log('🔗 Mongoose connected to MongoDB');
    isConnected = true;
  });

  // Connection error
  mongoose.connection.on('error', (error) => {
    console.error('❌ Mongoose connection error:', error);
    isConnected = false;
  });

  // Connection disconnected
  mongoose.connection.on('disconnected', () => {
    console.log('🔌 Mongoose disconnected from MongoDB');
    isConnected = false;
  });

  // Process termination
  process.on('SIGINT', async () => {
    console.log('\n🛑 Received SIGINT. Gracefully closing MongoDB connection...');
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
    process.exit(0);
  });

  // Process termination (alternative)
  process.on('SIGTERM', async () => {
    console.log('\n🛑 Received SIGTERM. Gracefully closing MongoDB connection...');
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
    process.exit(0);
  });
};

/**
 * Disconnect from MongoDB
 * @returns {Promise<void>}
 */
const disconnectDB = async () => {
  try {
    if (isConnected) {
      await mongoose.connection.close();
      isConnected = false;
      console.log('✅ MongoDB disconnected successfully');
    }
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error.message);
  }
};

/**
 * Get connection status
 * @returns {boolean}
 */
const isDBConnected = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

/**
 * Get connection info
 * @returns {object}
 */
const getConnectionInfo = () => {
  return {
    isConnected: isDBConnected(),
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    name: mongoose.connection.name,
    retries: connectionRetries
  };
};

/**
 * Health check for database connection
 * @returns {Promise<object>}
 */
const healthCheck = async () => {
  try {
    if (!isDBConnected()) {
      return {
        status: 'disconnected',
        message: 'Database is not connected',
        timestamp: new Date().toISOString()
      };
    }

    // Ping the database
    await mongoose.connection.db.admin().ping();
    
    return {
      status: 'connected',
      message: 'Database is healthy',
      timestamp: new Date().toISOString(),
      info: getConnectionInfo()
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Database health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

module.exports = {
  connectDB,
  disconnectDB,
  isDBConnected,
  getConnectionInfo,
  healthCheck
};
