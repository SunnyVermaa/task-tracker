const userModel = require('../models/userModel');

module.exports.createUser = async({
    name, email, country, password
}) => {
    if( !name || !email || !country || !password){
        throw new Error('All fields are required')
    }

    const user = userModel.create({
        name,
        email,
        country,
        password
})

return user;
}