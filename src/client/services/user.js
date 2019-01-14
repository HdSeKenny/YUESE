import axios from 'axios'

const USER_URI = {
  USERS: '/api/users',
  LOGIN: '/auth/local',
  LOAD_SESSION: '/api/users/me',
  REGISTER: '/api/users/register',
  LOGOUT: '/api/users/logout'
}

export default {
  login: (email, password) => new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: USER_URI.LOGIN,
      data: {
        email,
        password
      }
    }).then((res) => {
      localStorage.setItem('id_token', res.data.token)
      resolve()
    }).catch((error) => {
      reject(error.response)
    })
  }),

  getCurrentUser: () => new Promise((resolve, reject) => {
    const token = localStorage.getItem('id_token')
    axios.get(USER_URI.LOAD_SESSION, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      localStorage.setItem('current_user', JSON.stringify(res.data))
      resolve(res.data)
    }).catch((error) => {
      reject(error)
    })
  })
}
