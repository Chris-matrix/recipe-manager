// This line imports a tool called Sequelize that helps us work with databases
import { Sequelize } from 'sequelize';
// This line imports a tool called dotenv that helps us keep secret information safe
import dotenv from 'dotenv';
// This line tells the computer to load our secret information from a special file
dotenv.config();

// Here, we're creating a connection to our database
// Think of it like opening a secure phone line to talk to the database
const sequelize = new Sequelize(
    process.env.DB_NAME,     // This is the name of our database
    process.env.DB_USER,     // This is the username we use to access the database
    process.env.DB_PASSWORD, // This is the password we use to access the database
    {
        host: process.env.DB_HOST,  // This is the address of the computer where our database lives
        dialect: 'mysql',           // This tells the computer what kind of database we're using (MySQL in this case)
    }
);

// This line makes our database connection available to use in other parts of our program
export default sequelize;