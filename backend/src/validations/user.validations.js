const users = require('../assets/users.json');

const userBody = (req, res, next) => {
    const { id, name, lastname, email, password } = req.body;

    if (id && name && lastname && email && password) {
        next();
    }

    return res.status(406).json({error: 'Plase include all required fields'});
}

const alreadyExist = (req, res, next) => {
    const {id, email} = req.body;
    
    const [exist] = users.filter(item => {
        if (item.id === Number(id) || item.email === email) {
            return item;
        }
    });

    if (!exist) {
        next();
    }

    return res.status(406).json({error: 'Usuario ya existe!'})
}

module.exports = { userBody, alreadyExist };