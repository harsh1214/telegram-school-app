import express from 'express';
import { createUser, loginUser } from '../controllers/userController.js';

export const router = express.Router();
router.post('/user/register', createUser);
router.post('/user/login', loginUser);

// router.post('/register', userController.createUser);
// router.post('/login', userController.loginUser);

// module.exports = router;