import '@kano/styles/typography.js';
import button from '@kano/styles/button.js';
import { LitElement, customElement, html, property } from 'lit-element';

@customElement('kwc-auth-loginemailpopup')
export class LoginEmailPopUp extends LitElement {
    
    
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
                <div class="modal" id="modal" class="myModal">
                    <div class="modal-content">
                        <div class="text-wrapper">
                            <h2>Find your parents! We need their action</h2>
                            <p>US law requires that we verify you are an adult (and not a kid faking it). This account needs to be verified by an adult. We sent an email with instructions to t***@g***.com</p>
                            <h4>Please verify your email. The account will be deleted in [7] days</h4>
                        </div>
                        <div class="button-wrapper">
                            <button class="btn l" type="submit">Resend email</button>
                            <button class="btn l" type="submit">Use different email</button>
                        </div>
                        <div class="link-wrapper">
                            <a href="">Verify it later</a>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        `
    }
}