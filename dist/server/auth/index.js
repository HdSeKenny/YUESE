"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _environment = _interopRequireDefault(require("../config/environment"));

var _user = _interopRequireDefault(require("../api/user/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Passport Configuration
require('./local/passport').setup(_user.default, _environment.default);

var router = _express.default.Router();

router.use('/local', require('./local'));
var _default = router;
exports.default = _default;
module.exports = exports.default;