import express from 'express'
import { viewControllers,updateControllers,getUserControllers,getUserAllControllers } from '../controllers/Edits.js';
import authMiddleware from '../middleware/userAuth.js';
import authMiddleware1 from '../middleware/adminAuth.js';
const router = express.Router();


router.get('/view',authMiddleware, viewControllers)
router.patch('/:id/update',authMiddleware,updateControllers)
router.get('/users',authMiddleware,getUserControllers)
router.get('/usersall', authMiddleware1,getUserAllControllers)

export default router