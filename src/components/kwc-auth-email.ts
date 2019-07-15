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
            <h3>${_('AUTH_WHAT_EMAIL', 'What’s your parent’s email address?')}</h2>
            <h4>${_('AUTH_GIVE_VALID_EMAIL', 'All Kano accounts need a valid parent email address to share and view creations on Kano World.')}</h4>
            <div class="input-wrapper">
                <input
                    ?disabled=${this.disabled}
                    @blur="${() => this.validateInput(this.id, this.value)}"
                    @keydown="${(e: KeyboardEvent) => this.handleKeydown(e)}"
                    id="input"
                    class="input"
                    type="email"
                    placeholder=${_('AUTH_PARENT_EMAIL', 'Parent\'s email address')} />
            </div>
            <div class="error">${this.error}</div>
        `;
    }
}
