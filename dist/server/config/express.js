"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _express = _interopRequireDefault(require("express"));

var _serveFavicon = _interopRequireDefault(require("serve-favicon"));

var _morgan = _interopRequireDefault(require("morgan"));

var _compression = _interopRequireDefault(require("compression"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _methodOverride = _interopRequireDefault(require("method-override"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _errorhandler = _interopRequireDefault(require("errorhandler"));

var _path = _interopRequireDefault(require("path"));

var _lusca = _interopRequireDefault(require("lusca"));

var _passport = _interopRequireDefault(require("passport"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _fs = _interopRequireDefault(require("fs"));

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _reactRouterDom = require("react-router-dom");

var _App = _interopRequireDefault(require("../../client/components/App"));

var _errors = _interopRequireDefault(require("../components/errors"));

var _environment = _interopRequireDefault(require("./environment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoStore = (0, _connectMongo.default)(_expressSession.default);

function _default(app) {
  var env = app.get('env');

  if (env === 'production') {
    app.use((0, _serveFavicon.default)(_path.default.join(_environment.default.root, '..', 'public', 'favicon.ico')));
    app.use(_express.default.static('dist/build'));
  }

  app.use((0, _morgan.default)('dev'));
  app.set('appPath', _path.default.join(_environment.default.root, 'client'));
  app.use(_express.default.static('src'));
  app.set('views', _path.default.join(_environment.default.root, 'server', 'views'));
  app.set('view engine', 'html');
  app.engine('html', require('ejs').renderFile);
  app.use((0, _compression.default)());
  app.use(_bodyParser.default.urlencoded({
    extended: false
  }));
  app.use(_bodyParser.default.json());
  app.use((0, _methodOverride.default)());
  app.use((0, _cookieParser.default)());
  app.use(_passport.default.initialize()); // Persist sessions with MongoStore / sequelizeStore
  // We need to enable sessions for passport-twitter because it's an
  // oauth 1.0 strategy, and Lusca depends on sessions

  app.use((0, _expressSession.default)({
    secret: _environment.default.secrets.session,
    saveUninitialized: true,
    name: 'tms',
    resave: false,
    store: new MongoStore({
      mongooseConnection: _mongoose.default.connection,
      db: 'server'
    })
  }));
  /**
   * Lusca - express server security
   * https://github.com/krakenjs/lusca
   */

  if (env !== 'test' && env !== 'development' && !process.env.SAUCE_USERNAME) {// eslint-disable-line no-process-env
    // app.use(
    //   lusca({
    //     csrf: true,
    //     xframe: 'SAMEORIGIN',
    //     hsts: {
    //       maxAge: 31536000, // 1 year, in seconds
    //       includeSubDomains: true,
    //       preload: true
    //     },
    //     xssProtection: true
    //   })
    // )
  }

  if (env === 'development' || env === 'test') {
    app.use((0, _errorhandler.default)()); // Error handler - has to be last
  } // Insert routes below


  app.use('/api/users', require('../api/user'));
  app.use('/api/players', require('../api/player'));
  app.use('/auth', require('../auth')); // All undefined asset or api routes should return a 404
  // All other routes should redirect to the app.html

  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(_errors.default[404]);
  app.use(function (req, res) {
    var context = {};

    var appHtmlString = _server.default.renderToString(_react.default.createElement(_reactRouterDom.StaticRouter, {
      location: req.url,
      context: context
    }, _react.default.createElement(_App.default, null))); // const indexFilePath = env === 'production' ?


    var proPath = _path.default.resolve(_environment.default.root, '..', 'dist', 'build', 'index.html');

    var devPath = _path.default.resolve(app.get('appPath'), 'index.html');

    var indexFile = env === 'production' ? proPath : devPath;

    _fs.default.readFile(indexFile, 'utf8', function (err, data) {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }

      return res.send(data.replace('<div id="root"></div>', "<div id=\"root\">".concat(appHtmlString, "</div>")));
    });
  });
}

module.exports = exports.default;