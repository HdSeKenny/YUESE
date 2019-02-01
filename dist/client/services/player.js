"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  addPlayer: function addPlayer(data) {
    return new Promise(function (resolve, reject) {
      (0, _axios.default)({
        method: 'post',
        url: '/api/players/add',
        data: data
      }).then(function (res) {
        resolve(res.data);
      }).catch(function (error) {
        reject(error.response);
      });
    });
  },
  getAllPlayers: function getAllPlayers() {
    return new Promise(function (resolve, reject) {
      (0, _axios.default)({
        method: 'get',
        url: '/api/players'
      }).then(function (res) {
        resolve(res.data);
      }).catch(function (error) {
        reject(error.response);
      });
    });
  },
  editPlayerScoresInfo: function editPlayerScoresInfo(newItem) {
    return new Promise(function (resolve, reject) {
      (0, _axios.default)({
        method: 'put',
        url: "/api/players/".concat(newItem._id),
        data: newItem
      }).then(function () {
        resolve();
      }).catch(function (error) {
        reject(error.response);
      });
    });
  },
  deletePlayer: function deletePlayer(pId) {
    return new Promise(function (resolve, reject) {
      var token = localStorage.getItem('id_token');
      (0, _axios.default)({
        method: 'delete',
        url: "/api/players/".concat(pId),
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      }).then(function () {
        resolve();
      }).catch(function (error) {
        reject(error.response);
      });
    });
  },
  addOrReducePlayerDKPScore: function addOrReducePlayerDKPScore(scoreObj) {
    return new Promise(function (resolve, reject) {
      var token = localStorage.getItem('id_token');
      (0, _axios.default)({
        method: 'post',
        url: '/api/players/changedkpscore',
        headers: {
          Authorization: "Bearer ".concat(token)
        },
        data: scoreObj
      }).then(function () {
        resolve();
      }).catch(function (error) {
        reject(error.response);
      });
    });
  }
};
exports.default = _default;
module.exports = exports.default;