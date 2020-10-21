import { Router } from 'express'

const router = Router();

import { getWeek } from '../controllers/week.controller'

// Routes
router.get('/', getWeek);

export default router; 

