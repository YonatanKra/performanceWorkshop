// grab the packages we need
const express = require('express');
const app = express();
const faker = require('faker');
const port = process.env.PORT || 3000;

let nResponses = 1000;

function generateData(responses = nResponses) {
    const fakeId = `${1}-${new Date().getTime()}`;
    const fakeName = faker.name.firstName();
    const fakeEmail = faker.internet.email();

    let users = new Array(responses).fill(0).map(i => ({
        id: fakeId, name: fakeName, email: fakeEmail
    }));

    for (let i = 0; i < responses; i++) {

        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let email = faker.internet.email();

        users[i]["id"] = `${i}-${new Date().getTime()}`;
        users[i]["name"] = firstName + lastName;
        users[i]["email"] = email;
    }

    return users;
}

function generateData2(responses = nResponses) {
    let users = [];

    for (let i = 0; i < responses; i++) {

        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let email = faker.internet.email();

        users.push({
            "id": `${i}-${new Date().getTime()}`,
            "name": firstName + lastName,
            "email": email
        });
    }

    return users;
}

// routes will go here
app.post('/api/search', function(req, res) {
    res.send(generateData());
    nResponses *= 10;
});

app.post('/api/bad-search', function(req, res) {
    res.send(generateData2());
});

app.post('/api/good-search', function(req, res) {
    res.send(generateData());
});

app.use(express.static('dist'));

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
