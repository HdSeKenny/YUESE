"use strict";

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*eslint no-process-env:0 */

/*function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
} */
// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,
  // Root path of server
  root: _path.default.normalize("".concat(__dirname, "/../../..")),
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
    options: {// useMongoClient: true
    }
  } // Export the config object based on the NODE_ENV
  // ==============================================

};
module.exports = _lodash.default.merge(all, require('./shared'), require("./".concat(process.env.NODE_ENV, ".js")) || {});