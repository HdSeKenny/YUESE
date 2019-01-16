import Player from './player.model'
// import config from '../../config/environment'

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200
  if (res.salt) {
    Reflect.deleteProperty(res, 'salt')
  }

  if (res.password) {
    Reflect.deleteProperty(res, 'password')
  }

  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity)
    }
    return null
  }
}

function validationError(res, statusCode) {
  statusCode = statusCode || 422
  return function (err) {
    return res.status(statusCode).json(err)
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500
  return function (err) {
    return res.status(statusCode).send(err)
  }
}

/**
 * Get list of players
 */
export function index(req, res) {
  return Player.find({})
    .exec()
    .then((players) => {
      res.status(200).json(players)
    })
    .catch(handleError(res))
}


/**
 * Creates a new player
 */
export function create(req, res) {
  const { name, history_total_dkp, left_total_dkp, player_total_score } = req.body
  const player = {
    name,
    scores: {
      history_total_dkp, // 历史总分
      left_total_dkp, // 剩余的DKP总分
      auction_dkp: Math.trunc(left_total_dkp * 0.7), // 剩余DKP总分的百分之70
      player_total_score
    }
  }

  const newPlayer = new Player(player)
  newPlayer.role = 'player'
  return newPlayer
    .save()
    .then((savedPlayer) => {
      res.json({ data: savedPlayer })
    })
    .catch(validationError(res))
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  return Player.findById(req.params.id)
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).end()
      }
      res.json(user.profile)
    })
    .catch(err => next(err))
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return Player.findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(204).end()
    })
    .catch(handleError(res))
}


// Upserts the given Thing in the DB at the specified ID
export function upsert(req, res) {
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id')
  }

  req.body.scores.auction_dkp = Math.trunc(req.body.scores.left_total_dkp * 0.7)

  return Player.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true
  })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res))
}

const findOneAndUpdate = (id, item) => () => new Promise((resolve, reject) => {
  Player.findById(id)
    .exec()
    .then((player) => {
      if (!player) {
        return reject(new Error('No such player'))
      }

      if (!player.scores_history) {
        player.scores_history = []
      }

      if (item.action.action === 'A') {
        player.scores.history_total_dkp += parseInt(item.value, 10)
        player.scores.left_total_dkp += parseInt(item.value, 10)
      } else {
        player.scores.left_total_dkp -= parseInt(item.value, 10)
      }

      player.scores.auction_dkp = Math.trunc(player.scores.left_total_dkp * 0.7) // 剩余DKP总分的百分之70
      player.scores_history.push({
        history: {
          label: item.label,
          action: item.action.value,
          value: item.value
        },
        created_at: new Date()
      })
      player.save().then(() => resolve()).catch(err => reject(err))
    })
    .catch(err => reject(err))
})


export function changePlayersDKPScore(req, res) {
  const playerIds = req.body.selectedPlayers
  const item = req.body.scoreObj
  const updatePromises = playerIds.map(pid => findOneAndUpdate(pid, item))

  return Promise.all(updatePromises.map(up => up()))
    .then(() => res.status(200).json({}))
    .catch(handleError(res))
}
