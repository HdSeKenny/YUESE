"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USER_URI = {
  USERS: '/api/users',
  LOGIN: '/auth/local',
  LOAD_SESSION: '/api/users/me',
  REGISTER: '/api/users/register',
  LOGOUT: '/api/users/logout',
  BACKUP: '/api/users/backup'
};
var _default = {
  login: function login(email, password) {
    return new Promise(function (resolve, reject) {
      (0, _axios.default)({
        method: 'post',
        url: USER_URI.LOGIN,
        data: {
          email: email,
          password: password
        }
      }).then(function (res) {
        localStorage.setItem('id_token', res.data.token);
        resolve();
      }).catch(function (error) {
        reject(error.response);
      });
    });
  },
  getCurrentUser: function getCurrentUser() {
    return new Promise(function (resolve, reject) {
      var token = localStorage.getItem('id_token');

      _axios.default.get(USER_URI.LOAD_SESSION, {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      }).then(function (res) {
        localStorage.setItem('current_user', JSON.stringify(res.data));
        resolve(res.data);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
  backupPlayersData: function backupPlayersData() {
    return new Promise(function (resolve, reject) {
      var token = localStorage.getItem('id_token');
      (0, _axios.default)({
        method: 'post',
        url: USER_URI.BACKUP,
        headers: {
          Authorization: "Bearer ".concat(token)
        }
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