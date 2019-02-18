"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.create = create;
exports.show = show;
exports.destroy = destroy;
exports.upsert = upsert;
exports.changePlayersDKPScore = changePlayersDKPScore;

var _player = _interopRequireDefault(require("./player.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import config from '../../config/environment'
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;

  if (res.salt) {
    Reflect.deleteProperty(res, 'salt');
  }

  if (res.password) {
    Reflect.deleteProperty(res, 'password');
  }

  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }

    return null;
  };
}

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    return res.status(statusCode).send(err);
  };
}
/**
 * Get list of players
 */


function index(req, res) {
  return _player.default.find({}).exec().then(function (players) {
    res.status(200).json(players);
  }).catch(handleError(res));
}
/**
 * Creates a new player
 */


function create(req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      history_total_dkp = _req$body.history_total_dkp,
      left_total_dkp = _req$body.left_total_dkp,
      player_total_score = _req$body.player_total_score;
  var player = {
    name: name,
    scores: {
      history_total_dkp: history_total_dkp,
      // 历史总分
      left_total_dkp: left_total_dkp,
      // 剩余的DKP总分
      auction_dkp: Math.trunc(left_total_dkp * 0.7),
      // 剩余DKP总分的百分之70
      player_total_score: player_total_score
    }
  };
  var newPlayer = new _player.default(player);
  newPlayer.role = 'player';
  return newPlayer.save().then(function (savedPlayer) {
    res.json({
      data: savedPlayer
    });
  }).catch(validationError(res));
}
/**
 * Get a single user
 */


function show(req, res, next) {
  return _player.default.findById(req.params.id).exec().then(function (user) {
    if (!user) {
      return res.status(404).end();
    }

    res.json(user.profile);
  }).catch(function (err) {
    return next(err);
  });
}
/**
 * Deletes a user
 * restriction: 'admin'
 */


function destroy(req, res) {
  return _player.default.findByIdAndRemove(req.params.id).exec().then(function () {
    res.status(204).end();
  }).catch(handleError(res));
} // Upserts the given Thing in the DB at the specified ID


function upsert(req, res) {
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  req.body.scores.auction_dkp = Math.trunc(req.body.scores.left_total_dkp * 0.7);
  return _player.default.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true
  }).exec().then(respondWithResult(res)).catch(handleError(res));
}

var findOneAndUpdate = function findOneAndUpdate(id, item) {
  return function () {
    return new Promise(function (resolve, reject) {
      _player.default.findById(id).exec().then(function (player) {
        if (!player) {
          return reject(new Error('No such player'));
        }

        if (!player.scores_history) {
          player.scores_history = [];
        }

        if (item.action.action === 'A') {
          player.scores.history_total_dkp += parseInt(item.value, 10);
          player.scores.left_total_dkp += parseInt(item.value, 10);
        } else {
          player.scores.left_total_dkp -= parseInt(item.value, 10);
        }

        player.scores.auction_dkp = Math.trunc(player.scores.left_total_dkp * 0.7); // 剩余DKP总分的百分之70

        player.scores_history.push({
          label: item.label,
          action: item.action.value,
          value: item.value,
          created_at: item.created_at
        });
        player.save().then(function () {
          return resolve();
        }).catch(function (err) {
          return reject(err);
        });
      }).catch(function (err) {
        return reject(err);
      });
    });
  };
};

function changePlayersDKPScore(req, res) {
  var playerIds = req.body.selectedPlayers;
  var item = req.body.scoreObj;
  var updatePromises = playerIds.map(function (pid) {
    return findOneAndUpdate(pid, item);
  });
  return Promise.all(updatePromises.map(function (up) {
    return up();
  })).then(function () {
    return res.status(200).json({});
  }).catch(handleError(res));
}