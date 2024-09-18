const express = require('express');
const { login } = require('../controllers/authController');


// We have to initialise a router object to add route in new file
// Routers are use for segregating your routes in diffrent modules
const authRouter = express.Router();


authRouter.post('/login', login)// This is a route registriation

module.exports = authRouter;