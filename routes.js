// import express
const express = require('express')

// import registerController
const registerController=require('./controllers/registerController')

// import ChatController
const ChatController=require('./controllers/chatController')

// import jwtmiddleware
const jwt=require('./middleware/jwtMiddleware')

// import multer
const multer=require('./middleware/multerMiddleware')


// create object for Router Class

const router=new express.Router()

// register
router.post('/register',registerController.userRegisterController)

// login
router.post('/login',registerController.loginController)

// get user
router.get('/getuser',jwt,registerController.getUserController)

// update profile
router.put('/update',jwt,multer.single('profile'),registerController.updateProfileController)

// chat routes

router.get('/chat/:room',jwt,ChatController.getChatHistoryController)// Get chat history for a room

router.get('/users',jwt,ChatController.getAllUsersController)// Get all users

router.get('/interacted-users',jwt,ChatController.getIntractedUsersController)


module.exports=router