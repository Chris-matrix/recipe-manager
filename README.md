# Community-Driven Recipe Sharing Platform

## Project Overview
This is a full-stack web application for sharing and managing recipes. Users can create, read, update, and delete recipes through a user-friendly interface.

## Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your MySQL database and update the `.env` file with your credentials
4. Run database migrations: `npx sequelize-cli db:migrate`
5. Start the server: `npm start`

## Available Features
- View all recipes
- Create new recipes
- View recipe details
- Edit existing recipes
- Delete recipes

## Dependencies
- Express.js: Web application framework
- Sequelize: ORM for database management
- MySQL2: MySQL database driver
- EJS: Template engine
- Dotenv: Environment variable management

## Basic Troubleshooting Guide
- Database connection issues: Check your `.env` file and ensure your MySQL server is running
- "Module not found" errors: Make sure all dependencies are installed (`npm install`)
- Server won't start: Check if the port is already in use and modify in `app.js` if necessary
