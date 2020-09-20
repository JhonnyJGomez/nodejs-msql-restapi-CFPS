import { Router } from 'express'

const router = Router();

import { createForecast } from '../controllers/forecast.controller'


// Routes
router.post('/create', createForecast);

export default router; 
