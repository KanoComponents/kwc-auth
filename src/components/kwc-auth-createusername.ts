import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, html, customElement, property, query } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';
import { validateUsername } from '../utils/validation.js';

@customElement('kwc-auth-createusername')
export class CreateUsername extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                #create-username {
                    max-width: 425px;
                }
            `,
            ];
        } 
    @property ( { type: Object } ) errors = ({ username: '' });

    @query('#username')
    private usernameInput? : HTMLInputElement;
   
    /**
     * Returns the current value of the username field or an empty string
     */
    get username() {
        return this.usernameInput ? this.usernameInput.value : '';
    }

    render() {        
        return html`
        ${templateContent(button)}
        <div id="create-username">
            <div class="form">       
                <div class="back-button">
                    <a href="" class="back">Back</a>
                </div>
                <div class="title">
                    <h3>Make up a username. Don't use your real name or a name you used on other websites.<h3>
                </div>
                <form class="form-wrapper" @submit=${this._onSubmit}>
                    <div class="input-wrapper">
                        <input @blur="${this.validateUsername}" class="input" type="text" id="username" placeholder="Make up a username"/>
                        <div class="error">${this.errors.username}</div>
                    </div>
                    <div class="button-wrapper">
                        <button class="btn l" type="submit">Continue</button>
                    </div>
                    <div class="link-wrapper">
                        <p class="linkToLogin">Already have an account? <a href="">Login</a></p>
                    </div>
                </form>
                <hr>
                <div class="privacy-wrapper">
                    <p class="privacy-policy"><a href="">Privacy Policy</a></p>
                </div>
            </div>
        </div>
    `;
    }

    _onSubmit(e: Event) {
        e.preventDefault(); 
        
        if (this.validateUsername()) {
            this.dispatchEvent(new CustomEvent('submit', {
                detail: {
                    username: this.username,
                },
                bubbles: true,
                composed: true, 
            }))
        }
    }
  
    /**
     * Updates the error message for a field
     * @param field Which error field to update
     * @param message Error message displayed next to the field
     */
    updateError(field : 'username', message : string) {
        this.errors = Object.assign({}, this.errors, { [field]: message });
    }

    validateUsername() {
        const errorUsername = validateUsername(this.username);
        
        this.updateError('username', errorUsername || '');
        return !errorUsername;
    }
}