import { Router } from 'express'

const router = Router();

import { getPremiersbyWeek } from '../controllers/premier.controller'


// Routes
router.get('/', getPremiersbyWeek);

export default router; 
