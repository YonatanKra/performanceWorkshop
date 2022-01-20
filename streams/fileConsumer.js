const fs = require('fs');
const server = require('http').createServer();
const fileName = './data.small.file';//'./data.file';
server.on('request', async (req, res) => {
    res.writeHead(200);
    if (req.url === '/stream') {
        const data = fs.createReadStream(fileName);
        console.log('Got Data as stream');
        await new Promise(res => setTimeout(res, 5000));
        data.pipe(res);
        return;
    }
    fs.readFile(fileName, async (err, data) => {
        if (err) throw err;
        console.log('Got Data: ', data.length);
        await new Promise(res => setTimeout(res, 5000));
        res.end(data);
    });
});

server.listen(8000);
