"use strict";

var _express = require("express");

var controller = _interopRequireWildcard(require("./player.controller"));

var auth = _interopRequireWildcard(require("../../auth/auth.service"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var router = (0, _express.Router)();
router.post('/add', controller.create);
router.get('/', controller.index);
router.put('/:id', controller.upsert);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.post('/changedkpscore', controller.changePlayersDKPScore);
module.exports = router;