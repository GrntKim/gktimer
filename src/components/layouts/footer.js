import { LitElement, html, css } from "lit";

class SiteFooter extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <footer>
        <p>&copy; ${new Date().getFullYear()} JMK</p>
      </footer>
    `;
  }

  static styles = css`
    footer {
      padding: 1.2rem;
      justify-contents: center;
      align-items: center;
      text-align: center;
    }
  `;
}

customElements.define("site-footer", SiteFooter);
