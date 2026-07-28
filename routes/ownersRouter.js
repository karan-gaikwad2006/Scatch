const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner_model');

if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        let owner = ownerModel.find();
        if (owner.length > 0) {
            res.status(500).send("You dont have permission to create more than one owner");
        }

        let {name,email,password} = req.body;
        let createdOwner = await ownerModel.create({
            name,
            email ,
            password,

        });
        res.status(201).send(createdOwner);
    })
};

router.get('/admin', (req, res) => {
    let success = req.flash('success');
    res.render("createproducts", {success});
});

module.exports = router;