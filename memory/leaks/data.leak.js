class Data {
    constructor() {
        this.data = new Array(1000000).fill(1)
    }
}

let aVeryImportantObject = {};
function leakingObject() {
    let aLessImportantObject = {
        data: new Data()
    };

    setTimeout(() => {
        aLessImportantObject = null;
        console.log('Data has been deleted!');
    }, 1500);

    return aLessImportantObject;
}

function leakObject() {
    aVeryImportantObject = leakingObject();
    setTimeout(() => {
        aVeryImportantObject = null;
        console.log('Now it was really deleted!');
    }, 3000);
}

module.exports = {
    leakObject,
}
