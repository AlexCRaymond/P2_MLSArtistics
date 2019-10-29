const express = require('express');
const router = express.Router();
const User = require ('../models/users.js')
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
    res.render('users/login.ejs', {
        message: req.session.message
    })
});

router.post('/login', async (req,res) => {
    try {
        const foundUser = await User.findOne({username: req.body.username});
        if(foundUser) {
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.username = foundUser.username;
                req.session.logged = true;
                res.redirect('/')

            } else {
                res.render('users/login.ejs', {
                    message: 'Whoops! Username or password is incorrect.'
                }) 
            }
        } else {
            res.render('users/login.ejs', {
            message: 'Whoops! Username or password is incorrect.'

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

    res.redirect('/')
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


module.exports = router;