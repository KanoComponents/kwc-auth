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
                #kid-parents-email {
                    max-width: 525px;
                }
            `
        ];
    } 
    @property ( { type: String } ) view = '';
    @property ( { type: String } ) email = '';
    @property ( { type: Object } ) error = ({ email: null });


    constructor() {
        super();
        this.addEventListener('valueChange', async () => {
                return await this.requestUpdate;
            });
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
                        <input value="${this.email}" @change="${this.updateEmail}" id="email" class="input" type="email" placeholder="Email"/>
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

    updateEmail(e: { target: { value: string; }; }){
        this.email = e.target.value
    }
    _onSubmit(e: Event) {
        e.preventDefault(); 
        console.log(e, this.email); 
        this._valueChanged();
    }    

    _valueChanged() {
        this.dispatchEvent(new CustomEvent('valueChange', {
            detail:{
                username: this.email
            },
            bubbles: true,
            composed: true, 
        }))
    }
}

