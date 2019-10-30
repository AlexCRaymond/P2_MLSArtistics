const express = require('express');
const router = express.Router(); 
const Photo = require ('../models/photos.js')
const User = require ('../models/users.js')

router.get('/upload', (req, res) => {
    res.render('photos/upload.ejs', {
        isLogged: req.session.logged,
    })
});










module.exports = router;