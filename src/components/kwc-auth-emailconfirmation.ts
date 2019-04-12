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
                    text-align: center;
                }
                .title-signup {
                    color: #414A51;
                    font-family: Arial;
                    font-size: 18px;
                }
                .subtitle-signup {
                    color: #414A51;
                    font-family: Bariol;
                    font-size: 18px;
                    line-height: 18px;
                    text-align: center;
                }
                .image-wrapper {
                    height: 191px;
                    width: 972px;
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
        <div id="email-confirmation">
            <div class="topbar"></div>
            <div class="main-section">       
                <form class="form-wrapper">
                    <h4 class="title-signup">Thanks for signing up!</h4>
                    <h4 class="subtitle-signup">Ask your parents to confirm your account to get full access to Kano World.<h4>
                    <div class="image-wrapper"></div>
                    <div class="button-wrapper">
                        <button class="btn l" type="submit">Start Playing</button>
                    </div>
                    <div class="link-wrapper">
                        <p class="link-to-page"><a href="">Resend email</a></p>
                        <p class="link-to-page"><a href="">Use a different email address</a></p>
                    </div>    
                </form>
            </div> 
            </footer>
                <hr>
                <div class="privacy-wrapper">
                    <p class="privacy-policy"><a href="">Privacy Policy</a></p>
                </div>
            </footer>
        </div>  
    `;
    }
}
