const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();

app.use(bodyParser.json());


const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },

        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: 987,
            hash: '',
            email: 'john@gmail.com'
        }
    ]
};

app.get('/', (req, res) => {
    res.json(database.users);
});

app.post('/signin', (req, res) => {
    // Load hash from your password DB.
    bcrypt.compare("apples", '$2a$10$2N3.ZllHqjqS0Bjh4YOQXOJBAN0zzoD1ptcKCm40gQPb2pWvHvuYm', function(err, res) {
        // res == true
        console.log('first guess: ', res);
    });
    bcrypt.compare("veggies", '$2a$10$2N3.ZllHqjqS0Bjh4YOQXOJBAN0zzoD1ptcKCm40gQPb2pWvHvuYm', function(err, res) {
        // res = false
        console.log('second guess: ', res);
    });
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

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        return res.status(400).json('not found');
    }
});

app.post('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        return res.status(400).json('not found');
    }
});


// bcrypt.hash(password, null, null, function(err, hash) {
//     console.log(hash);
// });
// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(5000, () => console.log('app is running on port 5000'));

/*
    / -> res = this is working
    /signin -> POST res = success or fail
    /register -> POST res = new user
    /profile/:userId -> GET res = user
    /image -> PUT res = updated user
*/