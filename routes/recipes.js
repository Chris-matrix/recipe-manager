import express from 'express';
import Recipe from '../models/Recipe.js';
import { body, validationResult } from 'express-validator';
import methodOverride from 'method-override';

const router = express.Router();

// Use method-override middleware
router.use(methodOverride('_method'));

// Validation middleware
const validateRecipe = [
  body('title').notEmpty().trim().escape(),
  body('ingredients').notEmpty().trim().escape(),
  body('instructions').notEmpty().trim().escape(),
];

// GET all recipes
router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll();
    res.render('recipes/index', { recipes });
  } catch (error) {
    next(error);
  }
});

// GET recipe creation form
router.get('/new', (req, res) => {
  res.render('recipes/new');
});

// POST new recipe
router.post('/', validateRecipe, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, ingredients, instructions } = req.body;
    await Recipe.create({ title, ingredients, instructions });
    res.redirect('/recipes');
  } catch (error) {
    next(error);
  }
});

// GET recipe details
router.get('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.render('recipes/show', { recipe });
  } catch (error) {
    next(error);
  }
});

// GET recipe edit form
router.get('/:id/edit', async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.render('recipes/edit', { recipe });
  } catch (error) {
    next(error);
  }
});

// PUT update recipe
router.put('/:id', validateRecipe, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, ingredients, instructions } = req.body;
    const [updatedRows] = await Recipe.update(
      { title, ingredients, instructions },
      { where: { id: req.params.id } }
    );
    if (updatedRows === 0) {
      return res.status(404).send('Recipe not found');
    }
    res.redirect(`/recipes/${req.params.id}`);
  } catch (error) {
    next(error);
  }
});

// DELETE recipe
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedRows = await Recipe.destroy({
      where: { id: req.params.id }
    });
    if (deletedRows === 0) {
      return res.status(404).send('Recipe not found');
    }
    res.redirect('/recipes');
  } catch (error) {
    next(error);
  }
});

export default router;
