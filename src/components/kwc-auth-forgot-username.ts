import '@kano/styles/typography.js';
import { html, customElement, property, css } from 'lit-element/lit-element.js';
import { SingleInputElement } from './auth-single-form.js';
import { _ } from '@kano/i18n/dist/index.js';

@customElement('kwc-auth-forgot-username')
export class ForgotUsernameInput extends SingleInputElement {
    @property({type: String}) error = '';
    constructor() {
        super();
        this.id = 'forgot-username';
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
        super.inputTemplate()
        return html`
            <h3>${_('FORGOT_USERNAME_HEADER', 'Forgot your username? It’s cool. Just enter your parent or guardian’s email address (the one you used when you signed up), we will email your username to them.')}</h3>
            <div class="input-wrapper">
                <label for="input">${_('AUTH_ENTER_GUARDIAN_EMAIL', 'Please enter your parent or guardian’s email')}</label>
                <input
                    ?disabled=${this.disabled}
                    @blur="${() => this.validateInput(this.id, this.value)}"
                    @keydown="${(e: KeyboardEvent) => this.handleKeydown(e)}"
                    id="input"
                    class="input"
                    type="email"
                    placeholder=${_('AUTH_EMAIL', 'Email')} />
                <div class="error">${this.error}</div>
            </div>
        `;
    }
    getLoginPromptMessage() {
        return _('AUTH_REMEMBERED_USERNAME', 'Remembered your username?')
    }
}