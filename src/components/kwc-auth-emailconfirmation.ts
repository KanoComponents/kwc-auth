import '@kano/styles/typography.js';
import button from '@kano/styles/button.js';
import { LitElement, html, customElement, property } from 'lit-element/lit-element.js';
import { styles } from '../styles.js';


@customElement('kwc-auth-emailconfirmation')
export class EmailConfirmation extends LitElement {
    static get styles() {
        return [styles];
      } 
    @property ( { type: String } ) view = '';

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
        <div class="auth-section">
            <div class="title-wrapper">
                <h2>Check the email!</h2>
            </div>
            <div class="image-wrapper">
                <img src=""/>
            </div>
            <div class="form">       
                <form class="form-wrapper" @submit=${this._submit}>
                    <button class="btn l" type="submit">Continue</button>
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
