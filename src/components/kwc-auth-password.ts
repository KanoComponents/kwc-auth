import '@kano/styles/typography.js';
import { html, customElement, property } from 'lit-element/lit-element.js';
import { SingleInputElement } from './auth-single-form.js';
import { _ } from '@kano/i18n/dist/index.js';
import * as icons from '../icons.js';

@customElement('kwc-auth-password')
export class PasswordInput extends SingleInputElement {
    constructor() {
        super();
        this.id = 'password';
        this.next = 'email'
    }
    @property({ type: Boolean }) showPassword = false;

    @property({ type: String }) username = '';

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
                        src=${icons.eye} class="eye-toggle" id="eyeimage" style="opacity: ${this.showPassword ? '1' : '0.5'}"
                        @click="${this.togglePassword}"/>
                    </div>
            </div>
            <div class="error">${this.error}</div>
        `;
    }

    togglePassword() {
        this.showPassword = !this.showPassword;
    }
}
