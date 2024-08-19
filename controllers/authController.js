const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
require('dotenv').config();
// Email configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendVerificationEmail(email, token) {
  console.log('Email User:', process.env.EMAIL_USER);
  console.log('Email Pass:', process.env.EMAIL_PASS);
  transporter.verify((error, success) => {
    if (error) {
      console.error('SMTP connection error:', error);
    } else {
      console.log('SMTP server is ready to take our messages');
    }
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to FinAI - Verify Your Email Address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
        <h1 style="color: #0044cc;">Welcome to FinAI!</h1>
        <p>Dear valued user,</p>
        <p>Thank you for joining <strong>FinAI</strong>, your trusted partner in AI-powered financial planning. We're excited to help you take control of your financial future with personalized, data-driven insights and recommendations.</p>
        <p>At FinAI, we combine advanced artificial intelligence with a deep understanding of financial markets to provide tailored investment strategies and financial advice that meets your unique needs and goals. Whether you're saving for a house, planning for retirement, or looking to grow your wealth, FinAI is here to guide you every step of the way.</p>
        <p>To get started, please verify your email address by clicking the link below:</p>
        <p style="text-align: center;">
          <a href="https://finai-lfxz.onrender.com/verify-email?token=${token}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #0044cc; border-radius: 5px; text-decoration: none;">Verify Your Email</a>
        </p>
        <p>If the button above doesn't work, please copy and paste the following link into your web browser:</p>
        <p style="word-break: break-all;">https://finai-lfxz.onrender.com/verify-email?token=${token}</p>
        <p>If you did not sign up for a FinAI account, please ignore this email.</p>
        <p>Thank you for choosing FinAI. We look forward to helping you achieve your financial goals.</p>
        <p>Best regards,</p>
        <p>The FinAI Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', email);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
}

exports.signUp = [
  // Input validation
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log('Received signup request with:', { email, password });

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = crypto.randomBytes(32).toString('hex'); // Generate a verification token

      const user = await User.create({
        email,
        password: hashedPassword,
        emailVerified: false,
        verificationToken, // Store the token in the user's record
      });

      // Send verification email
      await sendVerificationEmail(email, verificationToken);

      res.status(201).json({ id: user.id, email: user.email, message: 'Verification email sent' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

exports.signIn = [
  // Rate limiter to prevent brute-force attacks
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
  }),

  // Input validation
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password cannot be empty'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, id: user.id, email: user.email });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, async (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err.message);
      return res.redirect('http://localhost:3000'); // Redirect to login page on error
    }
    if (!user) {
      return res.redirect('http://localhost:3000'); // Redirect to login page if no user
    }

    try {

      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Redirect to profile page with token
      res.redirect(`http://localhost:3000/profile?token=${token}`);
    } catch (error) {
      console.error('Error processing user data:', error.message);
      res.redirect('http://localhost:3000');
    }
  })(req, res, next);
};



exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ where: { verificationToken: token } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    user.emailVerified = true;
    user.verificationToken = null; // Invalidate the token after use
    await user.save();

    // Return additional data like email and userId
    res.status(200).json({ 
      message: 'Email verified successfully', 
      email: user.email, 
      userId: user.id 
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};


