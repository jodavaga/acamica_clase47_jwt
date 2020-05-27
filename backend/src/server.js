const express = require('express');
const bodyParser = require('body-parser');

// Middlewares
const validations = require('./validations/user.validations');

// data
const data = require('./assets/users.json');

const app = express();

app.use(bodyParser());

// --------------- MOCK interface
// {
//     id: '',
//     name: '',
//     lastname: '',
//     email: '',
//     password: ''
// }

const users = data;


app.post('/users', validations.userBody, validations.alreadyExist, (req, res) => {

    const user = {...req.body};
    console.log(user);

    users.push(user);
    res.json({
        status: 200,
        user: user
    });
    
});

app.get('/users', (req, res) => {
    res.json(users);
})


app.listen(3000, () => {
    console.log('Initialized Server');
})