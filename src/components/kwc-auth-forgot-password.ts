import '@kano/styles/typography.js';
import { html, customElement, css } from 'lit-element/lit-element.js';
import { SingleInputElement } from './auth-single-form.js';
import { _ } from '@kano/i18n/dist/index.js';

@customElement('kwc-auth-forgot-password')
export class ForgotPassword extends SingleInputElement {
    constructor() {
        super();
        this.id = 'forgot-password';
        this.next = 'login';
    }
    static get styles() {
        return super.styles.concat([css`
            .error {
                left: 0;
                top: 100%;
                padding: 8px;
            }
        `]);
    }
    inputTemplate() {
        return html`
            <h2>${_('FORGOT_PASSWORD_NO_PROBLEM', 'Forgot your password, no problem.')}</h2>
            <div class="input-wrapper">
                <label for="input">${_('PLEASE_ENTER_USERNAME', 'Please enter your username.')}</label>
                <input
                    ?disabled=${this.disabled}
                    @blur="${() => this.validateInput(this.id, this.value)}"
                    @keydown="${(e: KeyboardEvent) => this.handleKeydown(e)}"
                    id="input"
                    class="input"
                    type="text"
                    placeholder=${_('USERNAME', 'Username')} />
                <div class="error">${this.error}</div>
            </div>
        `;
    }
    getLoginPromptMessage() {
        return _('AUTH_REMEMBERED_PASSWORD', 'Remembered your password?')
    }
}
