const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    admin: {type: String, unique: true},
    userName: {type: String, unique: true},
    email: {type: String, unique: true},
    photos:[{type:mongoose.Schema.Types.ObjectId, ref:'Photo'}],
    password: {type: String, required: true}
    //artCart: 
});




const User = mongoose.model('User', userSchema)
module.exports = User;