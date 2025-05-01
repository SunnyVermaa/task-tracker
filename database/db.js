const mongoose = require('mongoose');

const connectToDb = () =>{
    mongoose.connect(process.env.MONGO_DB_ONL).then(
        () =>{
            console.log('db is connected');
            
        }).catch(err => console.log(err));
}

module.exports = connectToDb;