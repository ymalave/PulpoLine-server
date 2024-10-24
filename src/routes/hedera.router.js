const express = require('express');
const router = express.Router(); 
const HederaController = require('../controllers/hedera.controller')


router
    // .get('/', HederaController.getAll)
    .post('/store', HederaController.store)
    // .post('/login', HederaController.login);


module.exports = router