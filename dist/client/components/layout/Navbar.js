"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _reactRouterDom = require("react-router-dom");

var _utils = require("../../utils");

var _services = require("../../services");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var Header = _antd.Layout.Header;

var Navbar =
/*#__PURE__*/
function (_Component) {
  _inherits(Navbar, _Component);

  function Navbar() {
    var _this;

    _classCallCheck(this, Navbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Navbar).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "logout", function () {
      _antd.message.success('成功退出');

      localStorage.removeItem('current_user');
      localStorage.removeItem('id_token');
      window.location.reload();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getCurrentUser", function () {
      if (localStorage.getItem('id_token')) {
        _services.UserService.getCurrentUser().then(function (data) {
          _this.setState({
            currentUser: data
          });
        }).catch(function (err) {
          return console.log(err);
        });
      }
    });

    _this.state = {
      currentUser: null,
      style: {
        lineHeight: '64px',
        float: 'right'
      },
      logo: {
        width: '60px',
        height: '32px',
        uri: '/assets/logo/logo.png'
      }
    };
    return _this;
  }

  _createClass(Navbar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.getCurrentUser();

      _utils.EventClient.on('login_success', function () {
        return _this2.getCurrentUser();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          style = _this$state.style,
          logo = _this$state.logo,
          currentUser = _this$state.currentUser;
      return _react.default.createElement(Header, {
        className: "header"
      }, _react.default.createElement("div", {
        className: "logo"
      }, _react.default.createElement(_reactRouterDom.Link, {
        to: "/"
      }, _react.default.createElement("img", {
        src: logo.uri,
        alt: "logo",
        width: logo.width
      }))), _react.default.createElement(_antd.Menu, {
        theme: "",
        mode: "horizontal",
        defaultSelectedKeys: ['1'],
        style: style
      }, _react.default.createElement(_antd.Menu.Item, {
        key: "1",
        className: "dkp-system"
      }, "DKP SYSTEM")), currentUser && _react.default.createElement("li", {
        className: "ant-menu-item",
        role: "menuitem",
        onClick: function onClick() {
          return _this3.logout();
        }
      }, "\u767B\u51FA"), currentUser && _react.default.createElement("li", {
        className: "ant-menu-item",
        role: "menuitem"
      }, _react.default.createElement(_reactRouterDom.Link, {
        to: "/backup"
      }, "\u5907\u4EFD")));
    }
  }]);

  return Navbar;
}(_react.Component);

var _default = (0, _reactRouterDom.withRouter)(Navbar);

exports.default = _default;
module.exports = exports.default;