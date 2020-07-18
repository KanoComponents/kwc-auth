import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, html, customElement, css } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';
import { _ } from '@kano/i18n/dist/index.js';

@customElement('kwc-auth-successful-signup')
export class SuccessfulSignup extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                :host {
                    display: block;
                    text-align: center;
                }
                h3 {
                    color: #414A51;
                    font-size: 32px;
                }
                h4 {
                    color: #414A51;
                    line-height: 18px;
                }
                .link-to-page {
                    font-weight: 700;
                }
                .button-wrapper button {
                    display: block;
                }
                .button-wrapper {
                    display: flex;
                }
                .l {
                    margin-right: 28px;
                }
                .intro {
                    text-align: left;
                    margin-bottom: 15px;
                }
            `,
        ];
    } 

    render() {
        return html`
            ${templateContent(button)}
            <p class="intro">${_('THANKS_SIGN_UP', 'Thanks for signing up!')}</p>
            <h3>${_('ASK_PARENT_CONFIRM', 'Ask your parents to confirm your account to get full access to Kano World.')}</h3>
            <div class="button-wrapper">
                <button @click=${this.handleSubmit} class="btn l" type="submit">${_('START_PLAYING', 'Start Playing')}</button>
                <button @click=${this.handleResendEmail} class="btn secondary" type="submit">${_('RESEND_EMAIL', 'Resend email')}</button>
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
