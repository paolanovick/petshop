const mongoose = require('mongoose');

let connectionPromise;

const connectDB = () => {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose.connection);
  }

  if (!connectionPromise) {
    if (!process.env.MONGODB_URI) {
      return Promise.reject(new Error('MONGODB_URI is required'));
    }

    connectionPromise = mongoose.connect(process.env.MONGODB_URI)
      .then(() => {
        connectionPromise = null;
        return mongoose.connection;
      })
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  return connectionPromise;
};

module.exports = connectDB;
