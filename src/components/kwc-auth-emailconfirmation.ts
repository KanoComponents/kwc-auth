import '@kano/styles/typography.js';
import button from '@kano/styles/button.js';
import { LitElement, html, customElement, property } from 'lit-element';

@customElement('kwc-auth-emailconfirmation')
export class EmailConfirmation extends LitElement {
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
                <h2>Check the email!</h2>
            </div>
            <div class="image-wrapper">
                <img src=""/>
            </div>
            <div class="form">       
                    <form class="form-wrapper" @submit=${this._submit}>
                    <div class="button-wrapper">
                        <button class="btn l" type="submit">Continue</button>
                    </div>
                    <div class="link-wrapper">
                        <a href="">Use different email</a>
                        <a href="">Resend email</a>
                    </div>    
                </form>
            </div>
        </div>  
    `;
    }
}
