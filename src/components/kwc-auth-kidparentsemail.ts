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
                <h3>What's your parent's email address?</h3>
            </div>
            <div class="subtitle">
                <h4>Notice that all user-generated content (UGC) is moderated for privacy and safety.<h4>
            </div>
            <div class="form">       
                <form class="form-wrapper" @submit=${this._onSubmit}>
                    <div class="input-wrapper">
                        <input @blur="${this.validateEmail}" id="email" class="input" type="email" placeholder="Parent's email address"/>
                        <div class="error">${this.errors.email}</div>
                     </div>
                     <div class="button-wrapper">
                       <button class="btn l" type="submit">Continue</button>
                    </div>
                    <div class="link-wrapper">
                        <p class="linkToLogin">Already have an account? <a href="">Login</a></p>
                    </div>
                </form>
                <hr>
                <div class="privacy-wrapper">
                    <p class="privacy-policy"><a href="">Privacy Policy</a></p>
                </div>
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

