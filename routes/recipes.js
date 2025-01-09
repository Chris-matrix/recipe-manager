import express from 'express';
import Recipe from '../models/Recipe.js';

const router = express.Router();

// GET all recipes
router.get('/', async (req, res) => {
  const recipes = await Recipe.findAll();
  res.render('recipes/index', { recipes });
});

// GET recipe creation form
router.get('/new', (req, res) => {
  res.render('recipes/new');
});

// POST new recipe
router.post('/', async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  await Recipe.create({ title, ingredients, instructions });
  res.redirect('/recipes');
});

// GET recipe details
router.get('/:id', async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  res.render('recipes/show', { recipe });
});

// GET recipe edit form
router.get('/:id/edit', async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  res.render('recipes/edit', { recipe });
});

// PUT update recipe
router.put('/:id', async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  await Recipe.update({ title, ingredients, instructions }, {
    where: { id: req.params.id }
  });
  res.redirect(`/recipes/${req.params.id}`);
});

// DELETE recipe
router.delete('/:id', async (req, res) => {
  await Recipe.destroy({
    where: { id: req.params.id }
  });
  res.redirect('/recipes');
});

export default router;