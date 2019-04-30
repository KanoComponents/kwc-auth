import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, html, property, query } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';
import { validateUsername, validatePassword, validateEmail } from '../utils/validation.js';

interface SubmitDetails {
    detail: EventDetail;
}

interface EventDetail {
    next: string;
    payload: EventPayload;
}

interface EventPayload {
    [key: string]: string;
}
interface Errors {
    [key: string]: string;
}


export class SingleInputElement extends LitElement {
    static get styles() {
            return [styles];
        } 
    @property({ type: Object }) errors : Errors = {};
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
                    placeholder="Input information here"/>
                <div class="error">${this.errors[this.id]}</div>
            </div>
        `;
    }

    render() {        
        return html`
        ${templateContent(button)}
        <div class="form-template">
            <div>
                ${this.inputTemplate()}
                <div class="button-wrapper">
                    <button
                    id="submit"
                    @mousedown=${(e: Event) => this.handleClick(e)}
                    @keydown=${(e: KeyboardEvent) => this.handleKeydown(e)}
                    class="btn l">Continue</button>
                </div>
            </div>
            <div class="link-wrapper">
                <p>Already have an account? <a href="/login">Login</a></p> 
            </div>
        </div>
    `;
    }
    handleKeydown(e: KeyboardEvent) {
        if (e.type === 'keydown' && e.keyCode === 13) {
            this.handleClick(e as Event);
        }
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
  
    /**
     * Updates the error message for a field
     * @param field Which error field to update
     * @param message Error message displayed next to the field
     */
    updateError(field : string, message : string) {
        this.errors[field] = message;
        this.requestUpdate();
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
            default:
                break;
        }
        
        this.updateError(inputId, error || '');
        return !error;
    }
}