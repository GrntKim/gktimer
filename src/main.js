import { LitElement, html, css } from "lit";
import { randomScrambleForEvent } from "cubing/scramble";
import "./components/layouts/footer.js";
import "./components/scramble.js";
import "./components/timer.js";
import "./components/records.js";

class MainApp extends LitElement {
  static properties = {
    generatedScramble: { type: String },
    records: { type: Array },
    isScrambling: { type: Boolean },
    isTimerRunning: { type: Boolean },
  };

  constructor() {
    super();
    this.generatedScramble = "";
    this.records = [];
    this.isScrambling = true;
  }

  connectedCallback() {
    super.connectedCallback();
    this.generateNewScramble();
  }

  async generateNewScramble() {
    if (this.isTimerRunning) return;
    this.isScrambling = true;
    this.generatedScramble = "Generating...";
    try {
      const scrambleAlg = await randomScrambleForEvent("333");
      this.isScrambling = false;
      this.generatedScramble = scrambleAlg.toString();
    } catch (error) {
      console.error("Failed generating scramble: ", error);
      this.generatedScramble = "An error occured. Please click again.";
    } finally {
      this.isScrambling = false;
    }
  }

  async saveRecord(e) {
    const newRecord = {
      time: e.detail,
      scramble: this.generatedScramble,
      date: new Date(),
    };
    this.records = [...this.records, newRecord];
    this.isTimerRunning = false;
    await this.generateNewScramble();
  }

  render() {
    return html`
      <main>
        <cube-scramble
          .currentScramble="${this.generatedScramble}"
          @click="${this.generateNewScramble}"
        ></cube-scramble>

        <cube-timer
          @timer-stopped="${this.saveRecord}"
          @timer-running="${(e) => (this.isTimerRunning = e.detail)}"
          .isScrambling="${this.isScrambling}"
        ></cube-timer>

        <record-list .records="${this.records}"></record-list>
      </main>
      <site-footer></site-footer>
    `;
  }

  static styles = css`
    main {
      display: flex;
      flex-direction: column;
      padding: 2rem;
      font-family: sans-serif;
    }
  `;
}

customElements.define("cube-app", MainApp);
