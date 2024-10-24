const UserService = require('../services/user.sevice');

const service = new UserService();


const getAll = async (req, res) => {
    try {
        const response = await service.findAllUsers();
        res.json({ success: true, data: response});
    }catch(error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const store = async ( req, res ) => {
    try { 
        const response = await service.create(req.body);
        res.json({ success: true, data: response});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


const login = async ( req, res ) => {
    try { 
        const {username, password} = req.body;
        const response = await service.authenticateUser(username, password);
        res.json({ success: true, data: response});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


module.exports = {
    getAll, store, login
}



