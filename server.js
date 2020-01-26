const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },

        {
            id: '1234',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
};

app.get('/', (req, res) => {
    res.json(database.users);
});

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.status(400).json('error logging in');
    }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push(
        {
            id: '125',
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
        }
    );
    res.json(database.users[database.users.length - 1]);
});

app.listen(5000, () => console.log('app is running on port 5000'));

/*
    / -> res = this is working
    /signin -> POST res = success or fail
    /register -> POST res = new user
    /profile/:userId -> GET res = user
    /image -> PUT res = updated user
*/