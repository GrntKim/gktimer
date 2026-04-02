import { LitElement, html, css } from "lit";

class SiteHeader extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <header>
        <div class="site-logo">GKTimer BETA</div>
        <nav class="header-links">
          <ul>
            <li>About</li>
            <li>Cube</li>
          </ul>
        </nav>
      </header>
    `;
  }

  static styles = css`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8em 1.5em;
    }

    header .site-logo {
      font-size: 24px;
      font-weight: 900;
    }

    header .header-links ul {
      display: flex;
      list-style-type: none;
      gap: 1.5em;
    }

    header li:hover {
      color: royalblue;
    }
  `;
}

customElements.define("site-header", SiteHeader);
