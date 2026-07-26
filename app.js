const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');

const expressSession = require('express-session');
const flash = require('connect-flash');

//Database connection is established here
const db = require("./config/mongoose-connection");

//Routes are called here
const ownerRouter = require('./routes/ownersRouter');
const userRouter = require('./routes/usersRouter');
const productRouter = require('./routes/productsRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
require('dotenv').config();

//Routes are used here
app.use('/owners', ownerRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);

app.get('/', (req, res) => {
    res.send('This is the home page!');
});


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})