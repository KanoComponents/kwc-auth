import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, html, customElement, property, query } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';
import { validateUsername, validatePassword } from '../utils/validation.js';

@customElement('kwc-auth-kidsignup')
export class KidSignup extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                #kid-signup {
                    max-width: 425px;
                }
            `,
            ];
        } 
    @property ( { type: Object } ) errors = ({ username: '', password: ''  });

    @query('#username')
    private usernameInput? : HTMLInputElement;
   
    /**
     * Returns the current value of the username field or an empty string
     */
    get username() {
        return this.usernameInput ? this.usernameInput.value : '';
    }
   
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
        <div id="kid-signup">
            <div class="form">       
                <div class="back-button">
                    <a href="" class="back">Back</a>
                </div>
                <form class="form-wrapper" @submit=${this._onSubmit}>
                    <div class="input-wrapper">
                        <label for="username">Choose a username that you don't use on any other website. Don't use your real name.</label>
                        <input @blur="${this.validateUsername}" class="input" type="text" id="username" placeholder="Make up a Kano Username"/>
                        <div class="error">${this.errors.username}</div>
                        <label for="password">Your password must be at least 8 characters.</label>
                        <div class="input-password-wrapper">
                            <input @blur="${this.validatePassword}" class="input" type="password" id="password" placeholder="Make up a secret password"/>
                            <img src="https://imgplaceholder.com/42x32/transparent/757575/fa-eye-slash" class="eye-toggle" id="eyeimage" @click="${this.togglePassword}"/>
                        </div>
                        <div class="error">${this.errors.password}</div>
                    </div>
                    <div class="button-wrapper">
                        <button class="btn s" type="submit">Continue</button>
                    </div>
                    <div class="link-wrapper">
                        <p class="linkToLogin">Already have an account? <a href="">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    `;
    }

    _onSubmit(e: Event) {
        e.preventDefault(); 
        
        if (this.validateUsername() && this.validatePassword()) {
            this.dispatchEvent(new CustomEvent('submit', {
                detail: {
                    username: this.username,
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

    validateUsername() {
        const errorUsername = validateUsername(this.username);
        
        this.updateError('username', errorUsername || '');
        return !errorUsername;
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
