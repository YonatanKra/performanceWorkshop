// grab the packages we need
const express = require('express');
const app = express();
const port = process.env.PORT || 3002;

app.use(express.static('dist'));

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
