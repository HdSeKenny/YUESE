/*eslint no-process-env:0*/

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  // List of user roles
  userRoles: ['guest', 'user', 'admin']
}
