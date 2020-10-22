import { Router } from 'express'

const router = Router();

import { getParameters, getParametersProgram, saveParamProgram } from '../controllers/parameter.controller'


// Routes
router.get('/', getParameters);
router.get('/param_program', getParametersProgram);
router.post('/save_param_program/', saveParamProgram);


export default router;
