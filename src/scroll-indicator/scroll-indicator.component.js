import template from './scroll-indicator.component.html';
import style from '!!css-to-string-loader!!css-loader!!./scroll-indicator.component.css';

const templateStyle = document.createElement('style');
templateStyle.innerHTML = style;

const templateElement = document.createElement('template');
templateElement.innerHTML = template;
templateElement.content.appendChild(templateStyle);

class ScrollIndicator extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.appendChild(templateElement.content.cloneNode(true));
        this._indicator = shadowRoot.querySelector('#indicator');
        this._indicatorPos = 0;
    }

    updateScroll(elementHeight, scrollTop, animate) {
        this._indicator.style.left = 100 * (scrollTop / elementHeight) + '%';

        this._indicatorPos = this._indicator.style.left.replace('%', '');
    }
}

if (!customElements.get('scroll-indicator')) {
    customElements.define('scroll-indicator', ScrollIndicator);
}
