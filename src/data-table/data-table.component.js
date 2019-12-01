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
        this._dataTable.style.height = (window.innerHeight * .75) + 'px';
        this._data = [];
        this.propagateTableScroll();
        this.rows = [];
        this.lastFree = this.freeRow = null;
    }

    propagateTableScroll() {
        this._dataTable.addEventListener('scroll', () => {
           DataApp.emitEvent(this, 'table-scroll', {
               scrollHeight: this._dataTable.scrollTop,
               tableHeight: this._dataTable.scrollHeight
           });
        });
        }

        addNewRow() {
            const element = document.createElement('data-table-row');
            this.rows.push(element);
            this.releaseRow(element);
            return element;
        }

        releaseRow(row) {
            row.free = true;
            row.nextRow = null;
            row.previousRow = this.lastFree;
            if (row.previousRow) {
                this.lastFree.nextRow = row;
            } else {
                this.freeRow = row;
            }
            this.lastFree = row;
        }

        releaseAllRows() {
            for (let i = 0; i < this.rows.length; i++) {
                if (this.rows[i].free) {
                    continue;
                }
                this.releaseRow(this.rows[i]);
            }
        }

        getFreeRow() {
            const row = this.freeRow ? this.freeRow : this.addNewRow();
            // set the row as used
            row.free = false;
            this.freeRow = row.nextRow;
            if (!this.freeRow) this.lastFree = null;
            return row;
        }

    refreshData(data, clear) {
        if (!clear) {
            this._data = [...this._data, ...data];
        } else {
            this._data = data;
            this._dataTable.innerHTML = '';
            this.releaseAllRows();
        }

        data.forEach(datum => {
            let element = this.getFreeRow();

            element.setAttribute('name', datum.name);
            element.setAttribute('id', datum.id);
            element.setAttribute('email', datum.email);

            this._dataTable.prepend(element);

            requestAnimationFrame(() => {
                DataApp.emitEvent(this, 'added-row', {
                    text: element.innerText
                });
            });
        });

        requestAnimationFrame(() => {
            DataApp.emitEvent(this, 'data-table-updated', {
                data,
                scrollHeight: this._dataTable.scrollTop,
                tableHeight: this._dataTable.scrollHeight
            });
        });

        console.log(this.rows.length);
    }

    sortByName(sorter) {
        if (!this._data) return;
        this.sorted = !this.sorted;
        let sortBy = 'name';
        if (!this.sorted) {
            sortBy = 'id';
        }

        let sortedArray = sorter({data: this._data, sortBy});
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
