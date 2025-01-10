import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';  // Adjust the path as needed

const router = express.Router();

// GET login form
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    req.session.userId = user.id;
    res.redirect('/recipes');
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
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).send('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    req.session.userId = user.id;
    res.redirect('/recipes');
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
    res.redirect('/auth/login');
  });
});

export default router;
