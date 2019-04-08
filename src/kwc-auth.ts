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
import './components/kwc-auth-kidsignup.js';
import './components/kwc-auth-kidparentsemail.js';
import './components/kwc-auth-emailconfirmation.js';
import './components/kwc-auth-emailvarificationmodel.js';
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
            case 'kidsignup':
                return html`
                    <kwc-auth-kidsignup></kwc-auth-kidsignup>
            `;
            case 'landing':
                return html`
                    <kwc-auth-landing></kwc-auth-landing>
            `;
            case 'kidparentsemail':
                return html`
                    <kwc-auth-kidparentsemail></kwc-auth-kidparentsemail>
            `; 
            case 'login':
                return html`
                    <kwc-auth-login></kwc-auth-login>  
            `; 
            case 'emailvarificationmodel':
            return html`
                    <kwc-auth-emailvarificationmodel></kwc-auth-emailvarificationmodel>  
            `; 
            case 'emailconfirmation':
            return html`
                    <kwc-auth-emailconfirmation></kwc-auth-emailconfirmation>  
            `; 
            default:
                return html`
                <h1>DEFAULT</h1>
            `;
        }
    }
    _submit(e: Event) {
        e.preventDefault();
        // TODO: Handle submit
    }
    render() {
        return html`      
        <div>
            ${this.formTemplate(this.view)}
        </div>
        `;
    }
}