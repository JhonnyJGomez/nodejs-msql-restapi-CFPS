import { Router } from 'express'

const router = Router();

import { getParameters, getParametersProgram } from '../controllers/parameter.controller'


// Routes
router.get('/', getParameters);
router.get('/param_program', getParametersProgram);


export default router; 
