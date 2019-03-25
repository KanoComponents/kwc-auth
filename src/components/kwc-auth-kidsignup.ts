import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, html, customElement, property } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';
import '../utils/validation.js';

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


    constructor() {
        super();
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
                        <label for="password">Your password must be at least 8 characters.</label>
                        <input value="${this.password}" @change="${this.updatePassword}" class="input" type="password" id="password" placeholder="Make up a secret password"/>
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
        this.username = e.target.value
    }

    updatePassword(e: { target: { value: string; }; }){
        this.password = e.target.value
    }

    _onSubmit(e: Event) {
        e.preventDefault(); 
        console.log(e, this.username, this.password); 
        // const validUsername = this.validateUsername(this.username);
        // const validPassword = this.validatePassword(this.password);
        // if (validUsername && validPassword) {
        //     const info = {
        //         username: this.username,
        //         password: this.password,
        //     };
        //     this.dispatchEvent(new CustomEvent('kids-signup-form', {detail: info, bubbles: true, composed: true }));
        }
    }    
}


