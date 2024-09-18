const express = require('express');
const { creatUser } = require('../controllers/userController');

// We have to initialise a router object to add route in new file
// Routers are use for segregating your routes in diffrent modules
const userRouter = express.Router();


userRouter.post('/', creatUser)// This is a route registriation

module.exports = userRouter;