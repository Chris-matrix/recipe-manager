import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Recipe Model
 * Represents a recipe in the database
 * @property {string} title - The title of the recipe
 * @property {string} ingredients - The ingredients required for the recipe
 * @property {string} instructions - The cooking instructions for the recipe
 */

const recipe = sequelize.define('recipe', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ingredients: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});

recipe.sync({ force: true })
  .then(() => {
    console.log("Recipe table created successfully");
  })
  .catch((error) => {
    console.error("Error creating Recipe table:", error);
  });

export default recipe;