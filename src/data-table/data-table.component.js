import template from './data-table.component.html';
import mdlStyle from '!!css-to-string-loader!!css-loader!!material-design-lite/material.min.css';
import 'material-design-lite/material.min';

const templateStyle = document.createElement('style');
templateStyle.innerHTML = mdlStyle;

const tableTemplate = document.createElement('template');
tableTemplate.innerHTML = template;
tableTemplate.content.appendChild(templateStyle);

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
