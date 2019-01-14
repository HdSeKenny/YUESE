import { Router } from 'express'
import * as controller from './player.controller'
import * as auth from '../../auth/auth.service'

const router = Router()
router.post('/add', controller.create)
router.get('/', controller.index)
router.put('/:id', controller.upsert)
router.delete('/:id', auth.hasRole('admin'), controller.destroy)

router.post('/changedkpscore', controller.changePlayersDKPScore)

module.exports = router
