import Router from 'express';

import { getMisinfo } from '../controllers/infoController.js';


const router = Router();

router.post('/verify', getMisinfo);

export default router;
