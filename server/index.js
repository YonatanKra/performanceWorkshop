// grab the packages we need
const express = require('express');
const app = express();
const faker = require('faker');
const port = process.env.PORT || 3000;

function generateData(nResponses = 1000) {
    let users = [];

    for (let i = 0; i < nResponses; i++) {

        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let email = faker.internet.email();

        users.push({
            "id": `${i}-${new Date().getTime()}`,
            "name": firstName + lastName,
            "email": email,
            "classified": Math.random() < .5
        });
    }

    return users;
}

// routes will go here
app.post('/api/search', function (req, res) {
    res.send(generateData());
});
// data received from server
const data = generateData(1024 * 1024);
console.log('Sorting');

const dataById = data.sort((a, b) => (a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0);
const dataByName = data.sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0);

app.get('/queryById', function parseById(req, res) {
    res.send(classify(dataById));
});

app.get('/queryByName', function parseByName(req, res) {
    res.send(classify(dataByName));
});

function classify(data) {
    return data.map((item) => {
        if (item.classified) {
            return {
                name: item.name,
                id: item.id,
                email: 'classified'
            }
        }
        return item;
    });
}

function test(type, data) {
    const startTime = new Date().getTime();
    for (let i = 0; i < 10; i++) {
        classify(data);
    }

    const endTime = new Date().getTime();
    console.log(`${type} ran in ${endTime - startTime} milliseconds`);
}

console.log('Starting Tests!');
test('byName', dataByName);
test('byId', dataById);
console.log('Finished Tests!');

app.use(express.static('dist'));

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
