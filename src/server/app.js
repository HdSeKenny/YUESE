import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
mongoose.Promise = require('bluebird')

import config from './config/environment'
// import initWebSocketServer from './config/websockets'
import expressConfig from './config/express'
import registerRoutes from './routes'
import seedDatabaseIfNeeded from './config/seed'

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options)
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`)
  process.exit(-1) // eslint-disable-line no-process-exit
})

// Setup server
const app = express()
const server = http.createServer(app)
// const wsInitPromise = initWebSocketServer(server)
expressConfig(app)
registerRoutes(app)

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, () => {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'))
  })
}

seedDatabaseIfNeeded
  .then(startServer)
  .catch((err) => {
    console.log('Server failed to start due to error: %s', err)
  })

// Expose app
exports = module.exports = app
