/**
 * Recipe Management Application Server
 * 
 * This file sets up and configures an Express.js server for a recipe management application.
 * It includes database connection, middleware setup, route definitions, and error handling.
 * 
 * @module app
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import bcrypt from 'bcrypt';
import sequelize from './config/database.js';
import User from './models/User.js';
import recipeRoutes from './routes/recipes.js';
import authRoutes from './routes/auth.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

/**
 * Database Connection
 * Establishes a connection to the database using Sequelize
 */
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to the database:', err));

/**
 * Middleware Configuration
 * Sets up various middleware for parsing requests, serving static files, and managing sessions
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

/**
 * View Engine Setup
 * Configures EJS as the template engine and sets the views directory
 */
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

