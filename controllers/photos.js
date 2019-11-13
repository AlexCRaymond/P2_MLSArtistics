const express = require('express');
const router = express.Router(); 
const Photo = require ('../models/photos.js')

router.get('/upload', (req, res) => {
    res.render('photos/upload.ejs', {
        isLogged: req.session.logged,
        photoUpload: req.session.logged,
        isAdmin: req.session.isAdmin
    })
});

router.post('/', async (req,res)=>{
    try {
        const photos = await Photo.create(req.body)
        res.redirect('/')
    } catch(err) {
        console.log(err)
    }
});

module.exports = router;
