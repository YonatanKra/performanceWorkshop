import template from './data-table-row.component.html';

const rowTemplate = document.createElement('template');
rowTemplate.innerHTML = template;

class DataTableRow extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.appendChild(rowTemplate.content.cloneNode(true));
        this.ready = true;
        DataTableRow.observedAttributes.forEach(attribute => {
            DataTableRow.setElementText(this, attribute, this.getAttribute(attribute));
        });

    }

    static get observedAttributes() {
        return ['name'];
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        if (!this.ready) {
            return;
        }
        DataTableRow.setElementText(this, attribute, newValue);
    }

    static setElementText(parent, attribute, text) {
        const element = parent.querySelector('.data-table-row-' + attribute);
        if (!element) {
            return;
        }
        element.innerText = text;
    }
}
if (!customElements.get('data-table-row')) {
    customElements.define('data-table-row', DataTableRow);
}
