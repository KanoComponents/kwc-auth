import { LitElement, html, property, query } from 'lit-element/lit-element.js';

import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { _ } from '@kano/i18n/dist/index.js';

import { validateUsername, validatePassword, validateEmail, validateRegion, validateForgotPassword } from '../utils/validation.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';
import * as icons from '../icons.js';

export interface SubmitDetails {
    detail: EventDetail;
}

interface EventDetail {
    next: string;
    payload: EventPayload;
}

interface EventPayload {
    [key: string]: string;
}

export class SingleInputElement extends LitElement {
    static get styles() {
        return [styles];
    } 
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) allowExit = false;
    @property({ type: Boolean }) hideLogin = false;
    @property({ type: String }) error = '';
    @property({ type: String }) id = 'username';
    @property({ type: String }) next = 'password';

    @query('#input')
    public inputElement? : HTMLInputElement;
   
    /**
     * Returns the current value of the username field or an empty string
     */
    get value() {
        return this.inputElement ? this.inputElement.value : '';
    }

    inputTemplate() {
        // replace with your specific template
        return html`
            <div class="input-wrapper">
                <input
                    @blur="${() => this.validateInput(this.id, this.value)}"
                    @keydown="${(e: KeyboardEvent) => this.handleKeydown(e)}"
                    type="text"
                    id="input"
                    placeholder=${_('INPUT_INFORMATION_HERE', 'Input information here')} />
                <div class="error">${this.error}</div>
            </div>
        `;
    }

    render() {
        return html`
        ${templateContent(button)}
        <div class="form-template">
            <div class="form-wrapper">
                ${this.inputTemplate()}
                <div class="button-wrapper">
                    <button
                    ?disabled=${this.disabled}
                    id="submit"
                    @mousedown=${(e: Event) => this.handleClick(e)}
                    @keydown=${(e: KeyboardEvent) => this.handleKeydown(e)}
                    class="btn l">${_('AUTH_CONTINUE', 'Continue')}</button>
                    ${this.allowExit ? html`<a class="button-wrapper__exit" href @click=${this.exit}>${_('MAYBE_LATER', 'Maybe later')}` : ''}
                    <div class="error">${this.error}</div>
                </div>
            </div>
            <div class="link-wrapper">
                <div class="link-wrapper__info">
                    <img src=${icons.kano} class="kano-logo" />
                    <a href="https://world.kano.me/privacy-policy" class="privacy" target="_blank">${_('PRIVACY_POLICY', 'Privacy Policy')}</a>
                </div>
                <p ?hidden=${this.hideLogin}>${this.getLoginPromptMessage()} <a href="#" @click=${this.handleLoginClick}>${_('AUTH_LOGIN', 'Login')}</a></p>
            </div>
        </div>
    `;
    }
    getLoginPromptMessage() {
        return _('AUTH_ALREADY_HAVE_AN_ACCOUNT', 'Already have an account?')
    }
    handleKeydown(e: KeyboardEvent) {
        if (e.type === 'keydown' && e.keyCode === 13) {
            this.handleClick(e as Event);
        }
        this.error = '';
    }
    handleLoginClick(e : Event) {
        e.preventDefault();
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent('login-requested', { composed: true, bubbles: true }));
    }
    handleClick(e: Event) {
        e.preventDefault();
        if (!this.validateInput(this.id, this.value)) {
            return;
        }
        const event: SubmitDetails = {
            detail: {
                next: this.next,
                payload: {
                    // fill with your info;
                },
            },
        };

        event.detail.payload[this.id] = this.value;
        this.dispatchEvent(new CustomEvent('submit', event));
    }

    exit(e: Event) {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent('exit'));
    }

    validateInput(inputId: string, value: string) {
        let error;
        switch(inputId) {
            case 'username':
                error = validateUsername(value);
                break;
            case 'password':
                error = validatePassword(value);
                break;
            case 'email':
                error = validateEmail(value);
                break;
            case 'forgot-username':
                error = validateEmail(value);
                break;
            case 'forgot-password':
                error = validateForgotPassword(value);
                break;
            case 'region':
                error = validateRegion(value);
                break;
            default:
                break;
        }
        
        this.error = error || '';
        return !error;
    }
}