import { Router } from 'express'

const router = Router();

import { createForecast, getPremierbyForecast, updateForecast, getForecastReport } from '../controllers/forecast.controller'

// Routes
router.post('/create', createForecast);
router.get('/forecast_report/:cod_forecast', getForecastReport);
router.get('/forecast', getPremierbyForecast);
router.post('/update_forecast/:cod_forecast', updateForecast);

export default router;
