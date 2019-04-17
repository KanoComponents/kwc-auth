/**
`<kwc-auth>` Front end for Kano's authentication flow.

Add this component somewhere in your html body and set some EventListeners
to interact with its many useful events.

```html
<kwc-auth></kwc-auth>
```

@demo demo/index.html
*/

import { LitElement, html, property, customElement, css } from 'lit-element/lit-element.js';

import './components/kwc-auth-landing.js';
import './components/kwc-auth-createusername.js';
import './components/kwc-auth-createpassword.js';
import './components/kwc-auth-kidparentsemail.js';
import './components/kwc-auth-emailconfirmation.js';
import './components/kwc-auth-login.js';
import { styles } from './styles.js';


@customElement('kwc-auth')
export class KwcAuth extends LitElement {

    @property({ type: String }) view = '';
    @property({ type: String }) logo = 'kano';
    @property({ type: String }) backgroundGliph = 'shapesGliph';
    @property({ type: String }) loginBackgroundGliph = 'orangeGliph';

    static get styles() {
        return [
            styles,
            css`
                kwc-auth-login {
                    background-color: white;
                    border-radius: 6px;
                    width: 100%;
                    max-width: 350px;
                    margin: 0 auto;
                }
                kwc-auth-createpassword,
                kwc-auth-createusername,
                kwc-auth-emailconfirmation,
                kwc-auth-kidparentsemail {
                    width: 100%;
                    max-width: 600px;
                }
            `,
        ];
    }
    // Return template of the current form
    formTemplate(view: string) {                        
        switch (view) {
            case 'username':            
                return html`
                    <kwc-auth-createusername
                        @submit=${this.handleSubmit}
                    ></kwc-auth-createusername>
            `; 
            case 'password':            
                return html`
                    <kwc-auth-createpassword></kwc-auth-createpassword>
            `; 
            case 'email':
                return html`
                    <kwc-auth-kidparentsemail></kwc-auth-kidparentsemail>                                              
            `; 
            case 'success':
                return html`
                    <kwc-auth-emailconfirmation></kwc-auth-emailconfirmation>                                                              
                    `; 
            default:
                return html`
                    <kwc-auth-login .logo=${this.logo} .loginBackgroundGliph=${this.loginBackgroundGliph}></kwc-auth-login>
                `;
        }
    }

    render() {
        return this.formTemplate(this.view);
    }

    handleSubmit(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('changeView', {
            detail: {
                nextView: e.detail.next,
            }
        }));
    }
}