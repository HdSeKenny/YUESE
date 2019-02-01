"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = setup;

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function localAuthenticate(User, email, password, done) {
  User.findOne({
    email: email.toLowerCase()
  }).exec().then(function (user) {
    if (!user) {
      return done(null, false, {
        message: '你登录的用户没有注册'
      });
    }

    user.authenticate(password, function (authError, authenticated) {
      if (authError) {
        return done(authError);
      }

      if (!authenticated) {
        return done(null, false, {
          message: '你输入的密码不正确'
        });
      }

      return done(null, user);
    });
  }).catch(function (err) {
    return done(err);
  });
}

function setup(User
/*, config*/
) {
  _passport.default.use(new _passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model

  }, function (email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
}