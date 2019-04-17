import '@kano/styles/typography.js';
import { html, customElement, query, property } from 'lit-element/lit-element.js';
import { SingleInputElement } from './auth-single-form.js'

@customElement('kwc-auth-createpassword')
export class CreatePassword extends SingleInputElement {
    constructor() {
        super();
        this.id = 'password';
        this.next = 'email'
    }

    @query('#eyeimage')
    private imageInput? : HTMLInputElement;

    @property({type: String}) username = '';

     /**
    * Returns the current value of the eye image field or an empty string
    */

    get eyeimage() {
        return this.imageInput ? this.imageInput.value : '';
    }
    inputTemplate() {
        return html`
                <h3>Welcome to Kano ${this.username}!</h3>
                <h4>Set up a password for your account to make it secure. Your password must be at least 8 characters</h4>
            <div class="input-wrapper">
                <div class="input-wrapper">
                    <input
                        @blur="${() => this.validateInput(this.id, this.value)}"
                        type="password"
                        id="input"
                        placeholder="Make up a password"/>
                    <img
                        src="https://imgplaceholder.com/42x32/transparent/757575/fa-eye-slash"
                        class="eye-toggle"
                        id="eyeimage"
                        @click="${this.togglePassword}"/>
                    <div class="error">${this.errors[this.id]}</div>
                </div>
            </div>
        `;
    }
    // EXAMPLEinputTemplate() {
    //     return html`
    //         <h3>Make up a username. Don't use your real name or a name you used on other websites.</h3>
    //         <div class="input-wrapper">
    //             <input @blur="${() => this.validateInput(this.id, this.value)}" type="text" id="input" placeholder="Your username here" />
    //             <div class="error">${this.getErrors(this.id)}</div>
    //         </div>
    //     `;
    // }

    togglePassword() {
        if (!this.inputElement || !this.imageInput ){
            return;
        }

        // replace with local assets
        const img1 = "https://imgplaceholder.com/42x32/transparent/757575/fa-eye";
        const img2 = "https://imgplaceholder.com/42x32/transparent/757575/fa-eye-slash";
        if (this.inputElement.type == 'password') {
            this.inputElement.type = 'text';
            this.imageInput.src = img1;
        } else {
            this.inputElement.type = 'password';
            this.imageInput.src = img2;
        }
    }
}
