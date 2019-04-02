import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, html, customElement, property, query } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';

@customElement('kwc-auth-kidparentsemail')
export class KidParentsEmail extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                #kid-parents-email {
                    max-width: 425px;
                }
            `
        ];
    } 
    @property ( { type: String } ) errors = '';

    @query('#email')
    private emailInput? : HTMLInputElement;

    /**
     * Returns the current value of the email field or an empty string
     */
    get email() {
        return this.emailInput ? this.emailInput.value : '';
    }

    render() {
        return html`
        ${templateContent(button)}
        <div id="kid-parents-email">
            <div class="title">
                <h2>Give us a valid email! (Social features will be turned off until the email is varified)</h2>
            </div>
            <div class="form">       
                <form class="form-wrapper" @submit=${this._onSubmit}>
                    <div class="input-wrapper">
                        <label for="input">Please enter your parent's or guardian's email.</label>
                        <input id="email" class="input" type="email" placeholder="Email"/>
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

    _onSubmit(e: Event) {        
        e.preventDefault(); 
        
            this.dispatchEvent(new CustomEvent('submit', {
                detail:{
                    email: this.email
                },
                bubbles: true,
                composed: true, 
            }))
        }
    }

