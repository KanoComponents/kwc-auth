import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, customElement, html } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';


@customElement('kwc-auth-landing')
export class LandingPage extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                .button-wrapper {
                    text-align: center;
                    padding: 23px;
                }
                .btn.l {
                    margin: 10px;
                }
            `,
        ];
      } 
    
    render() {
        return html`
        ${templateContent(button)}
        <div>
            <div class="topbar"></div>
            <div class="image">
                <img src="http://via.placeholder.com/1024x560"/>
            </div>
            <div class="form-container">
                <form>
                    <div class="button-wrapper">
                        <button @click=${this.handleClick} class="btn l" type="submit">Let's get Started</button>
                        <button @click=${this.handleClick} class="btn l" type="submit">I already have an account</button>
                    </div>
                </form>
            </div>
        </div>
        `;
    };

    handleClick(e: Event) {
        e.preventDefault(); 
        console.log('click');              
    };
};
  


