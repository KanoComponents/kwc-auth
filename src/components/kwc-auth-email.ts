import '@kano/styles/typography.js';
import { html, customElement } from 'lit-element/lit-element.js';
import { SingleInputElement } from './auth-single-form.js';
import { _ } from '@kano/i18n/dist/index.js';

@customElement('kwc-auth-email')
export class EmailInput extends SingleInputElement {
    constructor() {
        super();
        this.id = 'email';
        this.next = 'success';
    }
    inputTemplate() {
        return html`
            <h2>${_('AUTH_GIVE_VALID_EMAIL', 'Give us a valid email! (Social features will be turned off until the email is verified)')}</h2>
            <div class="input-wrapper">
                <label for="input">${_('AUTH_ENTER_GUARDIAN_EMAIL', 'Please enter your parent\'s or guardian\'s email.')}</label>
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
}
