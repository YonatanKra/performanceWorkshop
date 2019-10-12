import template from './data-table.component.html';

const tableTemplate = document.createElement('template');
tableTemplate.innerHTML = template;

class DataApp extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.appendChild(tableTemplate.content.cloneNode(true));
        this._dataTable = shadowRoot.querySelector('.data-table');
    }

    refreshData(data) {
        data.forEach(datum => {
            const element = document.createElement('app-data-table-row');
            element.setAttribute('name', datum.name);
            this._dataTable.appendChild(element);
        });
    }
}
customElements.define('data-table', DataApp);
