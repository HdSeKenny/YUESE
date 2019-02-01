"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _reactRouterDom = require("react-router-dom");

var _utils = require("../../utils");

var _user = _interopRequireDefault(require("../../services/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NormalLoginForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NormalLoginForm, _React$Component);

  function NormalLoginForm() {
    var _this;

    _classCallCheck(this, NormalLoginForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NormalLoginForm).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSubmit", function (e) {
      e.preventDefault();

      _this.props.form.validateFields(function (err, values) {
        if (!err) {
          var email = values.email,
              password = values.password;

          _user.default.login(email, password).then(function () {
            _antd.message.success('登录成功！');

            _utils.EventClient.emit('login_success');

            _this.props.history.push('/');
          }).catch(function (error) {
            _this.setState({
              errorMessage: error.data.message
            });
          });
        }
      });
    });

    _this.state = {
      errorMessage: ''
    };
    return _this;
  }

  _createClass(NormalLoginForm, [{
    key: "render",
    value: function render() {
      var errorMessage = this.state.errorMessage;
      var getFieldDecorator = this.props.form.getFieldDecorator;
      return _react.default.createElement(_antd.Form, {
        onSubmit: this.handleSubmit,
        className: "login-form"
      }, errorMessage && _react.default.createElement(_antd.Row, null, _react.default.createElement("p", {
        className: "text-error"
      }, errorMessage)), _react.default.createElement(_antd.Row, {
        className: "form-title"
      }, _react.default.createElement("h2", {
        className: "color-6"
      }, "\u7BA1\u7406\u5458\u767B\u5F55")), _react.default.createElement(_antd.Row, null, _react.default.createElement(_antd.Form.Item, null, getFieldDecorator('email', {
        rules: [{
          type: 'email',
          message: 'The input is not valid E-mail!'
        }, {
          required: true,
          message: 'Please input your E-mail!'
        }]
      })(_react.default.createElement(_antd.Input, {
        prefix: _react.default.createElement(_antd.Icon, {
          type: "user",
          style: {
            color: 'rgba(0,0,0,.25)'
          }
        }),
        placeholder: "Username"
      })))), _react.default.createElement(_antd.Row, null, _react.default.createElement(_antd.Form.Item, null, getFieldDecorator('password', {
        rules: [{
          required: true,
          message: 'Please input your Password!'
        }]
      })(_react.default.createElement(_antd.Input, {
        prefix: _react.default.createElement(_antd.Icon, {
          type: "lock",
          style: {
            color: 'rgba(0,0,0,.25)'
          }
        }),
        type: "password",
        placeholder: "Password"
      })))), _react.default.createElement(_antd.Row, null, _react.default.createElement(_antd.Form.Item, {
        className: "remember-me"
      }, getFieldDecorator('remember', {
        valuePropName: 'checked',
        initialValue: true
      })(_react.default.createElement(_antd.Checkbox, null, "\u8BB0\u4F4F\u6211")))), _react.default.createElement(_antd.Row, null, _react.default.createElement(_antd.Button, {
        type: "primary",
        htmlType: "submit",
        className: "login-btn"
      }, "\u767B\u5F55")));
    }
  }]);

  return NormalLoginForm;
}(_react.default.Component);

var NormalLogin = _antd.Form.create({
  name: 'normal_login'
})(NormalLoginForm);

var _default = (0, _reactRouterDom.withRouter)(NormalLogin);

exports.default = _default;
module.exports = exports.default;