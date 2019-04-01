import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, html, customElement, property } from 'lit-element/lit-element.js';
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
    @property ( { type: String } ) view = '';
    @property ( { type: String } ) username = '';
    @property ( { type: String } ) password = '';
    @property ( { type: Object } ) errors = ({ username: '', password: ''  });

    constructor() {
        super();
        this.addEventListener('valueChange', async () => {
            try {
                await this.requestUpdate;
            } catch (err) {
                }
            });
        
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
                        <input value="${this.username}" @keyup="${this.updateUsername}" class="input" type="text" id="username" placeholder="Make up a Kano Username"/>
                        <div class="error">${this.errors.username}</div>
                        <label for="password">Your password must be at least 8 characters.</label>
                        <input value="${this.password}" @keyup="${this.updatePassword}" class="input" type="password" id="password" placeholder="Make up a secret password"/>
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

    updateUsername(e: { target: { value: string; }; }){
        console.log(e.target.value);   
        this.username = e.target.value;
        this.validateUsername();
        this.validatePassword();
    }

    updatePassword(e: { target: { value: string; }; }){
        console.log(e.target.value);  
        this.password = e.target.value;
        this.validateUsername();
        this.validatePassword();
    }

    _onSubmit(e: Event) {
        e.preventDefault();
        if (this.validateUsername() || this.validatePassword()) {
            this._valueChanged();
        }
    }    

    _valueChanged() {
        console.log(this.username, this.password);   
        this.dispatchEvent(new CustomEvent('valueChange', {
            detail: {
                username: this.username,
                password: this.password,
            },
            bubbles: true,
            composed: true, 
        }))
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

        if (errorUsername) {           
            this.errors.username =
            errorUsername            
        return false;
    }
        else 
            this.errors.username = '';
        return true; 
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

        if (errorPassword) {
            this.errors.password = 
            errorPassword      
        return false;
        }
        else 
            this.errors.password = '';
        return true; 
    }

}
//add error handler message to say password isnt valid > when click away from page error removes from page
//green tick 
//eye icon to show pword or not