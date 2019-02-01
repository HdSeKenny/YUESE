"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.respondWithResult = respondWithResult;
exports.validationError = validationError;
exports.patchUpdates = patchUpdates;
exports.removeEntity = removeEntity;
exports.handleEntityNotFound = handleEntityNotFound;
exports.handleError = handleError;

var _fastJsonPatch = require("fast-json-patch");

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

function patchUpdates(patches) {
  return function (entity) {
    try {
      (0, _fastJsonPatch.applyPatch)(entity, patches,
      /*validate*/
      true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        return res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }

    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    return res.status(statusCode).send(err);
  };
}