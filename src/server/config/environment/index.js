

/*eslint no-process-env:0 */

import path from 'path'
import _ from 'lodash'

/*function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
} */
// All configurations will extend these options
// ============================================
const all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(`${__dirname}/../../..`),

  host: '127.0.0.1',
  // Server port
  port: 3000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'server-secret'
  },

  // MongoDB connection options
  mongo: {
    options: {
      // useMongoClient: true
    }
  }
}

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(all, require('./shared'), require(`./${process.env.NODE_ENV}.js`) || {})
