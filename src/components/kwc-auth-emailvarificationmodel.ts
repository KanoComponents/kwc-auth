import '@kano/styles/typography.js';
import button from '@kano/styles/button.js';
import { LitElement, html, customElement, property } from 'lit-element';
import { styles } from '../styles.js';


@customElement('kwc-auth-emailvarificationmodel')
export class EmailVarificationModel extends LitElement {
    static get styles() {
        return [styles];
      } 
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
        <div class="auth-section">
            <div class="title-wrapper">
                <h4>Hello, Appleseed!</h4>
                <p>This account needs to be verified by an adult. We sent an email with instructions to t***@g***.com</p>
                <h2 class="warning-message">7days until we deactivate your account</h2>
            </div>
            <div class="button-wrapper">
                <button class="btn l" type="submit">Resend email</button>
                <button class="btn l" type="submit">Use different email</button>
            </div>
            <div class="link-wrapper">
                <a href="">Sign out</a>
                <a href="">Verify it later</a>
            </div> 
        </div>  
    `;
    }
}
