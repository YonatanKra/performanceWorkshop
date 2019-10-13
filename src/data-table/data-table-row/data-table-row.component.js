import template from './data-table-row.component.html';

const rowTemplate = document.createElement('template');
rowTemplate.innerHTML = template;

class DataTableRow extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.appendChild(rowTemplate.content.cloneNode(true));
    }
}
customElements.define('data-table-row', DataTableRow);
