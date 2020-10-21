import { Router } from 'express'

const router = Router();

import { createForecast, getPremierbyForecast, updateForecast } from '../controllers/forecast.controller'

// Routes
router.post('/create', createForecast);
router.get('/forecast', getPremierbyForecast);
router.post('/update_forecast/:id_forecast', updateForecast);

export default router;
