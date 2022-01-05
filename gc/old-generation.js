const http = require('http');

console.log("Starting the GC Demo");

const NUMBER_IN_BYTES = 8;
const oneKilobyteNumbers = 1024 / NUMBER_IN_BYTES;
const SIZE_IN_MEGABYTES = 50;
let size = SIZE_IN_MEGABYTES * oneKilobyteNumbers * 1024;
let oldArray = [];

function createANewArray(n) {
    return new Array(n).fill(Math.random());
}

const requestHandler = function(req, res) {
    res.writeHead(200);
    switch(req.url) {
        case '/new':
            res.end(JSON.stringify(createANewArray(100)));
            break;
        case '/old':
            res.end(JSON.stringify(oldArray));
            break;
        case '/clear':
            console.log('Clearing!!!');
            oldArray.length = 0;
            res.end('Cleared Memory');
            break;
        default:
            oldArray = createANewArray(size);
            res.end("Old Array Size: " + oldArray.length * NUMBER_IN_BYTES / 1000);
            return;
    }
}

const server = http.createServer(requestHandler);
server.listen(8080);
