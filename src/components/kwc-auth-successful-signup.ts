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
                .image-wrapper {
                    height: 200px;
                    background-color: #C8C8C8;
                    margin-bottom: 20px;
                }
                .link-to-page {
                    font-weight: 700;
                }
                `
        ];
    } 

    render() {
        return html`
        ${templateContent(button)}
        <div>
            <h3>Thanks for signing up!</h3>
            <h4>Ask your parents to confirm your account to get full access to Kano World.</h4>
            <div class="image-wrapper"></div>
            <div class="button-wrapper">
                <button class="btn l" type="submit">Start Playing</button>
            </div>
            <div class="link-wrapper">
                
                <a href="">Resend email</a>
                <a href="">Use a different email address</a>
            </div>
        </div>
    `;
    }
}
