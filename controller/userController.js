const userModel = require('../models/userModel')
const userServices = require('../services/userServices');
const {validationResult} = require('express-validator')

module.exports.registerUser = async(req, res, next) =>{
    try{
        const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error : error.array()})
    }

    const {name, email, country, password} = req.body

    const isAlreadyUser = await userModel.findOne({email})

    if(isAlreadyUser) return res.status(400).json({message : 'already user exist'})

        const hashedPassword = await userModel.hashPassword(password)

        const user = await userServices.createUser({
            name,
            email,
            country,
            password : hashedPassword
        })

        const token = user.generateAuthToken()
        res.status(201).json({token, user})
    }catch(err){
        console.log(err);
        
    }
}

module.exports.loginUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    // console.log(user);
    
    console.log('🧪 Stored hashed password:', user?.password);
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    // console.log(token);
    res.cookie('token', token);
    

    res.status(200).json({ token, user });
}

module.exports.getUserProfile = async (req, res, next) => {

    res.status(200).json(req.user);

}

module.exports.logoutUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
    res.clearCookie('token');

    res.status(200).json({ message: 'Logged out' });

}