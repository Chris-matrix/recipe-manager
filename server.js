import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import sequelize from './config/database.js';

sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to the database:', err));


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

import recipeRoutes from './routes/recipes.js';

// Use your route handlers
app.use('/recipes', recipeRoutes);

// Add a route for the root path
app.get('/', (req, res) => {
  res.redirect('/recipes');
});

// 404 handler should be last
app.use((req, res) => {
  res.status(404).render('404');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});