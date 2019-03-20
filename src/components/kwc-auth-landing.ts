import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, customElement, html, property } from 'lit-element';
import { templateContent } from '../utils/template-content.js';


@customElement('kwc-auth-landing')
export class LandingPage extends LitElement {
    @property ( { type: String } ) view = '';
    prop: any;

    constructor() {
        super();
        this.view = '';

    }

    
    render() {
        return html`
        <link rel="stylesheet" href="./static/styles.css">
        ${templateContent(button)}
        <div class="auth-section">
            <div class="image">
                <img src="http://via.placeholder.com/640x360"/>
            </div>
            <div class="form-container">
                <form class="button">
                    <div class ="button-wrapper">
                        <button @click=${this.handleClick} class="btn secondary" type="submit">Let's get Started</button>
                    </div>
                    <div class ="button-wrapper">
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
  


