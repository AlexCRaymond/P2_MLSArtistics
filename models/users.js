const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    isAdmin: {type: Boolean, default: false},
    username: {type: String},
    email: {type: String},
    photos:[{type:mongoose.Schema.Types.ObjectId, ref:'Photo'}],
    password: {type: String, required: true}
    // artCart: 
});




const User = mongoose.model('User', userSchema)
module.exports = User;