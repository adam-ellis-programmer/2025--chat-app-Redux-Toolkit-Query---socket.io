import express from 'express'
import {
  register,
  verifyEmail,
  login,
  getCurrentUser,
  requestPasswordReset,
  resetPassword,
  resendVerificationEmail,
  logout,
} from '../controllers/authController.js'
import {
  validateRegistration,
  validateLogin,
  validatePasswordResetRequest,
  validatePasswordReset,
  validateEmail,
} from '../middleware/validation.js'

const router = express.Router()

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validateRegistration, register)

// @route   GET /api/auth/verify/:token
// @desc    Verify email address
// @access  Public
router.get('/verify/:token', verifyEmail)

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validateLogin, login)

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private (will add auth middleware later)
router.get('/me', getCurrentUser)

// @route   POST /api/auth/forgot-password
// @desc    Request password reset
// @access  Public
router.post(
  '/forgot-password',
  validatePasswordResetRequest,
  requestPasswordReset
)

// @route   POST /api/auth/reset-password/:token
// @desc    Reset password
// @access  Public
router.post('/reset-password/:token', validatePasswordReset, resetPassword)

// @route   POST /api/auth/resend-verification
// @desc    Resend verification email
// @access  Public
router.post('/resend-verification', validateEmail, resendVerificationEmail)

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Public
router.post('/logout', logout)
export default router
