import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, html, customElement, property } from 'lit-element';
import { templateContent } from '../utils/template-content.js';

@customElement('kwc-auth-kidsignup')
export class KidSignup extends LitElement {
    static get styles() {
        return css`
        #kid-signup {
        max-width: 525px;
        }`;
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
        ${templateContent(button)}
        <div id="kid-signup">
            <div class="form">       
                <form class="form-wrapper" @submit=${this._submit}>
                    <div class="input-wrapper">
                        <label for="username">Choose a username that you don't use on any other website. Don't use your real name.</label>
                        <input class="input" type="text" id="username" placeholder="Make up a Kano Username"/>
                        <label for="password">Your password must be at least 8 characters.</label>
                        <input class="input" type="text" id="password" placeholder="Make up a secret password"/>
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
}


