"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _services = require("../../services");

var _snippets = require("../ui/snippets");

var _EditableTable = _interopRequireDefault(require("../ui/table/EditableTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var DKP =
/*#__PURE__*/
function (_Component) {
  _inherits(DKP, _Component);

  function DKP() {
    var _this;

    _classCallCheck(this, DKP);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DKP).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSearchMember", function (e) {
      var players = _this.state.players;
      var searchValue = e.target.value;
      var searchedPlayers = players.filter(function (p) {
        return p.name.includes(searchValue);
      });

      _this.setState({
        searchValue: searchValue,
        searchedPlayers: searchedPlayers
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSelectRows", function (selectedRowKeys) {
      _this.setState({
        selectedRowKeys: selectedRowKeys
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hideAddModal", function () {
      _this.setState({
        addVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hideChangeModal", function () {
      _this.setState({
        changeVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onConfirmAddMember", function (values) {
      var players = _this.state.players;

      _this.setState({
        confirmLoading: true
      }, function () {
        _services.PlayerService.addPlayer(values).then(function (res) {
          players.push(res.data);
          setTimeout(function () {
            _this.setState({
              players: players,
              addVisible: false,
              confirmLoading: false
            }, function () {
              _antd.message.success('成功添加玩家');
            });
          }, 1500);
        }).catch(function (err) {
          return console.log(err);
        });
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSubmitScoreChange", function (scoreObj) {
      var _this$state = _this.state,
          players = _this$state.players,
          selectedRowKeys = _this$state.selectedRowKeys;

      _services.PlayerService.addOrReducePlayerDKPScore({
        scoreObj: scoreObj,
        selectedPlayers: selectedRowKeys
      }).then(function () {
        players.forEach(function (p) {
          if (selectedRowKeys.includes(p._id)) {
            if (scoreObj.action.action === 'A') {
              p.scores.history_total_dkp += parseInt(scoreObj.value, 10);
              p.scores.left_total_dkp += parseInt(scoreObj.value, 10);
            } else {
              p.scores.left_total_dkp -= parseInt(scoreObj.value, 10);
            }

            p.scores_history.push({
              label: scoreObj.label,
              action: scoreObj.action.value,
              value: scoreObj.value,
              created_at: scoreObj.createdAt
            });
            p.scores.auction_dkp = Math.trunc(p.scores.left_total_dkp * 0.7);
          }
        });

        _this.setState({
          changeVisible: false,
          players: players,
          searchedPlayers: players
        }, function () {
          return _antd.message.success('修改成功！');
        });
      }).catch(function (err) {
        return console.log(err);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "saveEditRow", function (newData, newItem) {
      _this.setState({
        players: newData,
        searchedPlayers: newData
      }, function () {
        _services.PlayerService.editPlayerScoresInfo(newItem).then(function () {
          _antd.message.success('保存成功');
        }).catch(function (err) {
          return console.log(err);
        });
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "confirmDeleteItem", function (pId) {
      var players = _this.state.players;

      _services.PlayerService.deletePlayer(pId).then(function () {
        var newPlayers = players.filter(function (p) {
          return p._id !== pId;
        });

        _this.setState({
          players: newPlayers,
          searchedPlayers: newPlayers
        }, function () {
          _antd.message.success('删除成功');
        });
      }).catch(function (err) {
        return console.log(err);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "showAddModal", function () {
      _this.setState({
        addVisible: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "showScoreChangeModal", function () {
      var selectedRowKeys = _this.state.selectedRowKeys;

      if (!selectedRowKeys.length) {
        return _antd.message.warn('请先选择需要操作的玩家！');
      }

      _this.setState({
        changeVisible: true
      });
    });

    _this.state = {
      searchValue: '',
      selectedRowKeys: [],
      addVisible: false,
      changeVisible: false,
      confirmLoading: false,
      players: [],
      searchedPlayers: []
    };
    return _this;
  }

  _createClass(DKP, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _services.PlayerService.getAllPlayers().then(function (data) {
        _this2.setState({
          players: data,
          searchedPlayers: data
        });
      }).catch(function (err) {
        return console.log(err);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state2 = this.state,
          searchValue = _this$state2.searchValue,
          selectedRowKeys = _this$state2.selectedRowKeys,
          addVisible = _this$state2.addVisible,
          changeVisible = _this$state2.changeVisible,
          confirmLoading = _this$state2.confirmLoading,
          searchedPlayers = _this$state2.searchedPlayers;
      var currentUser = this.props.currentUser;
      var batchPlayersNameString = selectedRowKeys.map(function (rowKey) {
        var player = searchedPlayers.find(function (sp) {
          return sp._id === rowKey;
        });
        return player ? player.name : '';
      }).join(', ');
      return _react.default.createElement("div", {
        className: "dkp"
      }, _react.default.createElement(_antd.Row, {
        className: "search-box"
      }, _react.default.createElement(_antd.Col, {
        span: 10
      }, _react.default.createElement(_antd.Input, {
        size: "large",
        placeholder: "\u641C\u7D22",
        value: searchValue,
        onChange: function onChange(e) {
          return _this3.onSearchMember(e);
        }
      })), currentUser && currentUser.role === 'admin' && _react.default.createElement(_antd.Col, {
        span: 14
      }, _react.default.createElement(_antd.Button, {
        type: "primary",
        className: "add-member",
        onClick: function onClick() {
          return _this3.showAddModal();
        }
      }, "\u6DFB\u52A0\u6210\u5458"), _react.default.createElement(_antd.Button, {
        type: "primary",
        ghost: true,
        onClick: function onClick() {
          return _this3.showScoreChangeModal();
        }
      }, "\u6279\u91CF\u64CD\u4F5C"))), _react.default.createElement(_snippets.AddPlayerForm, {
        addVisible: addVisible,
        onConfirmAddMember: function onConfirmAddMember(values) {
          return _this3.onConfirmAddMember(values);
        },
        hideAddModal: function hideAddModal(values) {
          return _this3.hideAddModal(values);
        },
        confirmLoading: confirmLoading
      }), _react.default.createElement(_snippets.CalculateScoresForm, {
        changeVisible: changeVisible,
        onSubmitScoreChange: function onSubmitScoreChange(scoreObj) {
          return _this3.onSubmitScoreChange(scoreObj);
        },
        hideChangeModal: function hideChangeModal() {
          return _this3.hideChangeModal();
        },
        confirmLoading: confirmLoading,
        batchPlayersNameString: batchPlayersNameString
      }), _react.default.createElement(_EditableTable.default, {
        dataSource: searchedPlayers,
        currentUser: currentUser,
        onSelectRows: function onSelectRows(rows) {
          return _this3.onSelectRows(rows);
        },
        saveEditRow: function saveEditRow(data, newItem) {
          return _this3.saveEditRow(data, newItem);
        },
        onDeleteItem: function onDeleteItem(pId) {
          return _this3.confirmDeleteItem(pId);
        }
      }));
    }
  }]);

  return DKP;
}(_react.Component);

exports.default = DKP;
module.exports = exports.default;