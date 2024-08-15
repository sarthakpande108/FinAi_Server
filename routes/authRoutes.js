const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup
router.post('/signup', authController.signUp);

// Signin
router.post('/signin', authController.signIn);

// Verify email
router.get('/verify-email', authController.verifyEmail);

// Google OAuth
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallback);

module.exports = router;
