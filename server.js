const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');

require('./db/db');

app.use(session({
    secret: "this is a random secret string",
    resave: false, 
    saveUninitialized: false 
    })
);
app.use((req, res, next) => {
    res.locals.username = req.session.username || null
    next()
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

const photosController = require('./controllers/photos');
app.use('/photos', photosController);

const usersController = require('./controllers/users');
app.use('/auth', usersController);

app.get('/', (req, res) => {
    res.render('home.ejs', {
        isLogged: req.session.logged,
        isAdmin: req.session.isAdmin
    })
});

app.get('/register', (req, res) => {
    res.render('users/register.ejs')
});

app.get('/',(req, res) => {
    res.render('/.ejs', {
    logOut: req.session.logOutMsg 
    });
});

app.listen(3000, () => {
    console.log('listening');
});