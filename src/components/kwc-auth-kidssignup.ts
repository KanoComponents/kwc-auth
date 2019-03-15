import '@kano/styles/typography.js';
import button from '@kano/styles/button.js';
import { LitElement, html, customElement, property } from 'lit-element';

@customElement('kwc-auth-kidssignup')
export class LandingPage extends LitElement {
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
        <div class="signupkids-title">
            <h1>Create a Kano World account</h1>
        </div>
        <div class="form-container">       
            <form @submit=${this._submit}>
                <label for="username">Choose username that you don't use on any other website. Don't use their real name</label>
                <input type="text" id="username" placeholder="Make up a Kano Username"/>
                <label for="password">Your password must be at least 8 characters</label>
                <input type="text" id="password" placeholder="Make up a secret password"/>
                <p>Already have an account?<a href="">login</a></p>
                <button class="continue" type="submit">Continue</button>
            </form>
        </div>
    `;
    }
}


