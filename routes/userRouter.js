const express = require('express')
const router = express.Router();
const {body} = require('express-validator')
const userController = require('../controller/userController');

const authMiddleWare = require('../middleware/userAuth')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('name').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 6 characters long'),
    body('country').isLength({min : 3}).withMessage('country name must be atlist more than 3 characters')
],
    userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
)

router.get('/profile', authMiddleWare.authUser, userController.getUserProfile)

router.get('/logout', authMiddleWare.authUser, userController.logoutUser)



module.exports = router