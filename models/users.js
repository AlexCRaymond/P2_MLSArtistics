const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    isAdmin: {type: Boolean, default: false},
    username: {type: String},
    email: {type: String},
    password: {type: String, required: true},
    artCart: [{type:mongoose.Schema.Types.ObjectId, ref:'Photo'}],
});


const User = mongoose.model('User', userSchema)
module.exports = User;