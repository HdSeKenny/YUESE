"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

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

var CalculateScoresForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CalculateScoresForm, _React$Component);

  function CalculateScoresForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CalculateScoresForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CalculateScoresForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      addScoreOptions: ['周五联赛第一场', '周五联赛第二场', '周六联赛', '势力战', '宣战', '野外激情', '藏金谷激情', '其他'],
      reduceScoreOptions: ['玩家拍卖扣除'],
      scorelabel: '周五联赛第一场',
      scoreValue: '',
      actions: [{
        action: 'A',
        value: '加分'
      }, {
        action: 'R',
        value: '减分'
      }],
      currentAction: {
        action: 'A',
        value: '加分'
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMenuClick", function (e) {
      _this.setState({
        scorelabel: e.key
      }, function () {});
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleActionsMenuClick", function (e) {
      var _this$state = _this.state,
          actions = _this$state.actions,
          addScoreOptions = _this$state.addScoreOptions,
          reduceScoreOptions = _this$state.reduceScoreOptions;
      var newScoreLable = e.key === '加分' ? addScoreOptions[0] : reduceScoreOptions[0];

      _this.setState({
        currentAction: actions.find(function (a) {
          return a.value === e.key;
        }),
        scorelabel: newScoreLable
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onScoreValueChange", function (e) {
      _this.setState({
        scoreValue: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSubmitScoreChange", function () {
      var _this$state2 = _this.state,
          currentAction = _this$state2.currentAction,
          scoreValue = _this$state2.scoreValue,
          scorelabel = _this$state2.scorelabel;

      if (!scoreValue.trim()) {
        return _antd.message.error('请填写分数，并且分数必须是数字');
      }

      _this.props.onSubmitScoreChange({
        action: currentAction,
        label: scorelabel,
        value: scoreValue,
        createdAt: new Date()
      });
    });

    return _this;
  }

  _createClass(CalculateScoresForm, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state3 = this.state,
          addScoreOptions = _this$state3.addScoreOptions,
          reduceScoreOptions = _this$state3.reduceScoreOptions,
          scorelabel = _this$state3.scorelabel,
          scoreValue = _this$state3.scoreValue,
          actions = _this$state3.actions,
          currentAction = _this$state3.currentAction;
      var _this$props = this.props,
          changeVisible = _this$props.changeVisible,
          hideChangeModal = _this$props.hideChangeModal,
          confirmLoading = _this$props.confirmLoading,
          batchPlayersNameString = _this$props.batchPlayersNameString;

      var addScoreMenu = _react.default.createElement(_antd.Menu, {
        onClick: function onClick(e) {
          return _this2.handleMenuClick(e);
        }
      }, addScoreOptions.map(function (aso) {
        return _react.default.createElement(_antd.Menu.Item, {
          key: aso
        }, aso);
      }));

      var reduceScoreMenu = _react.default.createElement(_antd.Menu, {
        onClick: function onClick(e) {
          return _this2.handleMenuClick(e);
        }
      }, reduceScoreOptions.map(function (rso) {
        return _react.default.createElement(_antd.Menu.Item, {
          key: rso
        }, rso);
      }));

      var actionsMenu = _react.default.createElement(_antd.Menu, {
        onClick: function onClick(e) {
          return _this2.handleActionsMenuClick(e);
        }
      }, actions.map(function (a) {
        return _react.default.createElement(_antd.Menu.Item, {
          key: a.value
        }, a.value);
      }));

      var batchPlayerTitleStyle = {
        textAlign: 'left',
        color: '#1890ff',
        fontWeight: '600',
        marginBottom: '20px'
      };
      var batchPlayerLabelStyle = {
        color: '#333',
        fontWeight: '700'
      };
      return _react.default.createElement(_antd.Modal, {
        title: "DKP\u6279\u91CF\u64CD\u4F5C",
        visible: changeVisible,
        onOk: function onOk() {
          return _this2.onSubmitScoreChange();
        },
        onCancel: function onCancel() {
          return hideChangeModal();
        },
        okText: "\u786E\u8BA4",
        cancelText: "\u53D6\u6D88",
        confirmLoading: confirmLoading
      }, _react.default.createElement("div", {
        className: "batch-players-title",
        style: batchPlayerTitleStyle
      }, _react.default.createElement("span", {
        className: "lable",
        style: batchPlayerLabelStyle
      }, "\u64CD\u4F5C\u5BF9\u8C61 : "), _react.default.createElement("span", {
        className: "names"
      }, batchPlayersNameString)), _react.default.createElement(_antd.Row, {
        style: {
          marginBottom: '15px'
        }
      }, _react.default.createElement(_antd.Col, {
        span: 5,
        style: {
          textAlign: 'left'
        }
      }, _react.default.createElement(_antd.Dropdown, {
        overlay: actionsMenu
      }, _react.default.createElement(_antd.Button, null, currentAction.value, " ", _react.default.createElement(_antd.Icon, {
        type: "down"
      })))), currentAction.action === 'A' ? _react.default.createElement(_antd.Col, {
        span: 9,
        style: {
          textAlign: 'left'
        }
      }, _react.default.createElement(_antd.Dropdown, {
        overlay: addScoreMenu
      }, _react.default.createElement(_antd.Button, {
        className: "actions-btn"
      }, scorelabel || addScoreOptions[0], " ", _react.default.createElement(_antd.Icon, {
        type: "down"
      })))) : _react.default.createElement(_antd.Col, {
        span: 9,
        style: {
          textAlign: 'left'
        }
      }, _react.default.createElement(_antd.Dropdown, {
        overlay: reduceScoreMenu
      }, _react.default.createElement(_antd.Button, {
        className: "actions-btn"
      }, scorelabel || reduceScoreOptions[0], " ", _react.default.createElement(_antd.Icon, {
        type: "down"
      })))), _react.default.createElement(_antd.Col, {
        span: 10,
        style: {
          textAlign: 'left'
        }
      }, _react.default.createElement(_antd.Input, {
        type: "number",
        value: scoreValue,
        onChange: function onChange(e) {
          return _this2.onScoreValueChange(e);
        }
      }))));
    }
  }]);

  return CalculateScoresForm;
}(_react.default.Component);

var _default = CalculateScoresForm;
exports.default = _default;
module.exports = exports.default;