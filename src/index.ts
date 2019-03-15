
import { LitElement, html } from 'lit-element';
import './kwc-auth.js';
import './components/kwc-auth-landing.js';

class Index extends LitElement {
    render() {
      return html`
        <kwc-auth></kwc-auth>
        <kwc-auth-landing></kwc-auth-landing>
      `;
    }
  }

  customElements.define('my-page', Index);
