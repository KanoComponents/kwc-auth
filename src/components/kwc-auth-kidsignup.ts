import '@kano/styles/typography.js';
import button from '@kano/styles/button.js';
import { LitElement, css, html, customElement, property } from 'lit-element';

@customElement('kwc-auth-kidsignup')
export class KidSignup extends LitElement {
    static get styles(){
        return css`
        /* h2 {
            color: var(--red-color);
        } */
        /* :host {
            font-family: var(--font-body);
            width: 100%;
            display: flex;
            flex-flow: column;
            align-items: center;
            border: 1px solid grey;
            border-radius: 10px;
        } */
        /* .signupkids-title {
            text-align: center;
        }
        .linkToLogin {
            text-align: center;
        }
        input {
            width: 100%;
        }
        button {
            font-family: var(--font-body);
            display: flex;
            width: 100%;
            max-width: 100px;
            justify-content: center;
        }
        .button-wrapper {
            width: 100%;
            display: flex;
            flex-flow: column;
            align-items: center;
        } */
        `
    }
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
            <div class="auth-title">
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
                        <button class="continue" type="submit">Continue</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    }
}


