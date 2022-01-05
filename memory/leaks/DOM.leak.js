/**
 * DOM leak
 */

function createSpecialElement() {
    element = document.createElement('div');
    document.body.appendChild(element);
    // do special stuff with element
    setTimeout(() => {
        console.log('Cleaned');
        document.body.removeChild(element);
    }, 5000);
    return element;
}

let cachedDOM;
function leakDOM() {
    cachedDOM = createSpecialElement();
}

function nonLeakedDOM() {
    createSpecialElement();
}
