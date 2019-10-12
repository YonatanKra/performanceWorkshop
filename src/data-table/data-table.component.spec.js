import './data-table.component';

describe('Data Table', () => {
    let appElement, appRoot;

    beforeEach(() => {
        appElement = document.createElement('data-table');
        appRoot = appElement.shadowRoot;
        document.body.appendChild(appElement);
    });

    it(`should add the table element`, () => {
        const tableElement = appRoot.querySelector('.data-table');
        expect(tableElement).toBeTruthy();
    });

    it(`should add data rows according to the data array input`, () => {
        const data = [
            {id: Math.random().toString(), name: 'Name 1'},
            {id: Math.random().toString(), name: 'Name 2'},
            {id: Math.random().toString(), name: 'Name 3'}
        ];

        const elementsBeforeRefresh = appRoot.querySelectorAll('app-data-table-row');
        appElement.refreshData(data);
        const elementsAfterRefresh = appRoot.querySelectorAll('app-data-table-row');

        expect(elementsBeforeRefresh.length).toEqual(0);
        expect(elementsAfterRefresh.length).toEqual(data.length);

        elementsAfterRefresh.forEach((element, index) => {
            expect(element.getAttribute('name')).toEqual(data[index].name);
        })
    });

    afterEach(() => {
        document.body.removeChild(appElement);
    });
});
