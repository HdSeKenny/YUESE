"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultUserData = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _user = require("./user.events");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.Promise = require('bluebird');
var defaultUserData = {
  profile_avatar: '/assets/images/user/avatar.svg',
  chat_avatar: '/assets/images/user/avatar.svg'
};
exports.defaultUserData = defaultUserData;
var UserSchema = new _mongoose.Schema({
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
    type: _mongoose.Schema.ObjectId,
    ref: 'Dialog'
  }],
  scores: {
    history_total_dkp: Number,
    left_total_dkp: Number,
    auction_dkp: Number,
    player_total_score: Number
  }
}); // Public profile information

UserSchema.virtual('profile').get(function () {
  return {
    name: this.name,
    email: this.email,
    images: this.images,
    role: this.role
  };
}); // Non-sensitive info we'll be putting in the token

UserSchema.virtual('token').get(function () {
  return {
    _id: this._id,
    role: this.role
  };
});
/**
 * Validations
 */
// Validate empty email

UserSchema.path('email').validate(function (email) {
  return email.length;
}, 'Email cannot be blank'); // Validate empty password

UserSchema.path('password').validate(function (password) {
  return password.length;
}, 'Password cannot be blank'); // Validate email is not taken

UserSchema.path('email').validate(function (value) {
  var _this = this;

  return this.constructor.findOne({
    email: value
  }).exec().then(function (user) {
    if (user) {
      if (_this.id === user.id) {
        return true;
      }

      return false;
    }

    return true;
  }).catch(function (err) {
    throw err;
  });
}, 'The specified email address is already in use.');

var validatePresenceOf = function validatePresenceOf(value) {
  return value && value.length;
};
/**
 * Pre-save hook
 */


UserSchema.pre('save', function (next) {
  var _this2 = this;

  // Handle new/update passwords
  if (!this.isModified('password')) {
    return next();
  }

  if (!validatePresenceOf(this.password)) {
    return next(new Error('Invalid password'));
  } // Make salt with a callback


  this.makeSalt(function (saltErr, salt) {
    if (saltErr) {
      return next(saltErr);
    }

    _this2.salt = salt;

    _this2.encryptPassword(_this2.password, function (encryptErr, hashedPassword) {
      if (encryptErr) {
        return next(encryptErr);
      }

      _this2.password = hashedPassword;
      return next();
    });
  });
});
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
  authenticate: function authenticate(password, callback) {
    var _this3 = this;

    if (!callback) {
      return this.password === this.encryptPassword(password);
    }

    this.encryptPassword(password, function (err, pwdGen) {
      if (err) {
        return callback(err);
      }

      if (_this3.password === pwdGen) {
        return callback(null, true);
      }

      return callback(null, false);
    });
  },

  /**
     * Make salt
     *
     * @param {Number} [byteSize] - Optional salt byte size, default to 16
     * @param {Function} callback
     * @return {String}
     * @api public
     */
  makeSalt: function makeSalt() {
    var defaultByteSize = 16;
    var byteSize;
    var callback;

    if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'function') {
      callback = arguments.length <= 0 ? undefined : arguments[0];
      byteSize = defaultByteSize;
    } else if (typeof (arguments.length <= 1 ? undefined : arguments[1]) === 'function') {
      callback = arguments.length <= 1 ? undefined : arguments[1];
    } else {
      throw new Error('Missing Callback');
    }

    if (!byteSize) {
      byteSize = defaultByteSize;
    }

    return _crypto.default.randomBytes(byteSize, function (err, salt) {
      if (err) {
        return callback(err);
      }

      return callback(null, salt.toString('base64'));
    });
  },

  /**
     * Encrypt password
     *
     * @param {String} password
     * @param {Function} callback
     * @return {String}
     * @api public
     */
  encryptPassword: function encryptPassword(password, callback) {
    if (!password || !this.salt) {
      if (!callback) {
        return null;
      }

      return callback('Missing password or salt');
    }

    var defaultIterations = 10000;
    var defaultKeyLength = 64;
    var salt = new Buffer(this.salt, 'base64');

    if (!callback) {
      return _crypto.default.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha256').toString('base64');
    }

    return _crypto.default.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha256', function (err, key) {
      if (err) {
        return callback(err);
      }

      return callback(null, key.toString('base64'));
    });
  }
};
(0, _user.registerEvents)(UserSchema);

var _default = _mongoose.default.model('User', UserSchema);

exports.default = _default;