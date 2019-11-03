import './data-table-row/data-table-row.component';

import template from './data-table.component.html';
import mdlStyle from '!!css-to-string-loader!!css-loader!!material-design-lite/material.min.css';
import dataTableStyle from '!!css-to-string-loader!!css-loader!!./data-table.component.css';

const templateStyle = document.createElement('style');
templateStyle.innerHTML = mdlStyle + dataTableStyle;

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
            const element = document.createElement('data-table-row');
            element.setAttribute('name', datum.name);
            
            this._dataTable.prepend(element);
        });

        DataApp.emitEvent(this, 'data-table-updated', {
            scrollEnd: this._dataTable.scrollHeight
        });
    }

    static emitEvent(ctx, eventName, data, options = { bubbles: false, cancelable: false }) {
        options.detail = data;
        const event = new CustomEvent(eventName, options);
        ctx.dispatchEvent(event);
    }
}
if (!customElements.get('data-table')) {
    customElements.define('data-table', DataApp);
}
