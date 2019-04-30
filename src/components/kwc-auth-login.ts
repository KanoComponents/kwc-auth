import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, customElement, html, query, property } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';

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
                .button-wrapper {
                    text-align: center;
                    padding: 10px;
                }
                h2 {
                    text-align: center;
                    margin: 0;
                }
                form {
                    padding: 15px 30px;
                }
                .footer {
                    text-align: center;
                }
                .footer p,
                .footer a {
                    font-size: 14px;
                }
            `,
            ];
        }

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
                <h2>Login</h2>
            </div>
            <form @submit=${this._submit}>
                <div class="input-wrapper">
                    <label for="username">Username</label>
                    <input type="text" id="username" placeholder="Your Kano Username"/>
                    <label for="password">Password</label>
                    <div class="input-wrapper">
                        <input type="password" id="password" placeholder="Make up a secret password"/>
                        <img src="https://imgplaceholder.com/42x32/transparent/757575/fa-eye-slash" class="eye-toggle" id="eyeimage" @click="${this.togglePassword}"/>
                    </div>
                </div>
                <div class="button-wrapper">
                    <button class="btn l" type="submit">Login</button>
                </div>
                <hr>
                <div class="footer">
                    <p class="color-grey">Forgot your 
                        <a @click=${(e: Event) => this._changeView(e, 'forgot-username')} href="">username</a> or 
                        <a @click=${(e: Event) => this._changeView(e, 'forgot-password')} href="">password</a> ?
                    </p>
                    <p class="color-grey">No account? 
                        <a @click=${(e: Event) => this._changeView(e, 'username')} href="">Sign up!</a>
                    </p>
                </div> 
            </form>
        </div>
    `;
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