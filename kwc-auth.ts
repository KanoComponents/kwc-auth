/**
`<kwc-auth>` Front end for Kano's authentication flow.

Add this component somewhere in your html body and set some EventListeners
to interact with its many useful events.

```html
<kwc-auth></kwc-auth>
```

@demo demo/index.html
*/
import '@kano/styles/typography.js';
import button from '@kano/styles/button.js';
import { LitElement, html, customElement } from 'lit-element';
// import button from '@kano/styles/button.js';

@customElement('kwc-auth')
export class KwcAuth extends LitElement {
    public view: string;

    constructor() {
        super();
        this.view = 'form1';
    }
    static get properties() {
        return {
            view: {
                type: String,
            },
        };
    }

    // Return template of the current form
    formTemplate(formId: string) {
        switch (formId) {
        case 'form1':
            return html`
            ${button}
                <div class="form-container">
                    <h1>Start</h1>
                    <form @submit="${this._submit}" id="form1" next="view2">
                        <input type="text">
                        <input type="text">
                        <input type="text">
                        <input type="text">
                        <input type="text">
                        <input type="submit">
                    </form>
            </div>
            `;
        case 'view2':
            return html`
                <h1>OTHER</h1>
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
