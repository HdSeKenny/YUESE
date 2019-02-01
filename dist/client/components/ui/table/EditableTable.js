"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// import 'moment/locale/zh-cn'
_moment.default.locale();

var FormItem = _antd.Form.Item;

var EditableContext = _react.default.createContext();

var EditableRow = function EditableRow(_ref) {
  var form = _ref.form,
      index = _ref.index,
      props = _objectWithoutProperties(_ref, ["form", "index"]);

  return _react.default.createElement(EditableContext.Provider, {
    value: form
  }, _react.default.createElement("tr", props));
};

var EditableFormRow = _antd.Form.create()(EditableRow);

var EditableCell =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EditableCell, _React$Component);

  function EditableCell() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EditableCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EditableCell)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getInput", function () {
      if (_this.props.inputType === 'number') {
        return _react.default.createElement(_antd.InputNumber, null);
      }

      return _react.default.createElement(_antd.Input, null);
    });

    return _this;
  }

  _createClass(EditableCell, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          editing = _this$props.editing,
          dataIndex = _this$props.dataIndex,
          title = _this$props.title,
          inputType = _this$props.inputType,
          record = _this$props.record,
          index = _this$props.index,
          restProps = _objectWithoutProperties(_this$props, ["editing", "dataIndex", "title", "inputType", "record", "index"]);

      return _react.default.createElement(EditableContext.Consumer, null, function (form) {
        var getFieldDecorator = form.getFieldDecorator;
        return _react.default.createElement("td", restProps, editing ? _react.default.createElement(FormItem, {
          style: {
            margin: 0
          }
        }, getFieldDecorator(dataIndex, {
          rules: [{
            required: true,
            message: "Please Input ".concat(title, "!")
          }],
          initialValue: record[dataIndex]
        })(_this2.getInput())) : restProps.children);
      });
    }
  }]);

  return EditableCell;
}(_react.default.Component);

var EditableTable =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(EditableTable, _React$Component2);

  function EditableTable(props) {
    var _this3;

    _classCallCheck(this, EditableTable);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(EditableTable).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "convertDataToRows", function (data) {
      return data.map(function (d) {
        return {
          key: d._id,
          name: d.name,
          history_total_dkp: d.scores.history_total_dkp,
          left_total_dkp: d.scores.left_total_dkp,
          auction_dkp: d.scores.auction_dkp,
          player_total_score: d.scores.player_total_score,
          scores_history: d.scores_history
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "handleChange", function (pagination, filters, sorter) {
      _this3.setState({
        sortedInfo: sorter
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "onSelectChange", function (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);

      _this3.setState({
        selectedRowKeys: selectedRowKeys
      }, function () {
        _this3.props.onSelectRows(selectedRowKeys);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "isEditing", function (record) {
      return record.key === _this3.state.editingKey;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "cancel", function () {
      _this3.setState({
        editingKey: ''
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "save", function (form, key) {
      form.validateFields(function (error, row) {
        if (error) {
          return;
        }

        var newData = _toConsumableArray(_this3.props.dataSource);

        var index = newData.findIndex(function (item) {
          return key === item._id;
        });
        var item;

        if (index > -1) {
          item = newData[index];
          item.name = row.name;
          item.scores = {
            auction_dkp: Math.trunc(row.left_total_dkp * 0.7),
            history_total_dkp: row.history_total_dkp,
            left_total_dkp: row.left_total_dkp,
            player_total_score: row.player_total_score
          };
          newData.splice(index, 1, _objectSpread({}, item));
        } else {
          item = {
            name: row.name,
            scores: {
              auction_dkp: Math.trunc(row.left_total_dkp * 0.7),
              history_total_dkp: row.history_total_dkp,
              left_total_dkp: row.left_total_dkp,
              player_total_score: row.player_total_score
            }
          };
          newData.push(item);
        }

        _this3.setState({
          editingKey: ''
        }, function () {
          return _this3.props.saveEditRow(newData, item);
        });
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "showConfirm", function (record) {
      _antd.Modal.confirm({
        title: '确定删除吗',
        content: '一旦删除，此数据将永远丢失，请慎重操作',
        okText: '确认',
        cancelText: '取消',
        style: {
          textAlign: 'left'
        },
        onOk: function onOk() {
          _this3.props.onDeleteItem(record.key);
        },
        onCancel: function onCancel() {
          console.log('cancel');
        }
      });
    });

    _this3.state = {
      editingKey: '',
      selectedRowKeys: [],
      // Check here to configure the default column
      sortedInfo: {}
    };
    return _this3;
  }

  _createClass(EditableTable, [{
    key: "edit",
    value: function edit(key) {
      this.setState({
        editingKey: key
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state = this.state,
          selectedRowKeys = _this$state.selectedRowKeys,
          sortedInfo = _this$state.sortedInfo;
      var _this$props2 = this.props,
          currentUser = _this$props2.currentUser,
          dataSource = _this$props2.dataSource;
      var data = this.convertDataToRows(dataSource);
      var isAdmin = currentUser && currentUser.role === 'admin';
      var rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: this.onSelectChange
      };
      var components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell
        }
      };
      this.columns = [{
        title: '昵称',
        dataIndex: 'name',
        key: 'name',
        // width: '18%',
        align: 'center',
        className: 'header name',
        editable: true
      }, {
        title: '历史DKP',
        dataIndex: 'history_total_dkp',
        key: 'history_total_dkp',
        // width: '15%',
        align: 'center',
        className: 'header',
        editable: true,
        sorter: function sorter(a, b) {
          return a.history_total_dkp - b.history_total_dkp;
        },
        sortOrder: sortedInfo.columnKey === 'history_total_dkp' && sortedInfo.order
      }, {
        title: '剩余DKP',
        dataIndex: 'left_total_dkp',
        key: 'left_total_dkp',
        // width: '15%',
        align: 'center',
        className: 'header',
        editable: true,
        sorter: function sorter(a, b) {
          return b.left_total_dkp - a.left_total_dkp;
        },
        sortOrder: sortedInfo.columnKey === 'left_total_dkp' && sortedInfo.order
      }, {
        title: '拍卖可用',
        dataIndex: 'auction_dkp',
        key: 'auction_dkp',
        // width: '15%',
        align: 'center',
        className: 'header auction_dkp',
        editable: false,
        sorter: function sorter(a, b) {
          return b.auction_dkp - a.auction_dkp;
        },
        sortOrder: sortedInfo.columnKey === 'auction_dkp' && sortedInfo.order
      }, {
        title: '总评分',
        dataIndex: 'player_total_score',
        key: 'player_total_score',
        // width: '15%',
        align: 'center',
        className: 'header',
        editable: true,
        sorter: function sorter(a, b) {
          return b.player_total_score - a.player_total_score;
        },
        sortOrder: sortedInfo.columnKey === 'player_total_score' && sortedInfo.order
      }];
      var columns = this.columns.map(function (col) {
        if (!col.editable) {
          return col;
        }

        return _objectSpread({}, col, {
          onCell: function onCell(record) {
            return {
              record: record,
              inputType: ['history_total_dkp', 'left_total_dkp', 'auction_dkp', 'player_total_score'].includes(col.dataIndex) ? 'number' : 'text',
              dataIndex: col.dataIndex,
              title: col.title,
              editing: _this4.isEditing(record),
              className: col.dataIndex
            };
          }
        });
      });
      columns.push({
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        className: 'header actions',
        render: function render(text, record) {
          var editable = _this4.isEditing(record);

          var scoresHistoryContent = _react.default.createElement("div", {
            className: "scores-history"
          }, record.scores_history.reverse().map(function (sh, idx) {
            var created_at = sh.created_at,
                label = sh.label,
                action = sh.action,
                value = sh.value;
            return _react.default.createElement("div", {
              className: "score-row",
              key: idx
            }, _react.default.createElement("p", null, _react.default.createElement("span", {
              className: "created-at"
            }, (0, _moment.default)(created_at).format('YYYY/MM/DD, hh:mm:ss'), " :"), _react.default.createElement("span", {
              className: "label"
            }, label), _react.default.createElement("span", {
              className: "action ".concat(action === '加分' ? 'add' : 'reduce')
            }, action.substring(0, 1)), _react.default.createElement("span", {
              className: "value"
            }, value, " \u5206")));
          }));

          return _react.default.createElement("div", {
            className: "table-edit"
          }, editable && isAdmin && _react.default.createElement("span", null, _react.default.createElement(EditableContext.Consumer, null, function (form) {
            return _react.default.createElement("span", {
              className: "save",
              onClick: function onClick() {
                return _this4.save(form, record.key);
              },
              style: {
                marginRight: 8
              }
            }, "\u4FDD\u5B58");
          }), _react.default.createElement(_antd.Popconfirm, {
            title: "\u786E\u5B9A\u53D6\u6D88?",
            onConfirm: function onConfirm() {
              return _this4.cancel(record.key);
            }
          }, _react.default.createElement("span", {
            className: "cancel"
          }, "\u53D6\u6D88"))), !editable && isAdmin && _react.default.createElement("span", {
            className: "edit",
            onClick: function onClick() {
              return _this4.edit(record.key);
            }
          }, "\u4FEE\u6539"), !editable && isAdmin && _react.default.createElement("span", {
            className: "delete",
            onClick: function onClick() {
              return _this4.showConfirm(record);
            }
          }, "\u5220\u9664"), _react.default.createElement(_antd.Popover, {
            content: scoresHistoryContent,
            placement: "left",
            title: "\u73A9\u5BB6\u5386\u53F2DKP\u660E\u7EC6",
            trigger: "hover"
          }, _react.default.createElement("span", {
            className: "details"
          }, "\u660E\u7EC6")));
        }
      });

      var _data = data.sort(function (a, b) {
        return b.history_total_dkp - a.history_total_dkp;
      });

      return _react.default.createElement(_antd.Table, {
        rowSelection: isAdmin ? rowSelection : null,
        components: components,
        bordered: true,
        dataSource: _data,
        columns: columns,
        onChange: this.handleChange,
        rowClassName: "editable-row",
        size: "middle",
        pagination: {
          defaultPageSize: 15
        }
      });
    }
  }]);

  return EditableTable;
}(_react.default.Component);

var _default = EditableTable;
exports.default = _default;
module.exports = exports.default;