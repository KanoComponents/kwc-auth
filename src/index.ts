
import { LitElement, html } from 'lit-element';
import './components/kwc-auth-landing.js';
import './components/kwc-auth-kidssignup.js';

class Index extends LitElement {
    render() {
      return html`
        <kwc-auth-landing></kwc-auth-landing>
        <kwc-auth-kidssignup></kwc-auth-kidssignup>
      `;
    }
  }

  customElements.define('my-page', Index);
