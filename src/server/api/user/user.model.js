import crypto from 'crypto'
import mongoose, { Schema } from 'mongoose'
mongoose.Promise = require('bluebird')
import { registerEvents } from './user.events'

export const defaultUserData = {
  profile_avatar: '/assets/images/user/avatar.svg',
  chat_avatar: '/assets/images/user/avatar.svg',
}

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: defaultUserData.profile_avatar
  },
  profile_background_image: String,
  provider: String,
  salt: String,
  dialogs: [{
    type: Schema.ObjectId,
    ref: 'Dialog'
  }],
  scores: {
    history_total_dkp: Number,
    left_total_dkp: Number,
    auction_dkp: Number,
    player_total_score: Number
  }
})

// Public profile information
UserSchema.virtual('profile').get(function () {
  return {
    name: this.name,
    email: this.email,
    images: this.images,
    role: this.role
  }
})

// Non-sensitive info we'll be putting in the token
UserSchema.virtual('token').get(function () {
  return {
    _id: this._id,
    role: this.role
  }
})

/**
 * Validations
 */
// Validate empty email
UserSchema.path('email').validate(email => email.length, 'Email cannot be blank')

// Validate empty password
UserSchema.path('password').validate(password => password.length, 'Password cannot be blank')

// Validate email is not taken
UserSchema.path('email').validate(function (value) {
  return this.constructor
    .findOne({ email: value })
    .exec()
    .then((user) => {
      if (user) {
        if (this.id === user.id) {
          return true
        }
        return false
      }
      return true
    })
    .catch((err) => {
      throw err
    })
}, 'The specified email address is already in use.')

const validatePresenceOf = function (value) {
  return value && value.length
}

/**
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
  // Handle new/update passwords
  if (!this.isModified('password')) {
    return next()
  }

  if (!validatePresenceOf(this.password)) {
    return next(new Error('Invalid password'))
  }

  // Make salt with a callback
  this.makeSalt((saltErr, salt) => {
    if (saltErr) {
      return next(saltErr)
    }
    this.salt = salt
    this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
      if (encryptErr) {
        return next(encryptErr)
      }
      this.password = hashedPassword
      return next()
    })
  })
})

/**
 * Methods
 */
UserSchema.methods = {
  /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} password
     * @param {Function} callback
     * @return {Boolean}
     * @api public
     */
  authenticate(password, callback) {
    if (!callback) {
      return this.password === this.encryptPassword(password)
    }

    this.encryptPassword(password, (err, pwdGen) => {
      if (err) {
        return callback(err)
      }

      if (this.password === pwdGen) {
        return callback(null, true)
      }
      return callback(null, false)
    })
  },

  /**
     * Make salt
     *
     * @param {Number} [byteSize] - Optional salt byte size, default to 16
     * @param {Function} callback
     * @return {String}
     * @api public
     */
  makeSalt(...args) {
    const defaultByteSize = 16
    let byteSize
    let callback

    if (typeof args[0] === 'function') {
      callback = args[0]
      byteSize = defaultByteSize
    } else if (typeof args[1] === 'function') {
      callback = args[1]
    } else {
      throw new Error('Missing Callback')
    }

    if (!byteSize) {
      byteSize = defaultByteSize
    }

    return crypto.randomBytes(byteSize, (err, salt) => {
      if (err) {
        return callback(err)
      }
      return callback(null, salt.toString('base64'))
    })
  },

  /**
     * Encrypt password
     *
     * @param {String} password
     * @param {Function} callback
     * @return {String}
     * @api public
     */
  encryptPassword(password, callback) {
    if (!password || !this.salt) {
      if (!callback) {
        return null
      }
      return callback('Missing password or salt')
    }

    const defaultIterations = 10000
    const defaultKeyLength = 64
    const salt = new Buffer(this.salt, 'base64')

    if (!callback) {
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha256').toString('base64')
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha256', (err, key) => {
      if (err) {
        return callback(err)
      }
      return callback(null, key.toString('base64'))
    })
  }
}

registerEvents(UserSchema)
export default mongoose.model('User', UserSchema)
