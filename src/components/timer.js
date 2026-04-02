import { LitElement, html, css } from "lit";

export class CubeTimer extends LitElement {
  static properties = {
    tens: { type: Number },
    seconds: { type: Number },
    lastRecord: { type: Object },
    isScrambling: { type: Boolean },
  };

  constructor() {
    super();
    this.tens = 0;
    this.seconds = 0;
    this.isRunning = false;
    this.isReady = false;
    this.lastRecord = null;
    this.isScrambling = true;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("touchstart", this.handleTouchStart, {
      passive: false,
    });
    window.addEventListener("touchend", this.handleTouchEnd);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("touchstart", this.handleTouchStart);
    window.removeEventListener("touchend", this.handleTouchEnd);
  }

  handleKeyDown = (e) => {
    if (e.code == "Space") {
      if (e.repeat) return;
      if (this.isScrambling && !this.isRunning) return;
      e.preventDefault();

      if (this.isRunning) {
        this.stopTimer();
      } else {
        this.isReady = true;
      }
    }
  };

  handleKeyUp = (e) => {
    if (e.code === "Space" && this.isReady) {
      if (this.isReady) {
        this.isReady = false;
        this.isRunning = true;
        this.dispatchEvent(
          new CustomEvent("timer-running", {
            detail: this.isRunning,
            bubbles: true,
            composed: true,
          }),
        );
        this.startTimer();
      }
    }
  };

  handleTouchStart = (e) => {
    const target = e.composedPath()[0];
    if (e.target.tagName === "BUTTON" || e.target.tagName === "CUBE-SCRAMBLE")
      return;

    if (this.isScrambling && !this.isRunning) return;

    if (e.cancelable) {
      e.preventDefault();
    }

    if (this.isRunning) {
      this.stopTimer();
    } else {
      this.isReady = true;
    }
  };

  handleTouchEnd = (e) => {
    if (this.isReady) {
      this.isReady = false;
      this.isRunning = true;
      this.dispatchEvent(
        new CustomEvent("timer-running", {
          detail: this.isRunning,
          bubbles: true,
          composed: true,
        }),
      );
      this.startTimer();
    }
  };

  startTimer() {
    if (this._intervalId) clearInterval(this._intervalId);

    const startTime = Date.now();
    this._intervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;

      this.seconds = Math.floor(elapsedTime / 1000);
      this.tens = Math.floor((elapsedTime % 1000) / 10);
    }, 10);
  }

  stopTimer() {
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

  resetTime() {
    if (this.isRunning) {
      this.stopTimer();
    }

    this.tens = this.seconds = 0;
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

  static styles = css`
    .timer-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `;
}

customElements.define("cube-timer", CubeTimer);
