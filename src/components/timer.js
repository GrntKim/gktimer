import { LitElement, html, css } from "lit";

export class CubeTimer extends LitElement {
  static styles = css`
    .timer-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `;

  static properties = {
    tens: { type: Number },
    seconds: { type: Number },
    lastRecord: { type: Object },
  };

  constructor() {
    super();
    this.tens = 0;
    this.seconds = 0;
    this.isRunning = false;
    this.isReady = false;
    this.lastRecord = null;
  }

  render() {
    const s = String(this.seconds).padStart(2, "0");
    const t = String(this.tens).padStart(2, "0");
    return html`
      <div class="timer-container">
        <p id="actual-timer"><span>${s}</span>:<span>${t}</span></p>
        <button id="reset-button" @click="${this.resetTime}">Reset</button>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  handleKeyDown = (e) => {
    if (e.code == "Space") {
      e.preventDefault();

      if (!this.isRunning) {
        this.isReady = true;
      } else {
        this.stopTimer();
      }
    }
  };

  handleKeyUp = (e) => {
    if (e.code === "Space" && this.isReady) {
      if (this.isReady) {
        this.isReady = false;
        this.isRunning = true;
        this.startTimer();
      }
    }
  };

  async startTimer() {
    if (this._intervalId) clearInterval(this._intervalId);

    const startTime = Date.now();
    this._intervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;

      this.seconds = Math.floor(elapsedTime / 1000);
      this.tens = Math.floor((elapsedTime % 1000) / 10);
    }, 10);
  }

  async stopTimer() {
    clearInterval(this._intervalId);
    this.isRunning = false;

    this.lastRecord = {
      seconds: this.seconds,
      tens: this.tens,
    };

    this.dispatchEvent(
      new CustomEvent("timer-stopped", {
        detail: this.lastRecord,
        bubbles: true,
        composed: true,
      }),
    );
  }

  async resetTime() {
    if (this.isRunning) {
      this.stopTimer();
    }

    this.tens = this.seconds = 0;
  }
}

customElements.define("cube-timer", CubeTimer);
