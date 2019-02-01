/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

import User from '../api/user/user.model'
import Player from '../api/player/player.model'
import config from './environment'
import data from './environment/_data'

export default new Promise((resolve, reject) => {
  if (!config.seedDB) {
    return resolve()
  }

  const userPromise = User.find({})
    .remove()
    .then(() => User.create(
      {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@kenny.com',
        password: 'kuan4928..'
      },
      {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@yuese.com',
        password: 'yuese520'
      }
    )
      .then(() => console.log('finished populating users'))
      .catch(err => console.log('error populating users', err)))

  const playrPromise = Player.find({})
    .remove()
    .then(() => {
      const _data = data.sort((a, b) => a.scores.history_total_dkp - b.scores.history_total_dkp)
      Player.create(_data)
        .then(() => console.log('finished populating players'))
        .catch(err => console.log('error populating players', err))
    })

  Promise.all([
    userPromise,
    playrPromise
  ])
    .then(() => resolve())
    .catch(err => reject(err))
})
