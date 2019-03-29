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
                        <input value="${this.username}" @change="${this.updateUsername}" class="input" type="text" id="username" placeholder="Make up a Kano Username"/>
                        <div class="error">${this.errors.username}</div>
                        <label for="password">Your password must be at least 8 characters.</label>
                        <input value="${this.password}" @change="${this.updatePassword}" class="input" type="password" id="password" placeholder="Make up a secret password"/>
                        <div class="error-message">${console.log(this.errors.password)}</div>
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
        this.username = e.target.value;
    }

    updatePassword(e: { target: { value: string; }; }){
        this.password = e.target.value;
    }

    _onSubmit(e: Event) {
        e.preventDefault(); 
        const validUsername = this.validateUsername();
        const validPassword = this.validatePassword();
        if (validUsername && validPassword) {
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
        if (!this.username || this.username.length === 0) { 
            this.errors.username = 'Username is required.';
            console.log(this.errors.username);
            return false;
        }
        else if (this.username.length < 6) {
            this.errors.username = 'Username must be at least 6 characters long.';
            console.log(this.errors.username);
            return false;
        }
        else if (!/^[a-zA-Z0-9_\-.]+$/.test(this.username)) {
            this.errors.username = 'Username must only contain letters, numbers, dashes, underscores and dots are allowed.';
            console.log(this.errors.username);
            return false;
        }
        else
            this.errors.username = ''
            return true;
    }

    validatePassword() {
        if (!this.password || this.password.length === 0) {
            this.errors.password = 'Password cannot be empty.';
            console.log(this.errors.password);
            return false;
        }
        else if (this.password.includes(' ')) {
            this.errors.password = 'Password cannot contain spaces.';
            console.log(this.errors.password);
            return false;
        }
        else if (this.password.length < 8) {
            this.errors.password = 'Password must be at least 8 characters long.';
            console.log(this.errors.password);
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