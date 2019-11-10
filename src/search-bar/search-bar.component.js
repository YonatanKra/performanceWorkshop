import template from './search-bar.component.html';
import mdlStyle from '!!css-to-string-loader!!css-loader!!material-design-lite/material.min.css';
import dataTableStyle from '!!css-to-string-loader!!css-loader!!./search-bar.component.css';

const templateStyle = document.createElement('style');
templateStyle.innerHTML = mdlStyle + dataTableStyle;

const tableTemplate = document.createElement('template');
tableTemplate.innerHTML = template;
tableTemplate.content.appendChild(templateStyle);

function json(response) {
    return response.json()
}

class SearchBar extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.appendChild(tableTemplate.content.cloneNode(true));
        this._form = shadowRoot.querySelector('form');
        this._input = this._form[0];
        SearchBar.setupForm(this._form, this.submitForm, this);
    }

    submitForm(event) {
        event.preventDefault();
        const ctx = this;

        fetch(this.getAttribute('data-url'), {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `query=${this._input.value}`
        })
            .then(json)
            .then(function (data) {
                SearchBar.responseEvent('query-response', ctx, data);
            })
            .catch(function (error) {
                console.error('Request failed', error);
            });

        SearchBar.responseEvent('query-sent', ctx);
    }

    static responseEvent(eventName, ctx, data) {
        const event = new CustomEvent(eventName, { bubbles: false, cancelable: false, detail: data });
        ctx.dispatchEvent(event);
    }

    static setupForm(formElement, cb, ctx) {
        const callback = ctx ? cb.bind(ctx) : cb;
        formElement.addEventListener('submit', callback);
        ctx._input.addEventListener('focus', () => {
            ctx._input.parentElement.classList.add('is-focused');
        });
        ctx._input.addEventListener('focusout', () => {
            ctx._input.parentElement.classList.remove('is-focused');
        });
    }
}

if (!customElements.get('search-bar')) {
    customElements.define('search-bar', SearchBar);
}
