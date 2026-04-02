import { LitElement, html, css } from "lit";
import { randomScrambleForEvent } from "cubing/scramble";
import { setSearchDebug } from "cubing/search";
import "./components/layouts/footer.js";
import "./components/layouts/header.js";
import "./components/scramble.js";
import "./components/timer.js";
import "./components/records.js";

// 콘솔에 뜨는 cubing.js 렌더링 성능 경고 로그를 끕니다.
setSearchDebug({
  logPerf: false,
});

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
      <div class="app-body">
        <site-header></site-header>

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
      </div>
    `;
  }

  static styles = css`
    .app-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 100vh;
      margin: 0;
    }

    main {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2rem;
      font-family: sans-serif;
    }
  `;
}

customElements.define("cube-app", MainApp);
