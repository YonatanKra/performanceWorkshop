function addElement() {
    const newElement = document.createElement('div');
    elements.push(newElement);
    newElement.style.border = '2px solid';
    newElement.style.width = '50px';
    newElement.style.height = '50px';
    container.appendChild(newElement);
}

const elements = [];
const container = document.createElement('div');

const addElementButton = document.createElement('button');
addElementButton.innerText = 'Add Elements';

const removeElementButton = document.createElement('button');
removeElementButton.innerText = 'Remove Elements';

addElementButton.addEventListener('click', e => {
    for (let i = 0; i < 1000; i++) {
        addElement();
    }
});

removeElementButton.addEventListener('click', e => {
    elements.forEach(el => el.remove());
});


document.body.appendChild(addElementButton);
document.body.appendChild(removeElementButton);
document.body.appendChild(container);

