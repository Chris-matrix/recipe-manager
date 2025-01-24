// We're importing some tools we need to make our recipe website work
import express from 'express';
import Recipe from '../models/Recipe.js';

// We're creating a special path (like a hallway) for our recipe-related pages
const router = express.Router();

// GET all recipes
// This section handles showing all recipes
router.get('/', async (req, res) => {
  // We're asking our database to give us all the recipes
  const recipes = await Recipe.findAll();
  // We're showing a page with all these recipes
  res.render('recipes/index', { recipes });
});

// GET recipe creation form
// This section shows a form to create a new recipe
router.get('/new', (req, res) => {
  // We're showing a page with a form to add a new recipe
  res.render('recipes/new');
});

// POST new recipe
// This section handles saving a new recipe when someone submits the form
router.post('/', async (req, res) => {
  // We're getting the recipe details from the form
  const { title, ingredients, instructions } = req.body;
  // We're saving the new recipe in our database
  await Recipe.create({ title, ingredients, instructions });
  // After saving, we're sending the user back to the page with all recipes
  res.redirect('/recipes');
});

// GET recipe details
// This section shows the details of a specific recipe
router.get('/:id', async (req, res) => {
  // We're finding a specific recipe by its ID
  const recipe = await Recipe.findByPk(req.params.id);
  // We're showing a page with this recipe's details
  res.render('recipes/show', { recipe });
});

// GET recipe edit form
// This section shows a form to edit an existing recipe
router.get('/:id/edit', async (req, res) => {
  // We're finding the recipe we want to edit
  const recipe = await Recipe.findByPk(req.params.id);
  // We're showing a page with a form to edit this recipe
  res.render('recipes/edit', { recipe });
});

// PUT update recipe
// This section handles saving the changes when someone edits a recipe
router.put('/:id', async (req, res) => {
  // We're getting the updated recipe details from the form
  const { title, ingredients, instructions } = req.body;
  // We're updating the recipe in our database
  await Recipe.update({ title, ingredients, instructions }, {
    where: { id: req.params.id }
  });
  // After updating, we're sending the user back to the updated recipe's page
  res.redirect(`/recipes/${req.params.id}`);
});

// DELETE recipe
// This section handles deleting a recipe
router.delete('/:id', async (req, res) => {
  // We're deleting the recipe from our database
  await Recipe.destroy({
    where: { id: req.params.id }
  });
  // After deleting, we're sending the user back to the page with all recipes
  res.redirect('/recipes');
});

// We're making this recipe hallway available for other parts of our website to use
export default router;
