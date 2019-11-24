import './data-table-row/data-table-row.component';

import template from './data-table.component.html';
import mdlStyle from '!!css-to-string-loader!!css-loader!!material-design-lite/material.min.css';
import dataTableStyle from '!!css-to-string-loader!!css-loader!!./data-table.component.css';

function bubbleSort(sortInput) {
    const sortedArray = JSON.parse(JSON.stringify(sortInput.data));
    const prop = sortInput.sortBy;
    for (let i = 0; i < sortedArray.length; i++) {
        for (let j = i + 1; j < sortedArray.length - 1; j++) {
            if (sortedArray[i][prop] > sortedArray[j][prop]) {
                const tmp = sortedArray[i];
                sortedArray[i] = sortedArray[j];
                sortedArray[j] = tmp;
            }
        }
    }
    return sortedArray;
}

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
        this._data = [];
    }

    refreshData(data, clear = false) {
        data.reverse();
        if (!clear) {
            this._data = [...data, ...this._data];
        } else {
            this._data = data;
            this._dataTable.innerHTML = '';
        }

        data.forEach(datum => {
            const element = document.createElement('data-table-row');
            element.setAttribute('name', datum.name);
            element.setAttribute('id', datum.id);
            element.setAttribute('email', datum.email);

            this._dataTable.prepend(element);
        });
    }

    sortByName() {
        if (!this._data) return;
        this.sorted = !this.sorted;
        let sortBy = 'name';
        if (!this.sorted) {
            sortBy = 'id';
        }

        const sortedArray = bubbleSort({data: this._data, sortBy});
        this.refreshData(sortedArray, true);
    }

    static emitEvent(ctx, eventName, data, options = {bubbles: false, cancelable: false}) {
        options.detail = data;
        const event = new CustomEvent(eventName, options);
        ctx.dispatchEvent(event);
    }
}

if (!customElements.get('data-table')) {
    customElements.define('data-table', DataApp);
}
