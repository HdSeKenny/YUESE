"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

_mongoose.default.Promise = require('bluebird');
var PlayerSchema = new _mongoose.Schema({
  name: String,
  scores: {
    history_total_dkp: Number,
    left_total_dkp: Number,
    auction_dkp: Number,
    player_total_score: Number
  },
  scores_history: [{
    scoreLabel: String,
    actionValue: String,
    scoreValue: String,
    createdAt: String
  }]
}); // Public profile information
// PlayerSchema.virtual('profile').get(function () {
//   return {
//     name: this.name,
//     scores: this.scores
//   }
// })

var _default = _mongoose.default.model('Player', PlayerSchema);

exports.default = _default;
module.exports = exports.default;