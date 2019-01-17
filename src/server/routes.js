import path from 'path'
// import errors from './components/errors'

export default function (app) {
  // // Insert routes below
  // app.use('/api/users', require('./api/user'))
  // app.use('/api/players', require('./api/player'))
  // app.use('/auth', require('./auth'))

  // // All undefined asset or api routes should return a 404
  // // All other routes should redirect to the app.html
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404])
  app.route('/*').get((req, res) => {
    const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
    const indexPath = env === 'production' ? '/build/index.html' : `${app.get('appPath')}/index.html`
    res.sendFile(path.resolve(indexPath))
  })
}
