"use strict";

/* eslint no-process-env: 0 */
// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/yuese-dev'
  },
  host: process.env.PROJECT_DEVELOPMENT_HOST || 'localhost',
  // Server port
  port: process.env.PROJECT_DEVELOPMENT_PORT || 3000,
  // Seed database on startup
  seedDB: true,
  devServer: {
    host: 'localhost',
    port: 8081
  }
};