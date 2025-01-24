// First, we're importing the tools we need to build our website
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

// We're importing our database connection
import sequelize from './config/database.js';

// We're checking if we can connect to our database
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to the database:', err));

// We're loading our secret information (like passwords) from a special file
dotenv.config();

// We're creating our website application
const app = express();
// We're deciding which door (port) our website will use
const PORT = process.env.PORT || 3000;

// We're setting up our website to understand different types of information
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// We're telling our website where to find pictures and other files
app.use(express.static('public'));

// We're choosing a special language (EJS) to create our web pages
app.set('view engine', 'ejs');
// We're telling our website where to find these web pages
app.set('views', path.join(process.cwd(), 'views'));

// We're importing the rules for handling recipe-related requests
import recipeRoutes from './routes/recipes.js';

// We're telling our website to use these recipe rules
app.use('/recipes', recipeRoutes);

// When someone visits our homepage, we're sending them to the recipes page
app.get('/', (req, res) => {
  res.redirect('/recipes');
});

// If someone tries to visit a page that doesn't exist, we show them a 404 error page
app.use((req, res) => {
  res.status(404).render('404');
});

// If something goes wrong, we have a plan to handle it
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// We're starting our website and telling it which door to listen on
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
