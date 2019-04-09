import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, html, customElement, property, query } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';
import { validateEmail } from '../utils/validation.js';

@customElement('kwc-auth-kidparentsemail')
export class KidParentsEmail extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                #kid-parents-email {
                    max-width: 425px;
                }
            `
        ];
    } 
    @property ( { type: String } ) errors = ({ email: '' });

    @query('#email')
    private emailInput? : HTMLInputElement;

    /**
     * Returns the current value of the email field or an empty string
     */
    get email() {
        return this.emailInput ? this.emailInput.value : '';
    }

    render() {
        return html`
        ${templateContent(button)}
        <div id="kid-parents-email">
            <div class="title">
                <h3>Give us a valid email! (Social features will be turned off until the email is varified)</h3>
            </div>
            <div class="form">       
                <form class="form-wrapper" @submit=${this._onSubmit}>
                    <div class="input-wrapper">
                        <label for="email">Please enter your parent's or guardian's email.</label>
                        <input @blur="${this.validateEmail}" id="email" class="input" type="email" placeholder="Email"/>
                        <div class="error">${this.errors.email}</div>
                     </div>
                     <div class="button-wrapper">
                       <button class="btn s" type="submit">Continue</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>  
    `;
    }

    _onSubmit(e: Event) {        
        e.preventDefault(); 
            if (this.validateEmail()){
            this.dispatchEvent(new CustomEvent('submit', {
                detail:{
                    email: this.email
                },
                bubbles: true,
                composed: true, 
            }))
            }
        }

    /**
     * Updates the error message for a field
     * @param field Which error field to update
     * @param message Error message displayed next to the field
     */
    updateError(field : 'email', message : string) {
        this.errors = Object.assign({}, this.errors, { [field]: message });
    }

    validateEmail() {
        const errorEmail = validateEmail(this.email);

        this.updateError('email', errorEmail || '');
        return !errorEmail;
        }
    }

