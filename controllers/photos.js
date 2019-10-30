const express = require('express');
const router = express.Router(); 
const Photo = require ('../models/photos.js')
const User = require ('../models/users.js')

router.get('/upload', (req, res) => {
    res.render('photos/upload.ejs', {
        isLogged: req.session.logged,
        photoUpload: req.session.logged,
    })
});

router.post('/', async (req,res)=>{
    try {
        const photo = await Photo.create(req.body)
        res.redirect('/')
    } catch(err) {
    }
});

router.delete('/:id', async (req,res) => {
    try {
        const deletePhoto = await Photo.findByIdAndRemove(req.params.id)
        res.redirect('/')
    } catch(err) {
        console.log(err, 'this is delete error')
    }
});










module.exports = router;