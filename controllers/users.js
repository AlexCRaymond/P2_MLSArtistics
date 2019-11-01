const express = require('express');
const router = express.Router();
const User = require ('../models/users.js')
const Photo = require ('../models/photos.js')
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
    res.render('users/login.ejs', {
        message: req.session.message,
        isLogged: req.session.logged,
        photoUpload: req.session.upload,
        isAdmin: req.session.isAdmin
    })
});

router.get('/register', (req, res) => {
    res.render('users/register.ejs', {
        message: req.session.message,
        isLogged: req.session.logged,
        photoUpload: req.session.logged,
        isAdmin: req.session.isAdmin
        
    })
});

router.get('/artcart/:id', async (req,res) => {
    const foundUser = await User.findById(req.params.id).populate('artCart')
    console.log(foundUser)
    res.render('users/artcart.ejs', {
        message: req.session.message,
        isLogged: req.session.logged,
        photoUpload: req.session.upload,
        foundUser
    })
})

router.post('/artcart/:id', async (req, res)=>{
    try{
        const foundPhoto = await Photo.findById(req.params.id)
        const foundUser = await User.findById(req.session.userId)
        foundUser.artCart.push(foundPhoto)
        await foundUser.save()
        res.redirect('/')
    }catch(err){
        console.log(err)
    }
});

router.post('/login', async (req,res) => {
    try {
        const foundUser = await User.findOne({username: req.body.username});
        if(foundUser) {
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.username = foundUser.username;
                req.session.logged = true;
                req.session.isAdmin = foundUser.isAdmin
                req.session.userId = foundUser._id
                res.redirect('/')

            } else {
                res.render('users/login.ejs', {
                    message: 'Whoops! Username or password is incorrect.',
                    isLogged: req.session.logged,
                    photoUpload: req.session.logged,
                }) 
            }
        } else {
            res.render('users/login.ejs', {
            message: 'Whoops! Username or password is incorrect.',
            isLogged: req.session.logged,
            })
        }
    }

    catch(err){
        res.send(err)
    }
});

router.post('/register', async (req, res) => {
    const password = req.body.password; 
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const userDbEntry = {};
    
    userDbEntry.username = req.body.username;
    userDbEntry.password = passwordHash
    userDbEntry.email = req.body.email;
    
    const createdUser = await User.create(userDbEntry);
    req.session.username = createdUser.username;
    req.session.logged = true;
    req.session.userId = createdUser._id
    
    res.redirect('/')
});

router.get('/:id/edit', (req, res) => {
    Photo.findById(req.params.id, (err, foundPhoto) => {
        if(err){
            console.log(err)
            res.send(err);
        } else {
            res.render('users/edit.ejs', {
                photo: foundPhoto
            });
        }
    });
});

router.get('/logout', (req, res) => {

    req.session.destroy((err) => {
        if(err){
            res.send(err);
        } else {
            res.redirect('/');
        }
    });
});

router.delete('/artcart/:id/delete', async(req, res) => {
    try {
        console.log(req.session)
        const foundUser = await User.findById(req.session.userId)
        console.log(foundUser)
        foundUser.artCart = foundUser.artCart.filter(art => art._id.toString() !== req.params.id)
        await foundUser.save()
        res.redirect('/')
        
    } catch(err) {
        console.log(err)
    }
})

router.delete('/artcart/:id', async (req,res) => {
    try {
        const deletePhoto = await Photo.findByIdAndRemove(req.params.id)
        res.redirect('/')
    } catch(err) {
        console.log(err, 'this is delete error')
    }
});


module.exports = router;