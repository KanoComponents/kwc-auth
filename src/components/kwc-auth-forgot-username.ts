import { html, customElement, property } from 'lit-element/lit-element.js';

import '@kano/styles/typography.js';
import { _ } from '@kano/i18n/dist/index.js';

import { SingleInputElement } from './auth-single-form.js';

@customElement('kwc-auth-forgot-username')
export class ForgotUsernameInput extends SingleInputElement {
    @property({ type: String }) error = '';
    constructor() {
        super();
        this.id = 'forgot-username';
        this.next = 'login';
    }
    inputTemplate() {
        super.inputTemplate();
        return html`
            <p class="intro">${_('FORGOT_USERNAME_TITLE', 'Forgot your username?')}</p>
            <h3 class="instruction">${_('FORGOT_USERNAME_HEADER', 'It’s cool. Just enter your parent or guardian’s email address (the one you used when you signed up), we will email your username to them.')}</h3>
            <div class="input-wrapper">
                <p class="input-title">${_('AUTH_ENTER_GUARDIAN_EMAIL', 'Please enter your parent or guardian’s email')}</p>
                <input
                    ?disabled=${this.disabled}
                    @blur="${() => this.validateInput(this.id, this.value)}"
                    @keydown="${(e: KeyboardEvent) => this.handleKeydown(e)}"
                    id="input"
                    class="input"
                    type="email"
                    placeholder=${_('EXAMPLE_EMAIL', 'name@email.com')} />
            </div>
        `;
    }
    getLoginPromptMessage() {
        return _('AUTH_REMEMBERED_USERNAME', 'Remembered your username?')
    }
}