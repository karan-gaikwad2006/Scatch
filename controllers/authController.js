const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user_model');
const { generateToken } = require('../utils/generateToken');

module.exports.registeredUser = async (req, res) => {

    try {
        let { name, email, password } = req.body;

        let user = await userModel.findOne({ email });
        if (user){
            req.flash('error', 'User already exists');
            return res.redirect("/");
        } 
            
        // Hash the password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) { res.send(err.message) }
                else {
                    let user = await userModel.create({
                        name,
                        email,
                        password: hash,
                    });

                    let token = generateToken(user);
                    res.cookie('token', token);
                    res.send("User created successfully");
                }

            })
        })
    } catch (err) {
        res.status(500).send(err.message);
    }

}

module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email });
        if (!user) {
            req.flash('error', 'User does not exist');
            return res.redirect('/');
        }

        // Compare the password
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = generateToken(user);
                res.cookie('token', token);
                res.send("Login successful");
            } else {
                req.flash('error', 'Invalid credentials');
                return res.redirect('/');
            }
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports.logoutUser = (req, res) => {
    res.cookie("token" , "");
    res.redirect('/');
}