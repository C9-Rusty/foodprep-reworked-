const express = require('express');

const {loginUser, registerUser,googleLogin, createAdmin} = require('../controllers/userController');
const userRouter = express.Router()


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/google-login', googleLogin)
userRouter.post("/make-admin", createAdmin);

module.exports = userRouter;