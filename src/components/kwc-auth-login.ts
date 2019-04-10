import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, customElement, html, query } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';

@customElement('kwc-auth-login')
export class Login extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                #login {
                    max-width: 425px;
                }
                .login-title {
                    text-align: center;
                    background-color: #C8C8C8;
                    padding: 20px;
                }
                .button-wrapper {
                    text-align: center;
                    padding: 10px;
                }
                .link-wrapper {
                    text-align: center;
                }
            `,
            ];
        }
    
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
        <div id="login">
            <div class="title">
                <h2 class="login-title">Login to your account</h2>
            </div>
            <div class="form">       
                <form class="form-wrapper" @submit=${this._submit}>
                    <div class="input-wrapper">
                        <label for="username">Username</label>
                        <input class="input" type="text" id="username" placeholder="Your Kano Username"/>
                        <label for="password">Password</label>
                        <div class="input-password-wrapper">
                            <input class="input" type="password" id="password" placeholder="Make up a secret password"/>
                            <img src="https://imgplaceholder.com/42x32/transparent/757575/fa-eye-slash" class="eye-toggle" id="eyeimage" @click="${this.togglePassword}"/>
                        </div>
                    </div>

                    <div class="button-wrapper">
                        <button class="btn l" type="submit">Login</button>
                    </div>
                    <hr>
                    <div class="link-wrapper">
                        <p class="linkToLogin">Forgot your <a href="">username</a> or <a href="">password</a> ?</p>
                        <p class="linkToLogin">No account? <a href="">Sign up!</a></p>
                    </div> 
                </form>
            </div>
        </div>
    `;
    }

    _submit(e: Event) {
        e.preventDefault();
        console.log(this.username, this.password);
        
        this.dispatchEvent(new CustomEvent('submit', {
            detail: {
                username: this.username,
                password: this.password,
            },
            bubbles: true,
            composed: true, 
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