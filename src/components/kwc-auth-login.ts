import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, customElement, html, query, property } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';
import { _ } from '@kano/i18n/dist/index.js';

@customElement('kwc-auth-login')
export class Login extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                :host {
                    display: block;
                    padding: 0;
                    margin: 0;
                }
                .header {
                    background-color: #FF6900;
                    min-height: 60px;
                    border-radius: 6px 6px 0 0;
                    padding: 20px;
                    text-align: center;
                    box-sizing: border-box;
                    background-repeat: no-repeat;
                    background-position: 100% 0;
                    background-size: contain;
                }
                form {
                    position: relative;
                }
                .header h3 {
                    color: #fff;
                }
                button {
                    margin-top: 0;
                }
                .button-wrapper {
                    margin: 0;
                }
                .error-message {
                    position: absolute;
                    max-width: 190px;
                    left: 126px;
                    font-size: 14px;
                    color: red;
                    font-weight: bold;
                }
                form {
                    padding: 15px 30px;
                }
                .breaker {
                    height: 1px;
                    background-color: var(--color-porcelain);
                    margin: 16px 0;
                }
                .footer {
                    text-align: center;
                    font-weight: bold;
                }
                .footer p,
                .footer a {
                    font-size: 14px;
                }
            `,
            ];
        }

    @property({type: String}) error = '';
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) logo = '';
    @property({ type: String }) loginGlyph: string;
    
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

    constructor() {
        super();
        this.loginGlyph = '';
    }

    render() {
        return html`
         ${templateContent(button)}
        <div>
            <div class="header"
                style="background-image:url(${this.loginGlyph})">
                <h3>Login to your account</h3>
                ${this.renderClose()}
            </div>
            <form @submit=${this._submit}>
                <div class="input-wrapper">
                <label for="username">${_('USERNAME', 'Username')}</label>
                    <input type="text" id="username" placeholder=${_('YOUR_KANO_USERNAME', 'Enter your Kano username')} ?disabled=${this.disabled} />
                    <label for="password">${_('PASSWORD', 'Password')}</label>
                    <div class="input-wrapper">
                        <input type="password" id="password" placeholder=${_('YOUR_SUPER_SECRET_PASSWORD', 'Enter your secret password')} ?disabled=${this.disabled} />
                        <img src="https://imgplaceholder.com/42x32/transparent/757575/fa-eye-slash" class="eye-toggle" id="eyeimage" @click=${this.togglePassword} />
                    </div>
                </div>
                <div class="error-message">${this.error}</div>
                <div class="button-wrapper">
                    <button class="btn l" type="submit" ?disabled=${this.disabled}>${_('LOGIN', 'Login')}</button>
                </div>
                <div class="breaker"></div>
                <div class="footer">
                    <p class="color-grey">${_('FORGOT_YOUR', 'Forgot your')} 
                        <a @click=${(e: Event) => this._changeView(e, 'forgot-username')} href="">${_('USERNAME_LOWERCASE', 'username')}</a> ${_('OR', 'or')} 
                        <a @click=${(e: Event) => this._changeView(e, 'forgot-password')} href="">${_('PASSWORD_LOWERCASE', 'password')}</a>${_('QUESTION_MARK', '?')}
                    </p>
                    <p class="color-grey">${_('NO_ACCOUNT', 'No account?')} 
                        <a @click=${(e: Event) => this._changeView(e, 'username')} href="">${_('SIGN_UP', 'Sign up')}</a>!
                    </p>
                </div> 
            </form>
        </div>
    `;
    }

    renderClose() {
        // TODO: Add close icon that depending on the app will show or not
        return html``;
    }

    _submit(e: Event) {
        e.preventDefault();
        
        this.dispatchEvent(new CustomEvent('submit', {
            detail: {
                username: this.username,
                password: this.password,
            },
            bubbles: true,
            composed: true, 
        }))
    }

    _changeView(e:Event, view: string) {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent('changeView', {
            detail: {
                view,
            }
        }))
    }

    togglePassword() {
        let img1 = "https://imgplaceholder.com/42x32/transparent/757575/fa-eye";
        let img2 = "https://imgplaceholder.com/42x32/transparent/757575/fa-eye-slash";
        
        if (!this.passwordInput || !this.imageInput ){
            return
        }        
        if (this.passwordInput.type == 'password') {
            this.passwordInput.type = 'text';
            this.imageInput.src = img1;
        } else {
            this.passwordInput.type = 'password';
            this.imageInput.src = img2;
        }
    }
    
}