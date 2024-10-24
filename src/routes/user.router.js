const express = require('express');
const router = express.Router(); 
const UserController = require('../controllers/user.controller')


router
    .get('/', UserController.getAll)
    .post('/store', UserController.store)
    .post('/login', UserController.login);


module.exports = router