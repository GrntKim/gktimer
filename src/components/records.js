import { LitElement, html, css } from "lit";

class recordList extends LitElement {
  static styles = css`
    ul {
      list-style-type: none;
    }
  `;

  static properties = {
    records: { type: Array },
  };

  constructor() {
    super();
  }

  render() {
    if (!this.records || this.records.length === 0) {
      return html`<p>No records yet...</p>`;
    }
    return html`
      <div class="records-container">
        <ul>
          ${this.records.map(
            (record, index) => html`
              <li>
                ${index + 1}.
                ${String(record.time.seconds).padStart(2, "0")}.${String(
                  record.time.tens,
                ).padStart(2, "0")}
                <span class="record-scramble">${record.scramble}</span>
              </li>
            `,
          )}
        </ul>
      </div>
    `;
  }
}

customElements.define("record-list", recordList);
