/**
`<kwc-auth>` Front end for Kano's authentication flow.

Add this component somewhere in your html body and set some EventListeners
to interact with its many useful events.

```html
<kwc-auth></kwc-auth>
```

@demo demo/index.html
*/

import { LitElement, html, property, customElement } from 'lit-element/lit-element.js';

import './components/kwc-auth-landing.js';
import './components/kwc-auth-createusername.js';
import './components/kwc-auth-createpassword.js';
import './components/kwc-auth-kidparentsemail.js';
import './components/kwc-auth-emailconfirmation.js';
import './components/kwc-auth-login.js';


@customElement('kwc-auth')
export class KwcAuth extends LitElement {
    @property ( { type: String } ) view = '';

    constructor() {
        super();
    }
    static get properties() {
        return {
            view: {
                type: String,
            },
        };
    }
    // Return template of the current form
    formTemplate(view: string) {                        
        switch (view) {
            case 'landing':
                return html`
                    <div class="kwc-auth">
                        <h3>Registation Landing Page</h3>
                        <kwc-auth-landing></kwc-auth-landing>
                    </div>
                    <hr>
            `;
            case 'createusername':            
            return html`
                    <div class="kwc-auth">
                        <h3>Registation Create Username</h3>
                        <kwc-auth-createusername></kwc-auth-createusername>
                    </div>
                    <hr>
            `; 
            case 'createpassword':            
            return html`
                    <div class="kwc-auth">
                        <h3>Registation Create Password</h3>
                        <kwc-auth-createpassword></kwc-auth-createpassword>                        
                    </div>
                    <hr>
            `; 
            case 'kidparentsemail':
                return html`
                    <div class="kwc-auth">
                        <h3>Registation Create Parent email</h3>
                        <kwc-auth-kidparentsemail></kwc-auth-kidparentsemail>                                              
                    </div>
                    <hr>
            `; 
            case 'login':
                return html`
                    <div class="kwc-auth">
                        <h3>Registation login</h3>
                        <kwc-auth-login></kwc-auth-login>                                                              
                    </div>
                    <hr>
            `; 
            case 'emailconfirmation':
            return html`
                    <div class="kwc-auth">
                        <h3>Registation confirmation</h3>
                        <kwc-auth-emailconfirmation></kwc-auth-emailconfirmation>                                                              
                    </div>
                    <hr>
            `; 
            default:
                return html`
                <h1>DEFAULT</h1>
            `;
        }
    }

    render() {
        return html`      
        <div>
            ${this.formTemplate(this.view)}
        </div>
        `;
    }
}