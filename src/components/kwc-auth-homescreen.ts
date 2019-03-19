import '@kano/styles/typography.js';
import button from '@kano/styles/button.js';
import { LitElement, html, customElement, property } from 'lit-element';

@customElement('kwc-auth-homescreen')
export class HomeScreen extends LitElement {
    @property ( { type: String } ) view = '';
    // public view : string;

    constructor() {
        super();
        this.view = '';
    }

    _submit(e: Event) {
        e.preventDefault();
    }

    render() {
        return html`
        ${button}
        <link rel="stylesheet" href="./static/styles.css">
        <div class="auth-section">
            <div class="title-wrapper">
                <h4>Hello [Username]!</h4>
            </div>
        </div>  
    `;
    }
}
