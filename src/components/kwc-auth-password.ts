import '@kano/styles/typography.js';
import { html, customElement, query, property } from 'lit-element/lit-element.js';
import { SingleInputElement } from './auth-single-form.js';
import { _ } from '@kano/i18n/dist/index.js';

@customElement('kwc-auth-password')
export class PasswordInput extends SingleInputElement {
    constructor() {
        super();
        this.id = 'password';
        this.next = 'email'
    }

    @query('#eyeimage')
    private imageInput? : HTMLInputElement;

    @property({ type: String }) username = '';

     /**
    * Returns the current value of the eye image field or an empty string
    */

    get eyeimage() {
        return this.imageInput ? this.imageInput.value : '';
    }
    inputTemplate() {
        return html`
            <h3>${_('WELCOME_TO_KANO', 'Welcome to Kano')} ${this.username}!</h3>
            <h4>${_('SETUP_YOUR_PASSWORD', 'Setup a password for your account to make it secure. Your password must be at least 8 characters')}</h4>
            <div class="input-wrapper">
                <div class="input-wrapper">
                    <input
                        @blur="${() => this.validateInput(this.id, this.value)}"
                        @keydown="${(e: KeyboardEvent) => this.handleKeydown(e)}"
                        type="password"
                        id="input"
                        placeholder=${_('MAKE_UP_PASSWORD', 'Make up a secret password')} />
                    <img
                        src="https://imgplaceholder.com/42x32/transparent/757575/fa-eye-slash"
                        class="eye-toggle"
                        id="eyeimage"
                        @click="${this.togglePassword}"/>
                    </div>
            </div>
            <div class="error">${this.error}</div>
        `;
    }

    togglePassword() {
        if (!this.inputElement || !this.imageInput ){
            return;
        }

        // replace with local assets
        const img1 = "https://imgplaceholder.com/42x32/transparent/757575/fa-eye";
        const img2 = "https://imgplaceholder.com/42x32/transparent/757575/fa-eye-slash";
        if (this.inputElement.type == 'password') {
            this.inputElement.type = 'text';
            this.imageInput.src = img1;
        } else {
            this.inputElement.type = 'password';
            this.imageInput.src = img2;
        }
    }
}
