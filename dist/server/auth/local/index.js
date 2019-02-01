"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _auth = require("../auth.service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/', function (req, res, next) {
  _passport.default.authenticate('local', function (err, user, info) {
    var error = err || info;

    if (error) {
      return res.status(401).json(error);
    }

    if (!user) {
      return res.status(404).json({
        message: 'Something went wrong, please try again.'
      });
    }

    var token = (0, _auth.signToken)(user._id, user.role);
    res.json({
      token: token
    });
  })(req, res, next);
});
var _default = router;
exports.default = _default;
module.exports = exports.default;