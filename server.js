const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

require('./db/db');

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

const photosController = require('./controllers/photos');
app.use('/photos', photosController);

const usersController = require('./controllers/users');
app.use('/users', usersController);

app.get('/', (req, res) => {
    res.render('home.ejs')
});

app.listen(3000, () => {
    console.log('listening');
});