/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

import User from '../api/user/user.model'
import Player from '../api/player/player.model'
import config from './environment'

export default new Promise((resolve, reject) => {
  if (!config.seedDB) {
    resolve()
  }

  const userPromise = User.find({})
    .remove()
    .then(() => User.create(
      {
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test'
      },
      {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      }
    )
      .then(() => console.log('finished populating users'))
      .catch(err => console.log('error populating users', err)))

  const playrPromise = Player.find({})
    .remove()
    .then(() => Player.create(
      {
        name: 'Test User',
        scores: {
          history_total_dkp: 31231,
          left_total_dkp: 100,
          auction_dkp: 70,
          player_total_score: 31231313131
        }
      },
      {
        name: '虾虾包',
        scores: {
          history_total_dkp: 200000,
          left_total_dkp: 300,
          auction_dkp: 210,
          player_total_score: 100000000000
        }
      },
    )
      .then(() => console.log('finished populating players'))
      .catch(err => console.log('error populating players', err)))

  Promise.all([
    userPromise,
    playrPromise
  ])
    .then(() => resolve())
    .catch(err => reject(err))
})
