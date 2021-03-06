import { Router } from 'express'
import * as controller from './user.controller'
import * as auth from '../../auth/auth.service'

const router = Router()

router.get('/', auth.hasRole('admin'), controller.index)
router.delete('/:id', auth.hasRole('admin'), controller.destroy)
router.get('/me', auth.isAuthenticated(), controller.me)
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword)
router.put('/:id', auth.isAuthenticated(), controller.upsert)
router.get('/:id', auth.isAuthenticated(), controller.show)
router.post('/backup', auth.isAuthenticated(), controller.backup)
router.post('/', controller.create)
router.post('/:id/avatar', controller.changeUserAvatar)

module.exports = router
