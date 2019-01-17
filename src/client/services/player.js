import axios from 'axios'

export default {
  addPlayer: data => new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/api/players/add',
      data
    }).then((res) => {
      resolve(res.data)
    }).catch((error) => {
      reject(error.response)
    })
  }),

  getAllPlayers: () => new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/api/players'
    }).then((res) => {
      resolve(res.data)
    }).catch((error) => {
      reject(error.response)
    })
  }),

  editPlayerScoresInfo: newItem => new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `/api/players/${newItem._id}`,
      data: newItem
    }).then(() => {
      resolve()
    }).catch((error) => {
      reject(error.response)
    })
  }),

  deletePlayer: pId => new Promise((resolve, reject) => {
    const token = localStorage.getItem('id_token')
    axios({
      method: 'delete',
      url: `/api/players/${pId}`,
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      resolve()
    }).catch((error) => {
      reject(error.response)
    })
  }),

  addOrReducePlayerDKPScore: scoreObj => new Promise((resolve, reject) => {
    const token = localStorage.getItem('id_token')
    axios({
      method: 'post',
      url: '/api/players/changedkpscore',
      headers: { Authorization: `Bearer ${token}` },
      data: scoreObj
    }).then(() => {
      resolve()
    }).catch((error) => {
      reject(error.response)
    })
  })
}
