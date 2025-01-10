import express from 'express';
import session from 'express-session';
import bcrypt from 'bcrypt';
import User from '../models/User.js';  // Assuming you have a User model

const router = express.Router();

// Session middleware
router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// GET login form
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    req.session.userId = user._id;
    res.redirect('/dashboard');  // Redirect to dashboard or home page
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// GET signup form
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

// POST signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    req.session.userId = user._id;
    res.redirect('/dashboard');  // Redirect to dashboard or home page
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// GET logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/login');
  });
});

// Middleware to check if user is authenticated
export const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/login');
};

export default router;
