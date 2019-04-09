import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, html, customElement, css, property } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';


@customElement('kwc-auth-emailverificationmodel')
export class EmailVerificationModel extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                #email-verification {
                    min-width: 575px;
                    text-align: center;
                }
                .warning-message { 
                    text-align: center;
                }
            `
        ];
    } 

    @property ( { type: Object } ) user = ({ username: '', email: '', countdays: '' }) 

    render() {
        return html`
        ${templateContent(button)}
        <div id="email-verification">
            <div class="title-wrapper">
                <h4>Hello, ${this.user.username}</h4>
                <p>This account needs to be verified by an adult. We sent an email with instructions to ${this.user.email}</p>
                <h2 class="warning-message">${this.user.countdays} days until we deactivate your account</h2>
            </div>
            <div class="button-wrapper">
                <button class="btn s" type="submit">Resend email</button>
                <button class="btn s" type="submit">Use different email</button>
            </div>
            <div class="link-wrapper">
                <a href="">Sign out</a>
                <a href="">Verify it later</a>
            </div> 
        </div>  
    `;
    }
}
