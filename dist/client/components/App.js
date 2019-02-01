"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _reactRouterDom = require("react-router-dom");

var _layout = require("./layout");

var _pages = require("./pages");

var _services = require("../services");

var _utils = require("../utils");

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

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props => (
//       fakeAuth.isAuthenticated === true
//         ? <Component {...props} />
//         : <Redirect to="/login" />
//     )}
//   />
// )
var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getCurrentUser", function () {
      _services.UserService.getCurrentUser().then(function (data) {
        _this.setState({
          currentUser: data
        });
      }).catch(function () {
        if (localStorage.getItem('id_token')) {
          localStorage.removeItem('id_token');
        }
      });
    });

    _this.state = {
      currentUser: null
    };
    return _this;
  }

  _createClass(App, [{
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
      var currentUser = this.state.currentUser;
      return _react.default.createElement("div", {
        className: "app"
      }, _react.default.createElement(_antd.Layout, null, _react.default.createElement(_layout.Navbar, {
        currentUser: currentUser
      }), _react.default.createElement(_antd.Layout.Content, null, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
        exact: true,
        path: "/",
        component: function component() {
          return _react.default.createElement(_pages.DKP, {
            currentUser: currentUser
          });
        }
      }), _react.default.createElement(_reactRouterDom.Route, {
        path: "/admin",
        component: function component() {
          return _react.default.createElement(_pages.Admin, {
            currentUser: currentUser
          });
        }
      }), _react.default.createElement(_reactRouterDom.Route, {
        path: "*",
        exact: true,
        component: function component() {
          return _react.default.createElement(_pages.DKP, {
            currentUser: currentUser
          });
        }
      }))), _react.default.createElement(_layout.Footer, null)));
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;
module.exports = exports.default;