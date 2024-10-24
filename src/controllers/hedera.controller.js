const HederaService = require('../services/hedera.service');


const service = new HederaService()


const store = async ( req, res ) => {
    try { 
        const response = await service.createToken(req.body);
        res.json({ success: true, data: response});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


module.exports = {
    store
}