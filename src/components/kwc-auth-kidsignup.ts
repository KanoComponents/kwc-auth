import '@kano/styles/typography.js';
import button from '@kano/styles/button.js';
import { LitElement, html, customElement, property } from 'lit-element';

@customElement('kwc-auth-kidsignup')
export class KidSignup extends LitElement {
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
        ${button}
        <link rel="stylesheet" href="./static/styles.css">
        <div class="auth-section">
            <div class="title-wrapper">
                <h2>Create a Kano World account</h2>
            </div>
            <div class="form">       
                <form class="form-wrapper" @submit=${this._submit}>
                    <div class="input-wrapper">
                        <h3 class="usernameText">Choose username that you don't use on any other website. Don't use their real name</h3>
                        <input class="input" type="text" id="username" placeholder="Make up a Kano Username"/>
                        <h3 class="passwordText">Your password must be at least 8 characters</h3>
                        <input class="input" type="text" id="password" placeholder="Make up a secret password"/>
                        <p class="linkToLogin">Already have an account? <a href="">Login</a></p>
                    </div>
                    <div class="button-wrapper">
                        <button class="btn l" type="submit">Continue</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    }
}


