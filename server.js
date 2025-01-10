import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import bcrypt from 'bcrypt';
import sequelize from './config/database.js';
import User from './models/User.js';  // Assuming you have a User model

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Database connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Routes
import recipeRoutes from './routes/recipes.js';
import authRoutes from './routes/auth.js';  // New auth routes

app.use('/recipes', recipeRoutes);
app.use('/auth', authRoutes);  // New auth routes

// Root path
app.get('/', (req, res) => {
  res.redirect('/recipes');
});

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/auth/login');
};

// Protected routes
app.use('/recipes', isAuthenticated, recipeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
