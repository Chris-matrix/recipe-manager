// We're importing some tools we need to work with our database
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Recipe Model
 * Represents a recipe in the database
 * @property {string} title - The title of the recipe
 * @property {string} ingredients - The ingredients required for the recipe
 * @property {string} instructions - The cooking instructions for the recipe
 */
// This is like a blueprint for our recipe information
// It tells the computer what pieces of information we want to store for each recipe
const recipe = sequelize.define('recipe', {
    // The title of the recipe
    title: {
        type: DataTypes.STRING,
        allowNull: false
        type: DataTypes.STRING,  // This means the title will be text
        allowNull: false  // This means every recipe MUST have a title
    },
    // The list of ingredients
    ingredients: {
        type: DataTypes.TEXT,
        allowNull: false
        type: DataTypes.TEXT,  // This is for longer pieces of text
        allowNull: false  // Every recipe MUST have ingredients
    },
    // The cooking instructions
    instructions: {
        type: DataTypes.TEXT,
        allowNull: false
        type: DataTypes.TEXT,  // This is also for longer text
        allowNull: false  // Every recipe MUST have instructions
    },
});

// This part creates a new table in our database for storing recipes
// If the table already exists, it will be replaced with a new, empty one
recipe.sync({ force: true })
  .then(() => {
    // If the table is created successfully, we'll see this message
    console.log("Recipe table created successfully");
  })
  .catch((error) => {
    // If there's a problem creating the table, we'll see this message
    console.error("Error creating Recipe table:", error);
  });

// This makes our recipe blueprint available for other parts of our program to use
export default recipe;


