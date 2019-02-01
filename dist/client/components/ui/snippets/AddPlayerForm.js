"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RegistrationForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RegistrationForm, _React$Component);

  function RegistrationForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RegistrationForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RegistrationForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSubmit", function () {
      _this.props.form.validateFieldsAndScroll(function (err, values) {
        if (!err) {
          _this.props.onConfirmAddMember(values);
        }
      });
    });

    return _this;
  }

  _createClass(RegistrationForm, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          form = _this$props.form,
          addVisible = _this$props.addVisible,
          hideAddModal = _this$props.hideAddModal,
          confirmLoading = _this$props.confirmLoading;
      var getFieldDecorator = form.getFieldDecorator;
      var formItemLayout = {
        labelCol: {
          xs: {
            span: 16
          },
          sm: {
            span: 6
          }
        },
        wrapperCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 18
          }
        }
      };
      return _react.default.createElement(_antd.Modal, {
        title: "\u6DFB\u52A0\u6210\u5458",
        visible: addVisible,
        onOk: function onOk() {
          return _this2.handleSubmit();
        },
        onCancel: function onCancel() {
          return hideAddModal();
        },
        okText: "\u786E\u8BA4",
        cancelText: "\u53D6\u6D88",
        confirmLoading: confirmLoading
      }, _react.default.createElement(_antd.Form, null, _react.default.createElement(_antd.Form.Item, _extends({}, formItemLayout, {
        label: "\u73A9\u5BB6\u6635\u79F0"
      }), getFieldDecorator('name', {
        rules: [{
          required: true,
          message: '请输入玩家的昵称'
        }]
      })(_react.default.createElement(_antd.Input, null))), _react.default.createElement(_antd.Form.Item, _extends({}, formItemLayout, {
        label: "\u5386\u53F2DKP\u603B\u5206"
      }), getFieldDecorator('history_total_dkp', {
        rules: [{
          required: true,
          message: '请输入玩家的历史DKP'
        }]
      })(_react.default.createElement(_antd.Input, {
        type: "number"
      }))), _react.default.createElement(_antd.Form.Item, _extends({}, formItemLayout, {
        label: "\u5269\u4F59DKP"
      }), getFieldDecorator('left_total_dkp', {
        rules: [{
          required: true,
          message: '请输入玩家剩余的DKP'
        }]
      })(_react.default.createElement(_antd.Input, {
        type: "number"
      }))), _react.default.createElement(_antd.Form.Item, _extends({}, formItemLayout, {
        label: "\u73A9\u5BB6\u603B\u8BC4"
      }), getFieldDecorator('player_total_score', {
        rules: [{
          required: true,
          message: '请输入玩家的总评分'
        }]
      })(_react.default.createElement(_antd.Input, {
        type: "number"
      })))));
    }
  }]);

  return RegistrationForm;
}(_react.default.Component);

var _default = _antd.Form.create({
  name: 'add'
})(RegistrationForm);

exports.default = _default;
module.exports = exports.default;