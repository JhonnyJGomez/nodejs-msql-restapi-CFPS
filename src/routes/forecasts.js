import { Router } from 'express'

const router = Router();

import { createForecast, getPremierbyForecast } from '../controllers/forecast.controller'


// Routes
router.post('/create', createForecast);
router.get('/forecast', getPremierbyForecast);



export default router;
