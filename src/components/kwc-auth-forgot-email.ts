import '@kano/styles/typography.js';
import { html, customElement } from 'lit-element/lit-element.js';
import { SingleInputElement } from './auth-single-form.js';
import { _ } from '@kano/i18n/dist/index.js';

@customElement('kwc-auth-forgot-email')
export class ChangeEmail extends SingleInputElement {
    constructor() {
        super();
        this.id = 'forgot-email';
        this.next = 'login'
    }
    inputTemplate() {
        return html`
            <h2>${_('NEED_TO_CHANGE_EMAIL', 'Need to change the email associated with your account?')}</h2>
            <div class="input-wrapper">
                <label for="input">${_('AUTH_ENTER_GUARDIAN_EMAIL', 'Please enter your parent\'s or guardian\'s email.')}</label>
                <input
                    @blur="${() => this.validateInput(this.id, this.value)}"
                    @keydown="${(e: KeyboardEvent) => this.handleKeydown(e)}"
                    id="input"
                    class="input"
                    type="email"
                    placeholder=${_('AUTH_EMAIL', 'Email')} />
            </div>
        `;
    }
}
