import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, html, customElement, css } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';


@customElement('kwc-auth-emailvarificationmodel')
export class EmailVarificationModel extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                #email-varification {
                    min-width: 575px;
                    text-align: center;
                }
                .warning-message {
                    text-align: center;
                }
            `
        ];
    } 

    render() {
        return html`
        ${templateContent(button)}
        <div id="email-varification">
            <div class="title-wrapper">
                <h4>Hello, Appleseed!</h4>
                <p>This account needs to be verified by an adult. We sent an email with instructions to t***@g***.com</p>
                <h2 class="warning-message">7days until we deactivate your account</h2>
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
