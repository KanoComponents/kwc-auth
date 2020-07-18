import { html, customElement } from 'lit-element/lit-element.js';

import '@kano/styles/typography.js';
import { _ } from '@kano/i18n/dist/index.js';

import { SingleInputElement } from './auth-single-form.js';

@customElement('kwc-auth-forgot-password')
export class ForgotPassword extends SingleInputElement {
    constructor() {
        super();
        this.id = 'forgot-password';
        this.next = 'login';
    }
    inputTemplate() {
        return html`
            <p class="intro">${_('FORGOT_PASSWORD_TITLE', 'Forgot your password?')}</p>
            <h3 class="instruction">${_('FORGOT_PASSWORD_NO_PROBLEM', 'No problem! We’ll send a reset link to your parent or guardian’s email address (the one you used when you signed up). Just enter your username below.')}</h3>
            <div class="input-wrapper">
                <p class="input-title">${_('ENTER_USERNAME', 'Enter your username')}</p>
                <input
                    ?disabled=${this.disabled}
                    @blur="${() => this.validateInput(this.id, this.value)}"
                    @keydown="${(e: KeyboardEvent) => this.handleKeydown(e)}"
                    id="input"
                    class="input"
                    type="text"
                    placeholder=${_('USERNAME', 'Username')} />
            </div>
        `;
    }
    getLoginPromptMessage() {
        return _('AUTH_REMEMBERED_PASSWORD', 'Remembered your password?')
    }
}
