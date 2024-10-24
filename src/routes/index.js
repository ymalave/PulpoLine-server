const express = require('express'); 

const UserRouter = require('./user.router')
const HederaRouter = require('./hedera.router')


function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router); 
    router.use('/users', UserRouter);
    router.use('/hedera', HederaRouter);
}


module.exports = routerApi;