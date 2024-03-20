const express = require('express');
const { testUserControler } = require('../controllers/testController');

//router object
const router = express.Router()

//routes GET |POST | PUT | DELETE
router.get('/test-user', testUserControler )

//export
module.exports = router