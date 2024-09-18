const dotenv = require('dotenv');
dotenv.config();


// Here we are exporting all the env variables that the project uses
module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    JWT_SECRATE: process.env.JWT_SECRATE,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
}