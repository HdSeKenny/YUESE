"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("../api/user/user.model"));

var _player = _interopRequireDefault(require("../api/player/player.model"));

var _environment = _interopRequireDefault(require("./environment"));

var _data2 = _interopRequireDefault(require("./environment/_data2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
var _default = new Promise(function (resolve, reject) {
  if (!_environment.default.seedDB) {
    return resolve();
  }

  var userPromise = _user.default.find({}).remove().then(function () {
    return _user.default.create({
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@kenny.com',
      password: 'kuan4928..'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@yuese.com',
      password: 'yuese520'
    }).then(function () {
      return console.log('finished populating users');
    }).catch(function (err) {
      return console.log('error populating users', err);
    });
  });

  var playrPromise = _player.default.find({}).remove().then(function () {
    var _data = _data2.default.sort(function (a, b) {
      return a.scores.history_total_dkp - b.scores.history_total_dkp;
    });

    _player.default.create(_data).then(function () {
      return console.log('finished populating players');
    }).catch(function (err) {
      return console.log('error populating players', err);
    });
  });

  Promise.all([userPromise, playrPromise]).then(function () {
    return resolve();
  }).catch(function (err) {
    return reject(err);
  });
});

exports.default = _default;
module.exports = exports.default;