import express from 'express';
import { changePassword, createUser, forgotPassword, loginUser, verifyOtp } from '../controllers/userController.js';

export const router = express.Router();
router.post('/user/register', createUser);
router.post('/user/login', loginUser);
router.post('/user/forgot-password', forgotPassword);
router.post('/user/verify-otp', verifyOtp);
router.post('/user/change-password', changePassword);

// router.post('/register', userController.createUser);
// router.post('/login', userController.loginUser);

// module.exports = router;