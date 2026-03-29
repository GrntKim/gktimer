import style from './style.css?inline';

import { randomScrambleForEvent } from 'cubing/scramble';

class CubeScramble extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.currentScramble = "Generating...";
    }

    connectedCallback() {
        this.render();
        this.setupEvents();

        this.generateNewScramble();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${style}</style>
            <div class="scramble-container" title="Click to retrieve new scramble">
                <p class="scramble-text">${this.currentScramble}</p>
                <span class="hint-text">Click to retrieve new scramble</span>
            </div>
        `;
    }

    setupEvents() {
        const container = this.shadowRoot.querySelector('.scramble-container');
        const textElement = this.shadowRoot.querySelector('.scramble-text');

        container.addEventListener('click', () => {
            this.generateNewScramble();
        });
    }

    async generateNewScramble() {
        const textElement = this.shadowRoot.querySelector('.scramble-text');
        textElement.textContent = "Generating...";

        try {
            const scrambleAlg = await randomScrambleForEvent('333');
            this.currentScramble = scrambleAlg.toString();
            textElement.textContent = this.currentScramble;
        } catch (error) {
            console.error("Failed generating scramble: ", error);
            textElement.textContent = "An error occured. Please click again.";
        }
    }
}

customElements.define('cube-scramble', CubeScramble);