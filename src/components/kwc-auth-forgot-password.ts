import '@kano/styles/typography.js';
import { html, customElement } from 'lit-element/lit-element.js';
import { SingleInputElement } from './auth-single-form.js'

@customElement('kwc-auth-forgot-password')
export class ForgotPassword extends SingleInputElement {
    constructor() {
        super();
        this.id = 'forgotPassword';
        this.next = 'login'
    }
    inputTemplate() {
        return html`
            <h2>Forgot your password, no problem.</h2>
            <div class="input-wrapper">
                <label for="input">Please enter your parent's or guardian's new email.</label>
                <input
                    @blur="${() => this.validateInput(this.id, this.value)}"
                    @keydown="${(e: KeyboardEvent) => this.handleKeydown(e)}"
                    id="input"
                    class="input"
                    type="text"
                    placeholder="Username"/>
                <div class="error">${this.errors[this.id]}</div>
            </div>
        `;
    }
}
