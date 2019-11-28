import './search-bar.component';
const originalFetch = window.fetch;
window.fetch = require('whatwg-fetch').fetch;
import 'jasmine-ajax';

describe('Data Table', () => {
    function dispatchSubmit(form) {
        const event = new Event('submit', {
            'bubbles'    : false, // Whether the event will bubble up through the DOM or not
            'cancelable' : true  // Whether the event may be canceled or not
        });
        form.dispatchEvent(event);
    }

    let searchElement, appRoot, form;
    const success = {
        status: 200,
        responseText: `["item", "item2"]`
    };
    const URL = 'https://localhost:8080';

    afterAll(() => {
        window.fetch = originalFetch;
    });

    beforeEach(() => {
        jasmine.Ajax.install();
        searchElement = document.createElement('search-bar');
        appRoot = searchElement.shadowRoot;
        document.body.appendChild(searchElement);
        form = appRoot.querySelector('form');
    });

    describe(`submit`, () => {
        it(`should send query to remote-server`, () => {
            searchElement.setAttribute('data-url', URL);
            dispatchSubmit(form);
            const request = jasmine.Ajax.requests.mostRecent();
            expect(request != undefined).toBe(true);
            expect(request.method).toBe('POST');
            expect(request.url).toBe(URL);
        });

        it(`should emit a query-response event with the results`, (done) => {
            let responseJson;
            searchElement.setAttribute('data-url', URL);

            searchElement.addEventListener('query-response', (event) => {
                expect(event.detail).toEqual(JSON.parse(success.responseText));
                done();
            });

            jasmine.Ajax.stubRequest(URL).andReturn(success);
            dispatchSubmit(form);
        });
    });


    afterEach(() => {
        jasmine.Ajax.uninstall();
        document.body.removeChild(searchElement);
    });
});
