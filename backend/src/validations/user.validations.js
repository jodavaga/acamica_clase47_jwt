const users = require('../assets/users.json');

const userBody = (req, res, next) => {
    const { id, name, lastname, email, password } = req.body;

    console.log(`Method: ${ req.method }`);
    console.log(`Path: ${ req.path }`);

    if(req.method === 'PUT' && req.path === '/users/update/') {
        next();
    }

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

const findByEmail = (req, res, next) => {
    const email = req.query.email;

    const [actualUser] = users.filter(elem => {
        if (elem.email === email) {
            return elem;
        }
    });

    if (!actualUser) {
        return res.status(404).json({error: 'usuario o email no existe'});
    }

    next();
}

module.exports = { userBody, alreadyExist, findByEmail };