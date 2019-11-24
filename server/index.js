// grab the packages we need
const express = require('express');
const app = express();
const faker = require('faker');
const port = process.env.PORT || 3000;

const nResponses = 1000;

function generateData() {
    let users = [];

    for (let i = 0; i < nResponses; i++) {

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
});

app.use(express.static('dist'));

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
