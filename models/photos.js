const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    photoUrl: [String],
    title: {type: String, required: true},
    info: {type: String, required: true},
    price: {type: String, required: true},
});

const Photo = mongoose.model('Photo', photoSchema)
module.exports = Photo;

