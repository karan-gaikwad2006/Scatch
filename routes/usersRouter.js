const express = require('express');
const router = express.Router();
const {registeredUser , loginUser , logoutUser} = require('../controllers/authController');

router.get('/', (req, res) => {
    res.send('Hey its working!');
});

//You can use JOI to validate the data before sending it to the database.
router.post('/register', registeredUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

module.exports = router;