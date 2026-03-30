import { LitElement, html, css } from "lit";
import "./components/scramble/index.js";

class MainApp extends LitElement {
  static styles = css`
    main {
      padding: 2rem;
      font-family: sans-serif;
    }
  `;

  static properties = {
    retrievedScramble: { type: String },
  };

  constructor() {
    super();
    this.retrievedScramble = "";
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <main>
        <cube-scramble></cube-scramble>
      </main>
    `;
  }
}

customElements.define("cube-app", MainApp);
