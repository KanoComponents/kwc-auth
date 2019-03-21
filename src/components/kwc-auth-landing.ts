import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, customElement, html, property } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';


@customElement('kwc-auth-landing')
export class LandingPage extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                .button-wrapper {
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    text-align: center;
                    align-items: center;
                }
                .btn.secondary {
                    margin-top: 10px;
                    min-width: 200px;
                }
            `,
        ];
      } 
    @property ( { type: String } ) view = '';
    prop: any;

    constructor() {
        super();
        this.view = '';

    }
    
    render() {
        return html`
        ${templateContent(button)}
        <div class="auth-landing">
            <div class="image">
                <img src="http://via.placeholder.com/640x360"/>
            </div>
            <div class="form-container">
                <form class="form-wrapper">
                    <div class ="button-wrapper">
                        <button @click=${this.handleClick} class="btn secondary" type="submit">Let's get Started</button>
                        <button @click=${this.handleClick} class="btn secondary" type="submit">I already have an account</button>
                    </div>
                </form>
            </div>
        </div>
        `;
    }
    handleClick(e: Event) {
        e.preventDefault(); 
        console.log('click');              
    }
}
  


