/**
 * Closure leak
 */

let global = null;
function parentScope() {
    // a closure that references localGlobal
    function childScope() {
        if (localGlobal && localData && localData.data) {
            console.log('local has data!');
        }
    }

    let localData = {
        data: new Data()
    };

    let localGlobal = global;
    global = {
        // This will hold ref to localGlobal because every closure inside parentScope will reference its lexical env
        leaker: function() {

        }
    }

    console.log('Leaking');
}

function leakClosure() {
    let interval = setInterval(parentScope, 500);
    setTimeout(() => window.clearInterval(interval), 5000);
}






