const express = require('express');
const router = express.Router();


/**
 * 
 * @route   GET api / Posts
 * @desc    Test Route
 * @access  Public
 * 
 * */

router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;