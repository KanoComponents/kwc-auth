import { LitElement, html } from 'lit-element';
import './components/kwc-auth-landing.js';
import './components/kwc-auth-kidsignup.js';
import './components/kwc-auth-kidparentsemail.js';
import './components/kwc-auth-emailconfirmation.js';
import './components/kwc-auth-emailvarificationmodel.js'

class Index extends LitElement {

    render() {
      return html`
        <kwc-auth-landing></kwc-auth-landing>
        <hr>
        <kwc-auth-kidsignup></kwc-auth-kidsignup>
        <hr>
        <kwc-auth-kidparentsemail></kwc-auth-kidparentsemail>
        <hr>
        <kwc-auth-emailconfirmation></kwc-auth-emailconfirmation>
        <hr>
        <kwc-auth-emailvarificationmodel></kwc-auth-emailvarificationmodel>
      `;
    }
  }

  customElements.define('kwc-auth', Index);
