const http = require('http');

function buildArray1(n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(i);
    }
    return arr;
}

function buildArray2(n) {
    const arr = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        arr[i] = i;
    }
    return arr;
}

const size = 1e6;
const buildArrays = function(req, res) {
    setTimeout(() => {
        console.time('buildArray1');
        buildArray1(size);
        console.timeEnd('buildArray1');
        setTimeout(() => {
            console.time('buildArray2');
            buildArray2(size);
            console.timeEnd('buildArray2');
        }, 1500);
    }, 1000);
}

const requestHandler = function(req, res) {
    res.writeHead(200);
    buildArrays();
    console.log('Done');
    res.end("Done");
}
const server = http.createServer(requestHandler);
server.listen(8081);















// const n = 1000000;
// setTimeout(() => {
//     console.log('started array 1');
//     buildArray1(n);
//     console.log('finished array 1');
//     setTimeout(() => {
//         console.log('started array 2');
//         buildArray2(n);
//         console.log('finished array 2');
//         setTimeout(() => {
//             console.log('started array 1');
//             buildArray2(n);
//             console.log('finished array 1');
//             setTimeout(() => {
//                 console.log('started array 2');
//                 buildArray1(n);
//                 console.log('finished array 2');
//             }, 200);
//         }, 500);
//     }, 200);
// }, 2500);
