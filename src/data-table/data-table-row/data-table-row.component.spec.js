import './data-table-row.component';
import template from './data-table-row.component.html';

describe('App', () => {
    let rowElement;

    beforeEach(() => {
        rowElement = document.createElement('data-table-row');
        document.body.appendChild(rowElement);
    });

    it(`should add a row element`, () => {
        const div = document.createElement('div');
        div.innerHTML = template;
        expect(rowElement.innerHTML).toEqual(div.innerHTML);
    });

    it(`should set the text of the name div according to set attribute`, () => {
        const attribute = 'name';
        const names = ['Johnny', 'Lissa'];
        const nameElement = rowElement.querySelector('.data-table-row-name');
        const emptyText = nameElement.innerText;
        const elementNames = [];
        names.forEach(name => {
            rowElement.setAttribute('name', name);
            elementNames.push(rowElement.innerText);
        });

        expect(emptyText).toEqual('');
        elementNames.forEach((name, index) => {
           expect(name).toEqual(names[index]);
        });


    });
    afterEach(() => {
        document.body.removeChild(rowElement);
    });
});
