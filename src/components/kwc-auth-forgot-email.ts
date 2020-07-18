import { html, customElement } from 'lit-element/lit-element.js';

import '@kano/styles/typography.js';
import { _ } from '@kano/i18n/dist/index.js';

import { SingleInputElement } from './auth-single-form.js';

@customElement('kwc-auth-forgot-email')
export class ChangeEmail extends SingleInputElement {
    constructor() {
        super();
        this.id = 'forgot-email';
        this.next = 'login'
    }
    inputTemplate() {
        return html`
            <p class="intro">${_('FORGOT_EMAIL_UPDATE', 'Update email')}</p>
            <h3 class="instruction">${_('NEED_TO_CHANGE_EMAIL', 'Need to change the email associated with your account?')}</h3>
            <div class="input-wrapper">
                <p class="input-title">${_('AUTH_ENTER_GUARDIAN_EMAIL', 'Please enter your parent or guardian’s email')}</p>
                <input
                    @blur="${() => this.validateInput(this.id, this.value)}"
                    @keydown="${(e: KeyboardEvent) => this.handleKeydown(e)}"
                    id="input"
                    class="input"
                    type="email"
                    placeholder=${_('EXAMPLE_EMAIL', 'name@email.com')} />
            </div>
        `;
    }
}
