import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, html, customElement, property, query } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';
import { validatePassword } from '../utils/validation.js';

@customElement('kwc-auth-createpassword')
export class CreatePassword extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                #create-password {
                    max-width: 425px;
                }
            `,
            ];
        } 
    @property ( { type: Object } ) errors = ({ password: ''  });
    @property ({ type: String } ) username = '';
   
    @query('#password')
    private passwordInput? : HTMLInputElement;
    
    /**
    * Returns the current value of the password field or an empty string
    */
    get password() {
        return this.passwordInput ? this.passwordInput.value : '';
    }

    @query('#eyeimage')
    private imageInput? : HTMLInputElement;

     /**
    * Returns the current value of the eye image field or an empty string
    */

    get eyeimage() {
        return this.imageInput ? this.imageInput.value : '';
    }

    render() {        
        return html`
        ${templateContent(button)}
        <div id="create-password">
            <div class="form">       
                <div class="back-button">
                    <a href="" class="back">Back</a>
                </div>
                <div class="title">
                    <h3>Welcome to Kano ${this.username}!<h3>
                </div>
                <div class="subtitle">
                    <h4>Set up a password for your account to make it secure. Your password must be at least 8 characters.!<h4>
                </div>
                <form class="form-wrapper" @submit=${this._onSubmit}>
                    <div class="input-wrapper">
                        <div class="input-password-wrapper">
                            <input @blur="${this.validatePassword}" class="input" type="password" id="password" placeholder="Make up a password"/>
                            <img src="https://imgplaceholder.com/42x32/transparent/757575/fa-eye-slash" class="eye-toggle" id="eyeimage" @click="${this.togglePassword}"/>
                        </div>
                        <div class="error">${this.errors.password}</div>
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
        
        if (this.validatePassword()) {
            this.dispatchEvent(new CustomEvent('submit', {
                detail: {
                    password: this.password,
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
    updateError(field : 'username'|'password', message : string) {
        this.errors = Object.assign({}, this.errors, { [field]: message });
    }
    
    validatePassword() {
        const errorPassword = validatePassword(this.password);

        this.updateError('password', errorPassword || '');
        return !errorPassword;
    }

    togglePassword() {
        if (!this.passwordInput || !this.imageInput ){
            return
        }        

        const img1 = "https://imgplaceholder.com/42x32/transparent/757575/fa-eye";
        const img2 = "https://imgplaceholder.com/42x32/transparent/757575/fa-eye-slash";
    
        
        if (this.passwordInput.type == 'password') {
            this.passwordInput.type = 'text';
            this.imageInput.src = img1;
        } else {
            this.passwordInput.type = 'password';
            this.imageInput.src = img2;
        }
    }
}
