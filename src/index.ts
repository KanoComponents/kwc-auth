
import { LitElement, css, html } from 'lit-element';
import './components/kwc-auth-landing.js';
import './components/kwc-auth-kidsignup.js';
// import './components/kwc-auth-kidparentsemail.js';

class Index extends LitElement {
  static get styles(){
    return css`
    :host {
        font-family: var(--font-body);
        /* --red-color: red; */
      }
    kwc-auth-kidsignup,
    kwc-auth-landing {
      width: 100%;
      display: flex;
      flex-flow: column;
      align-items: center;
      border: 1px solid grey;
      border-radius: 10px;
    }
    `
}
    render() {
      return html`
        <kwc-auth-landing></kwc-auth-landing>
        <hr>
        <kwc-auth-kidsignup></kwc-auth-kidsignup>
        <hr>
        <!-- <kwc-auth-kidparentsemail></kwc-auth-kidparentsemail> -->
      `;
    }
  }

  customElements.define('kwc-auth', Index);
