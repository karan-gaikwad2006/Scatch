require('dotenv').config();
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
const productModel = require('./models/product_model');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET || "fallbackSecretKey",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


//Routes are used here
app.use('/owners', ownerRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);

app.get('/', (req, res) => {
    res.send('This is the home page!');
});

app.get("/loginpage",(req,res)=>{
    let error = req.flash('error');
    res.render("login", { error });
});

app.get("/cart", (req, res) => {
    res.render("cart");
});

app.get("/shop", async (req, res) => {
    try {
        const products = await productModel.find();
        res.render("shop", { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading shop page.');
    }
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})