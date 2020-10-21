import { Router } from 'express'

const router = Router();

import { validateMovieParameter } from '../controllers/parameterMovies.controller'


// Routes
router.post('/', validateMovieParameter) 


export default router; 
