import { Router } from 'express'

const router = Router();

import { generateSchedule } from '../controllers/generateSchedule.controller'


// Routes
router.post('/', generateSchedule)


export default router;
