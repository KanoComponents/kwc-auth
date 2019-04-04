import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, html, customElement, css, property } from 'lit-element/lit-element.js';
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
            <div class="title-wrapper">
                <h2>Check the email!</h2>
            </div>
            <div class="image-wrapper">
                <img src="https://imgplaceholder.com/125x85/transparent/757575/glyphicon-send"/>
            </div>
            <div class="form">       
                <form class="form-wrapper">
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
