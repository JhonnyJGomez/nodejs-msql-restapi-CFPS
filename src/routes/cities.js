import { Router } from 'express'

const router = Router();

import { getCities } from '../controllers/city.controller'

//routes

router.get('/', getCities);

export default router; 
