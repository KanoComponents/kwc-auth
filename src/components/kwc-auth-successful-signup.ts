import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, html, customElement, css } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';

@customElement('kwc-auth-successful-signup')
export class SuccessfulSignup extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                :host {
                    text-align: center;
                }
                h3 {
                    color: #414A51;
                    font-family: Arial;
                    font-size: 18px;
                }
                h4 {
                    color: #414A51;
                    font-size: 18px;
                    line-height: 18px;
                    text-align: center;
                }
                .link-to-page {
                    font-weight: 700;
                }
                .button-wrapper button {
                    display: block;
                }
                `
        ];
    } 

    render() {
        return html`
        ${templateContent(button)}
        <div>
            <h3>Thanks for signing up!</h3>
            <h3>Ask your parents to confirm your account to get full access to Kano World.</h3>
            <div class="button-wrapper">
                <button @click=${this.handleSubmit} class="btn l" type="submit">Start Playing</button>
                <button @click=${this.handleResendEmail} class="btn s secondary" type="submit">Resend email</button>
            </div>
        </div>
    `;
    }

    handleSubmit(e: Event) {
        e.preventDefault();
        this.dispatchEvent(new Event('submit'));
    }
    handleResendEmail(e: Event) {
        e.preventDefault();
        this.dispatchEvent(new Event('resend-email'));
    }
}
