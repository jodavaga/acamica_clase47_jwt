const express = require('express');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

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
const mySecret = 'MyS3cr3t';

// Login by email and pass
app.post('/login', validations.validateUserPass, (req, res) => {

    const token = jwt.sign({
        email: req.body.email
        }, mySecret);

    res.json({token: token});
});

// update users by email
app.put('/users/update', validations.findByEmail, validations.userBody, (req, res) => {


    const index = users.findIndex((usr) => {
        if (usr.email === req.query.email) {
            return usr;
        }
    });
    
    // we must persist ID.
    const newUser = {id: users[index].id, ...req.body};
    users.splice(index, 1, newUser);

    res.json({
        message: 'Updated',
        user: newUser
    });

});

app.put('/is_admin', validations.findByEmail, (req, res) => {
    
    let index = null;
    const [actualUser] = users.filter((usr, i) => {
        if (usr.email === req.query.email) {
            this.index = i;
            return usr;
        }
    });

    actualUser.is_admin = req.body.is_admin;

    users.splice(index, 1, actualUser);

    res.json({
        message: 'Updated!',
        user: actualUser
    });

});


// add new users
app.post('/users', validations.userBody, validations.alreadyExist, (req, res) => {

    const user = {...req.body};

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