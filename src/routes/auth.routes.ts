import { Router } from 'express'
import {
  loginController,
  registerController,
  getUsersController,
  logoutController,
} from '../controllers/auth.controller'

const router = Router()

router.post('/login', loginController)
router.post('/register', registerController)
router.post('/logout', logoutController)
router.get('/users', getUsersController)

export default router
