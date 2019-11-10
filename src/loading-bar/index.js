const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        display: block;
        width: 100%;
        height: 1.1em;
        position: relative;
        overflow: hidden;
    }
    :host([hidden]) {
        display: none !important;
    }
    
    #text {
        z-index: 999;
        position: absolute;
        text-align: center;
        width: 100%;
    }
    
    #primaryProgress {
        background: var(--progress-bar-color, #37A0CE);
        position:  absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: scaleX(0);
        transform-origin: right center;
        animation: indeterminate-bar var(--progress-bar-duration, 2s) var(--progress-bar-delay, 0s) linear infinite;
    }
    #primaryProgress.finished {
        animation: none;
    }
    #primaryProgress::after {
        content: "";
        transform-origin: center center;
        animation: indeterminate-splitter var(--progress-bar-duration, 2s) var(--progress-bar-delay, 0s) linear infinite;
    }
    #primaryProgress.finished::after {
        animation: none;
    }
    @keyframes indeterminate-bar {
        0% {
            transform: scaleX(1) translateX(-100%);
        }
        50% {
            transform: scaleX(1) translateX(0%);
        }
        75% {
            transform: scaleX(1) translateX(0%);
            animation-timing-function: cubic-bezier(.28,.62,.37,.91);
        }
        100% {
            transform: scaleX(0) translateX(0%);
        }
    }
    @keyframes indeterminate-splitter {
        0% {
            transform: scaleX(.75) translateX(-125%);
        }
        30% {
            transform: scaleX(.75) translateX(-125%);
            animation-timing-function: cubic-bezier(.42,0,.6,.8);
        }
        90% {
            transform: scaleX(.75) translateX(125%);
        }
        100% {
            transform: scaleX(.75) translateX(125%);
        }
    }
</style>

<span id="text">Loading...</span>
<div id="primaryProgress"></div>
`;

class ProgressBar extends HTMLElement {
    static get is() {
        return 'progress-bar';
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['disabled', 'text'];
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    set disabled(value) {
        if (value) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    get text() {
        return this.getAttribute('text');
    }

    set text(value) {
        if (value) {
            this.setAttribute('text', value);
        }
    }
    _iterationCallback() {
        this.shadowRoot.querySelector('#primaryProgress').classList.add('finished');
    }

    attributeChangedCallback() {
        const progress = this.shadowRoot.querySelector('#primaryProgress');
        if (this.disabled)
            progress.addEventListener('animationiteration', this._iterationCallback.bind(this), {
                once: true,
                passive: true
            });
        else
            progress.classList.remove('finished');

        if (this.text) {
            this.shadowRoot.querySelector('#text').innerText = this.text;
        }
    }
}

if (!customElements.get('progress-bar')) {
    customElements.define('progress-bar', ProgressBar);
}
