import express from 'express';


const router = express.Router();

// Controller placeholder
import getLearningPath from '../controllers/learningController.js';
// POST /api/learning-path
router.post('/new', getLearningPath);

export default router;