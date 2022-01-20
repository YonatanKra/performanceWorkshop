const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const {leakObject} = require('./data.leak');
const {leakClosure} = require('./context');

// routes will go here
app.get('/context', function(req, res) {
    res.send(leakClosure());
});

app.get('/data', function(req, res) {
    res.send(leakObject());
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
