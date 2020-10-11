import { Router } from 'express'

const router = Router();

import { getParameters } from '../controllers/parameter.controller'


// Routes
router.get('/', getParameters);

export default router; 
