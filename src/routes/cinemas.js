import { Router } from 'express'

const router = Router();

import { getCinemasbyCity } from '../controllers/cinema.controller'


// Routes
router.get('/', getCinemasbyCity);


export default router;
