"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import errors from './components/errors'
function _default(app) {
  // // Insert routes below
  // app.use('/api/users', require('./api/user'))
  // app.use('/api/players', require('./api/player'))
  // app.use('/auth', require('./auth'))
  // // All undefined asset or api routes should return a 404
  // // All other routes should redirect to the app.html
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404])
  app.route('/*').get(function (req, res) {
    var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    var indexPath = env === 'production' ? '/build/index.html' : "".concat(app.get('appPath'), "/index.html");
    res.sendFile(_path.default.resolve(indexPath));
  });
}

module.exports = exports.default;