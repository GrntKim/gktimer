import { LitElement, html, css } from "lit";
import { randomScrambleForEvent } from "cubing/scramble";

class CubeScramble extends LitElement {
  static styles = css`
    .scramble-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem;
      margin-bottom: 2rem;
      background-color: #34495e;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      user-select: none;
    }

    .scramble-container:hover {
      background-color: #3e566e;
    }

    .scramble-text {
      font-size: 1.8rem;
      font-weight: 700;
      color: #f1c40f;
      letter-spacing: 2px;
      line-height: 1.5;
      text-align: center;
      margin: 0;
    }

    .hint-text {
      font-size: 0.85rem;
      color: #bdc3c7;
      margin-top: 10px;
      opacity: 0.7;
    }
  `;

  static properties = {
    currentScramble: { type: String },
  };

  constructor() {
    super();
    this.currentScramble = "Generating...";
  }

  connectedCallback() {
    super.connectedCallback();
    this.generateNewScramble();
  }

  render() {
    return html`
      <div
        class="scramble-container"
        title="Click to retrieve new scramble"
        @click=${this.generateNewScramble}
      >
        <p class="scramble-text">${this.currentScramble}</p>
        <span class="hint-text">Click to retrieve new scramble</span>
      </div>
    `;
  }

  async generateNewScramble() {
    this.currentScramble = "Generating...";

    try {
      const scrambleAlg = await randomScrambleForEvent("333");
      this.currentScramble = scrambleAlg.toString();
    } catch (error) {
      console.error("Failed generating scramble: ", error);
      this.currentScramble = "An error occured. Please click again.";
    }
  }
}

customElements.define("cube-scramble", CubeScramble);
