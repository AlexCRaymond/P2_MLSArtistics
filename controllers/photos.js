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
        console.log(err, 'this is error')
    }

    //     if(err) {,(err,createdUser)=>{
          
    //     } else {
    //         User.findById(req.body.userId, (err,foundUser)=>{
    //             if(err) {
    //             } else {
    //                 foundUser.photos.push(createdUser);
    //                 foundUser.save((err,saved)=>{
    //                     if(err) {
    //                         console.log(err)
    //                     } else {
    //                     res.redirect('/');
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // });
});










module.exports = router;