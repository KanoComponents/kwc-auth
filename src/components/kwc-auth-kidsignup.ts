import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, html, customElement, property, query } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';

@customElement('kwc-auth-kidsignup')
export class KidSignup extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                #kid-signup {
                    max-width: 525px;
                }
                .error {
                    color: red;
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
     /**
     * Returns the current value of the password field or an empty string
     */
    @query('#password')
    private passwordInput? : HTMLInputElement;

    get password() {
        return this.passwordInput ? this.passwordInput.value : '';
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
                        <input @blur="${this.validatePassword}" class="input" type="password" id="password" placeholder="Make up a secret password"/>
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
     * @param message Error mesasge displayed next to the field
     */
    updateError(field : 'username'|'password', message : string) {
        this.errors = Object.assign({}, this.errors, { [field]: message });
        
    }

    validateUsername() {
        let errorUsername;

        if (!this.username || this.username.length === 0) { 
            errorUsername = 'Username is required.';
        } else if (this.username.length < 6) {
            errorUsername = 'Username must be at least 6 characters long.';
        } else if (!/^[a-zA-Z0-9_\-.]+$/.test(this.username)) {
            errorUsername = 'Username must only contain letters, numbers, dashes, underscores and dots are allowed.';
        }
        
        this.updateError('username', errorUsername || '');
        return !errorUsername;
    }
    
    validatePassword() {
        let errorPassword;

        if (!this.password || this.password.length === 0) {
            errorPassword = 'Password cannot be empty.';
        } else if (this.password.includes(' ')) {
            errorPassword = 'Password cannot contain spaces.';
        } else if (this.password.length < 8) {
            errorPassword = 'Password must be at least 8 characters long.';
        }

        this.updateError('password', errorPassword || '');
        return !errorPassword;
    }
}
//add error handler message to say password isnt valid > when click away from page error removes from page
//green tick 
//eye icon to show pword or not