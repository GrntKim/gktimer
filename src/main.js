import { LitElement, html, css } from "lit";
import { randomScrambleForEvent } from "cubing/scramble";
import "./components/scramble.js";
import "./components/timer.js";

class MainApp extends LitElement {
  static styles = css`
    main {
      display: flex;
      flex-direction: column;
      padding: 2rem;
      font-family: sans-serif;
    }
  `;

  static properties = {
    generatedScramble: { type: String },
  };

  constructor() {
    super();
    this.generatedScramble = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.generateNewScramble();
  }

  render() {
    return html`
      <main>
        <cube-scramble
          .currentScramble="${this.generatedScramble}"
          @click="${this.generateNewScramble}"
        ></cube-scramble>
        <cube-timer></cube-timer>
      </main>
    `;
  }

  async generateNewScramble() {
    this.generatedScramble = "Generating...";
    try {
      const scrambleAlg = await randomScrambleForEvent("333");
      this.generatedScramble = scrambleAlg.toString();
    } catch (error) {
      console.error("Failed generating scramble: ", error);
      this.generatedScramble = "An error occured. Please click again.";
    }
  }
}

customElements.define("cube-app", MainApp);
