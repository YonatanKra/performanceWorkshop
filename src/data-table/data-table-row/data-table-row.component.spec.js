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

    afterEach(() => {
        document.body.removeChild(rowElement);
    });
});
