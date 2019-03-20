import '@kano/styles/typography.js';
import button from '@kano/styles/button.js';
import { LitElement, customElement, html, property } from 'lit-element';

@customElement('kwc-auth-login')
export class Login extends LitElement {
    
    
    @property ( { type: String } ) view = '';
    // public view : string;

    constructor() {
        super();
        this.view = '';
    }

    _submit(e: Event) {
        e.preventDefault();
    }

    render() {
        return html`
        <link rel="stylesheet" href="./static/styles.css">
        ${button}
        <div class="auth-section">
            <div class="title-wrapper">
                <h2>Login</h2>
            </div>
            <div class="form">       
                <form class="form-wrapper" @submit=${this._submit}>
                    <div class="input-wrapper">
                        <h3 class="usernameText">Username</h3>
                        <input class="input" type="text" id="username" placeholder="Your Kano Username"/>
                        <h3 class="passwordText">Password</h3>
                        <input class="input" type="text" id="password" placeholder="Your secret Password"/>
                    </div>
                    <div class="button-wrapper">
                        <button class="btn l" type="submit">Log in</button>
                    </div>
                    <div class="link-wrapper">
                        <p class="linkToLogin">Forgot your <a href="">Username</a> or <a href="">Password</a> ?</p>
                        <p class="linkToLogin">No account? <a href="">Sign up</a></p>
                    </div> 
                </form>
            </div>
        </div>
    `;
    }
}