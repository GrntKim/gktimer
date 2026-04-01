import { LitElement, html, css } from "lit";

class CubeScramble extends LitElement {
  static styles = css``;

  static properties = {
    currentScramble: { type: String },
  };

  constructor() {
    super();
    this.currentScramble = "Generating...";
  }

  render() {
    return html`
      <div class="scramble-container">
        <p class="scramble-text">${this.currentScramble}</p>
        <span class="hint-text">Click to retrieve new scramble</span>
      </div>
    `;
  }
}

customElements.define("cube-scramble", CubeScramble);
