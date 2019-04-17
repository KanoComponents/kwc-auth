import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, html, customElement, property } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';


@customElement('kwc-auth-kidparentsemail')
export class KidParentsEmail extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                /* component specific styling */
            `
        ];
    } 
    @property ( { type: String } ) view = '';

    constructor() {
        super();
        this.view = '';
    }

    render() {
        return html`
        ${templateContent(button)}
        <div>
            <h2>Give us a valid email! (Social features will be turned off until the email is varified)</h2>
            <div class="form">       
                <form>
                    <div class="input-wrapper">
                        <label for="input">Please enter your parent's or guardian's email.</label>
                        <input class="input" type="email" placeholder="Email"/>
                     </div>
                     <div class="button-wrapper">
                       <button @click=${this.handleClick} class="btn s" type="submit">Continue</button>
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
