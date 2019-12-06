/**
 * Closure leak
 */

let global = null;
function parentScope() {
    function childScope() {
        if (localGlobal && localData && localData.data) {
            console.log('local has data!');
        }
    }

    let localData = {
        data: new Array(1000000).fill(1)
    };

    let localGlobal = global;
    global = {
        leaker: function() {

        }
    }

    console.log('Leaking');
}

function leakClosure() {
    setInterval(parentScope, 500);
}

/**
 * DOM leak
 */

function createSpecialElement() {
    element = document.createElement('div');
    document.body.appendChild(element);
    // do special stuff with element
    setTimeout(() => {
        document.body.removeChild(element);
    }, 10000);
    return element;
}

let cachedDOM;
function leakDOM() {
    const cacheeDOM = createSpecialElement();
}

let aVeryImportantObject = {};
function leakingObject() {
    let aLessImportantObject = {
        data: new Array(1000000).fill(1)
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




