import '@kano/styles/typography.js';
import button from '@kano/styles/button.js';
import { LitElement, html, customElement, property } from 'lit-element';
import { styles } from '../styles.js';


@customElement('kwc-auth-homescreen')
export class HomeScreen extends LitElement {
    static get styles() {
        return [styles];
      } 
    @property ( { type: String } ) view = '';

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
        <div class="auth-section">
            <div class="title-wrapper">
                <h4>Hello [Username]!</h4>
            </div>
        </div>  
    `;
    }
}
