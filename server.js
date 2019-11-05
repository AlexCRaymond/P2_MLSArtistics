const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
const Photo = require ('./models/photos.js')

require('dotenv').config()
require('./db/db');

const PORT = process.env.PORT

app.use(session({
    secret: "this is a random secret string",
    resave: false, 
    saveUninitialized: false 
    })
);

app.use((req, res, next) => {
    res.locals.username = req.session.username || null
    res.locals.userId = req.session.userId 
    res.locals.isAdmin = req.session.isAdmin || null
    next()
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

const photosController = require('./controllers/photos');
app.use('/photos', photosController);

const usersController = require('./controllers/users');
app.use('/users', usersController);

app.get('/', async (req, res) => {
    const getPhotos = await Photo.find({})
    console.log(getPhotos, 'this is photos')

    res.render('home.ejs', {
        isLogged: req.session.logged,
        isAdmin: req.session.isAdmin,
        photos: getPhotos

    })
});

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});