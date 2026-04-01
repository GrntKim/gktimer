import { LitElement, html, css } from "lit";
import { randomScrambleForEvent } from "cubing/scramble";
import "./components/scramble.js";
import "./components/timer.js";
import "./components/records.js";

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
    records: { type: Array },
  };

  constructor() {
    super();
    this.generatedScramble = "";
    this.records = [];
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

        <cube-timer @timer-stopped="${this.saveRecord}"></cube-timer>

        <record-list .records="${this.records}"></record-list>
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

  async saveRecord(e) {
    const newRecord = {
      time: e.detail,
      scramble: this.generatedScramble,
      date: new Date(),
    };
    this.records = [...this.records, newRecord];

    console.log(newRecord.time);
    console.log(newRecord.scramble);
    console.log(newRecord.date);
    await this.generateNewScramble();
  }
}

customElements.define("cube-app", MainApp);
