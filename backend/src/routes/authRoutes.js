import express from 'express';
import { login } from '../controllers/authController.js';
import { updateProfile, getFullProfile, getProfile } from '../controllers/profileController.js';

const router = express.Router();

router.post('/login', login);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/profile/full', getFullProfile);

export default router;