"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _composableMiddleware = _interopRequireDefault(require("composable-middleware"));

var _environment = _interopRequireDefault(require("../config/environment"));

var _user = _interopRequireDefault(require("../api/user/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateJwt = (0, _expressJwt.default)({
  secret: _environment.default.secrets.session
});
/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */

function isAuthenticated() {
  return (0, _composableMiddleware.default)() // Validate jwt
  .use(function (req, res, next) {
    // allow access_token to be passed through query parameter as well
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = "Bearer ".concat(req.query.access_token);
    } // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.


    if (req.query && typeof req.headers.authorization === 'undefined') {
      req.headers.authorization = "Bearer ".concat(req.cookies.token);
    }

    validateJwt(req, res, next);
  }) // Attach user to request
  .use(function (req, res, next) {
    _user.default.findById(req.user._id).exec().then(function (user) {
      if (!user) {
        return res.status(401).end();
      }

      req.user = user;
      next();
      return null;
    }).catch(function (err) {
      return next(err);
    });
  });
}
/**
 * Checks if the user role meets the minimum requirements of the route
 */


function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return (0, _composableMiddleware.default)().use(isAuthenticated()).use(function (req, res, next) {
    if (_environment.default.userRoles.indexOf(req.user.role) >= _environment.default.userRoles.indexOf(roleRequired)) {
      return next();
    }

    return res.status(403).send('Forbidden');
  });
}
/**
 * Returns a jwt token signed by the app secret
 */


function signToken(id, role) {
  return _jsonwebtoken.default.sign({
    _id: id,
    role: role
  }, _environment.default.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}
/**
 * Set token cookie directly for oAuth strategies
 */


function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }

  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', token);
  res.redirect('/');
}