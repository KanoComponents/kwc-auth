import '@kano/styles/typography.js';
import { html, customElement, property } from 'lit-element/lit-element.js';
import { SingleInputElement } from './auth-single-form.js'

@customElement('kwc-auth-username')
export class UsernameInput extends SingleInputElement {
    @property({type: String}) error = '';
    constructor() {
        super();
        this.id = 'username';
        this.next = 'password';
    }

    inputTemplate() {
        super.inputTemplate()
        return html`
            <h3>Make up a username. Don't use your real name or a name you used on other websites.</h3>
            <div class="input-wrapper">
                <input
                    @blur="${() => this.validateInput(this.id, this.value)}"
                    @keydown="${(e: KeyboardEvent) => this.handleKeydown(e)}"
                    type="text"
                    id="input"
                    placeholder="Your username here" />
                <div class="error">${this.errors[this.id]}</div>
            </div>
        `;
    }
}