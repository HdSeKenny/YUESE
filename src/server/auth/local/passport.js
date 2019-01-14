import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

function localAuthenticate(User, email, password, done) {
  User.findOne({
    email: email.toLowerCase()
  })
    .exec()
    .then((user) => {
      if (!user) {
        return done(null, false, {
          message: '你登录的用户没有注册'
        })
      }
      user.authenticate(password, (authError, authenticated) => {
        if (authError) {
          return done(authError)
        }
        if (!authenticated) {
          return done(null, false, { message: '你输入的密码不正确' })
        }
        return done(null, user)
      })
    })
    .catch(err => done(err))
}

export function setup(User /*, config*/) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
      },
      ((email, password, done) => localAuthenticate(User, email, password, done))
    )
  )
}
