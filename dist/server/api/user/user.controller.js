"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.create = create;
exports.show = show;
exports.destroy = destroy;
exports.changePassword = changePassword;
exports.upsert = upsert;
exports.me = me;
exports.authCallback = authCallback;
exports.changeUserAvatar = changeUserAvatar;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _user = _interopRequireDefault(require("./user.model"));

var _environment = _interopRequireDefault(require("../../config/environment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;

  if (res.salt) {
    Reflect.deleteProperty(res, 'salt');
  }

  if (res.password) {
    Reflect.deleteProperty(res, 'password');
  }

  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }

    return null;
  };
}

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    return res.status(statusCode).send(err);
  };
}
/**
 * Get list of users
 * restriction: 'admin'
 */


function index(req, res) {
  return _user.default.find({}, '-salt -password').exec().then(function (users) {
    res.status(200).json(users);
  }).catch(handleError(res));
}
/**
 * Creates a new user
 */


function create(req, res) {
  var newUser = new _user.default(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  return newUser.save().then(function (user) {
    var token = _jsonwebtoken.default.sign({
      _id: user._id
    }, _environment.default.secrets.session, {
      expiresIn: 60 * 60 * 5
    });

    res.json({
      token: token
    });
  }).catch(validationError(res));
}
/**
 * Get a single user
 */


function show(req, res, next) {
  var userId = req.params.id;
  return _user.default.findById(userId).exec().then(function (user) {
    if (!user) {
      return res.status(404).end();
    }

    res.json(user.profile);
  }).catch(function (err) {
    return next(err);
  });
}
/**
 * Deletes a user
 * restriction: 'admin'
 */


function destroy(req, res) {
  return _user.default.findByIdAndRemove(req.params.id).exec().then(function () {
    res.status(204).end();
  }).catch(handleError(res));
}
/**
 * Change a users password
 */


function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  _user.default.findById(userId).exec().then(function (user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save().then(function () {
        res.status(200).json({
          message: 'Password changed successfully!!'
        });
      }).catch(validationError(res));
    } else {
      res.status(403).json({
        message: 'Old password is not correct!'
      });
    }
  });
} // Upserts the given Thing in the DB at the specified ID


function upsert(req, res) {
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return _user.default.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true
  }).exec().then(respondWithResult(res)).catch(handleError(res));
}
/**
 * Get my info
 */


function me(req, res, next) {
  var userId = req.user._id;
  return _user.default.findOne({
    _id: userId
  }, '-salt -password').exec().then(function (user) {
    // don't ever give out the password or salt
    if (!user) {
      return res.status(401).end();
    }

    return res.json(user);
  }).catch(function (err) {
    return next(err);
  });
}
/**
 * Authentication callback
 */


function authCallback(req, res) {
  res.redirect('/');
} // Upload profile image


var storage = _multer.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, _path.default.join(_environment.default.root, 'client', 'assets', 'images'));
  },
  filename: function filename(req, file, cb) {
    var fileParams = file.originalname.split('.');
    var fileFormat = fileParams[fileParams.length - 1];
    cb(null, "avatar.".concat(fileFormat));
  }
});

var upload = (0, _multer.default)({
  storage: storage
});

function changeUserAvatar(req, res) {
  return upload.single(req.query.fieldname)(req, res, function (err) {
    if (err) return res.status(500).json(err);
    return _user.default.findById(req.params.id).exec().then(function (user) {
      var urlPrefix = "http://".concat(_environment.default.host, ":").concat(_environment.default.port);
      user.avatar = "".concat(urlPrefix, "/assets/images/").concat(req.file.filename);
      return user.save().then(function () {
        return res.status(200).json({
          message: 'Upload successfully',
          avatar: user.avatar
        });
      }).catch(validationError(res));
    });
  });
}