import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, html, customElement, property } from 'lit-element';
import { templateContent } from '../utils/template-content.js';

@customElement('kwc-auth-kidparentsemail')
export class KidParentsEmail extends LitElement {
    static get styles() {
        return css`
        #kid-parents-email {
        max-width: 525px;
        }`;
      } 
    @property ( { type: String } ) view = '';
    // public view : string;

    constructor() {
        super();
        this.view = '';
    }

    _submit(e: Event) {
        e.preventDefault();
    }

    render() {
        return html`
        ${templateContent(button)}
        <link rel="stylesheet" href="./static/styles.css">
        <div id="kid-parents-email">
            <div class="title">
                <h2>Give us a valid email! (Social features will be turned off until the email is varified)</h2>
            </div>
            <div class="form">       
                <form class="form-wrapper" @submit=${this._submit}>
                    <div class="input-wrapper">
                        <label for="input">Please enter your parent's or guardian's email.</label>
                        <input class="input" type="email" placeholder="Email"/>
                     </div>
                     <div class="button-wrapper">
                       <button class="btn s" type="submit">Continue</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>  
    `;
    }
}
