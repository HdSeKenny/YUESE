"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _http = _interopRequireDefault(require("http"));

var _environment = _interopRequireDefault(require("./config/environment"));

var _express2 = _interopRequireDefault(require("./config/express"));

var _routes = _interopRequireDefault(require("./routes"));

var _seed = _interopRequireDefault(require("./config/seed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.Promise = require('bluebird');

// Connect to MongoDB
_mongoose.default.connect(_environment.default.mongo.uri, _environment.default.mongo.options);

_mongoose.default.connection.on('error', function (err) {
  console.error("MongoDB connection error: ".concat(err));
  process.exit(-1); // eslint-disable-line no-process-exit
}); // Setup server


var app = (0, _express.default)();

var server = _http.default.createServer(app); // const wsInitPromise = initWebSocketServer(server)


(0, _express2.default)(app);
(0, _routes.default)(app); // Start server

function startServer() {
  app.angularFullstack = server.listen(_environment.default.port, _environment.default.ip, function () {
    console.log('Express server listening on %d, in %s mode', _environment.default.port, app.get('env'));
  });
}

_seed.default.then(startServer).catch(function (err) {
  console.log('Server failed to start due to error: %s', err);
}); // Expose app


exports = module.exports = app;