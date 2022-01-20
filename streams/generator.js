function printProgress(progress){
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(progress + '%');
}
const fs = require('fs');
const size = 2*1e7;

let string = '';
for(let i=0; i<= size; i++) {
    string += `${Math.random() * 100}\n`;
    if (i % 10000 === 0) printProgress(i / size);
}

for (let j = 0; j < 1; j++) {
    if (j % 100 === 0) printProgress(j / 10);
    fs.appendFileSync('./streams/data.small.file', string);//.write(`${Math.random() * 100}\n`);
}

for (let j = 0; j < 4; j++) {
    if (j % 100 === 0) printProgress(j / 10);
    fs.appendFileSync('./streams/data.medium.file', string);//.write(`${Math.random() * 100}\n`);
}

for (let j = 0; j < 10; j++) {
    if (j % 100 === 0) printProgress(j / 10);
    fs.appendFileSync('./streams/data.big.file', string);//.write(`${Math.random() * 100}\n`);
}

