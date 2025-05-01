const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        require : true,
        minlength : [3, 'name must have minimum 3 characters']
    },

    email : {
        type : String,
        require : true,
        unique : true,
        minlength : [3, 'email have atlist 3 names']
    },

    country : {
        type:String,
        require : true,
        minlength : [3, 'country name have atlist 3 characters']
    },
    password : {
        type: String,
        require: true,
        minlength : [3, ' make password strong']
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET, {expiresIn : '24h'})
    return token
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt);
}


const userModel = mongoose.model('user', userSchema);
module.exports = userModel;