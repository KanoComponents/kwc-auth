import '@kano/styles/typography.js';
import button from '@kano/styles/button.js';
import { LitElement, html, customElement, property } from 'lit-element';

@customElement('kwc-auth-kidparentsemail')
export class KidParentsEmail extends LitElement {
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
                <h2>Give us a valid email!<br>(Social features will be turned off until the email is varified)</h2>
            </div>
            <div class="form">       
                <form class="form-wrapper" @submit=${this._submit}>
                    <div class="input-wrapper">
                        <input class="input" type="email" placeholder="Email"/>
                        <h4>Please enter your parent's or guardian's email</h4>
                     </div>
                     <div class="button-wrapper">
                       <button class="btn l" type="submit">Continue</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>  
    `;
    }
}
