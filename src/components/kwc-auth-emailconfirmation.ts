import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, html, customElement, css } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';

@customElement('kwc-auth-emailconfirmation')
export class EmailConfirmation extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                #email-confirmation {
                    max-width: 425px;
                    text-align: center;
                }
            `
        ];
    } 

    render() {
        return html`
        ${templateContent(button)}
        <div id="email-confirmation">
            <div class="title">
                <h4>Thanks for signing up!</h4>
            </div>
            <div class="subtitle">
                    <h4>Ask your parents to confirm your account to get full access to Kano World.<h4>
                </div>
            <div class="image-wrapper">
                <img src="https://imgplaceholder.com/125x85/transparent/757575/glyphicon-send"/>
            </div>
            <div class="form">       
                <form class="form-wrapper">
                    <button class="btn l" type="submit">Start Playing</button>
                    <div class="link-wrapper">
                        <p class="linkToLogin"><a href="">Use different email</a></p>
                        <p class="linkToLogin"><a href="">Resend email</a></p>
                    </div>    
                </form>
            </div>
            <hr>
            <div class="privacy-wrapper">
                <p class="privacy-policy"><a href="">Privacy Policy</a></p>
            </div>
        </div>  
    `;
    }
}
