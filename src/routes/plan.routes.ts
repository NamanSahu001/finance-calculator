import { Router } from 'express'
import {
  createPlanDataController,
  getPlanDataController,
} from '../controllers/plan.controller'
const router = Router()

router.post('/data', createPlanDataController)
router.get('/data/:id', getPlanDataController)
export default router
