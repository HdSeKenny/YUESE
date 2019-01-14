import express from 'express'
import favicon from 'serve-favicon'
import morgan from 'morgan'
import compression from 'compression'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import cookieParser from 'cookie-parser'
import errorHandler from 'errorhandler'
import path from 'path'
import lusca from 'lusca'
import passport from 'passport'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import mongoose from 'mongoose'

import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from '../../client/components/App'
import errors from '../components/errors'

import config from './environment'
const MongoStore = connectMongo(session)

export default function (app) {
  const env = app.get('env')

  if (env === 'production') {
    app.use(favicon(path.join(config.root, '..', 'public', 'favicon.ico')))
    app.use(express.static('dist'))
  }

  app.use(morgan('dev'))
  app.set('appPath', path.join(config.root, 'client'))
  app.use(express.static(app.get('appPath')))

  app.set('views', path.join(config.root, 'server', 'views'))
  app.set('view engine', 'html')
  app.engine('html', require('ejs').renderFile)

  app.use(compression())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(methodOverride())
  app.use(cookieParser())
  app.use(passport.initialize())

  // Persist sessions with MongoStore / sequelizeStore
  // We need to enable sessions for passport-twitter because it's an
  // oauth 1.0 strategy, and Lusca depends on sessions
  app.use(
    session({
      secret: config.secrets.session,
      saveUninitialized: true,
      name: 'tms',
      resave: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        db: 'server'
      })
    })
  )

  /**
   * Lusca - express server security
   * https://github.com/krakenjs/lusca
   */
  if (env !== 'test' && env !== 'development' && !process.env.SAUCE_USERNAME) {
    // eslint-disable-line no-process-env
    // app.use(
    //   lusca({
    //     csrf: true,
    //     xframe: 'SAMEORIGIN',
    //     hsts: {
    //       maxAge: 31536000, // 1 year, in seconds
    //       includeSubDomains: true,
    //       preload: true
    //     },
    //     xssProtection: true
    //   })
    // )
  }

  if (env === 'development' || env === 'test') {
    app.use(errorHandler()) // Error handler - has to be last
  }
  // Insert routes below
  app.use('/api/users', require('../api/user'))
  app.use('/api/players', require('../api/player'))
  app.use('/auth', require('../auth'))

  // All undefined asset or api routes should return a 404
  // All other routes should redirect to the app.html
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404])

  app.use((req, res) => {
    const context = {}
    const appHtmlString = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )
    // const indexFilePath = env === 'production' ?
    const proPath = path.resolve(config.root, '..', 'dist', 'index.html')
    const devPath = path.resolve(app.get('appPath'), 'index.html')
    const indexFile = env === 'production' ? proPath : devPath
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err)
        return res.status(500).send('Oops, better luck next time!')
      }
      return res.send(
        data.replace('<div id="root"></div>', `<div id="root">${appHtmlString}</div>`)
      )
    })
  })
}
