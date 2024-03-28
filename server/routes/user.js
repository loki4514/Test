import express from 'express'
import { googleControllers, signInAdminControllers, signInControllers,signUpControllers } from '../controllers/Access.js';

const router = express.Router();


router.post('/signin',signInControllers)
router.post('/signup',signUpControllers)
router.post('/signinadmin',signInAdminControllers)
router.post('/googlesign',googleControllers)


export default router