import '@kano/styles/typography.js';
import button from '@kano/styles/button.js';
import { LitElement, css, customElement, html, property } from 'lit-element';

@customElement('kwc-auth-landing')
export class LandingPage extends LitElement {
    static get styles(){
        return css`
        :host {
            display: inline-block;
            font-family: var(--font-body);
        }
        button {
            font-family: var(--font-body);
        }
        `
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
        ${button}
        <div class="landing-image">
            <img src=""/>
        </div>
        <div class="form-container">
            <form class="button-wrapper" @submit=${this._submit}>
                <button class="getStarted" type="submit">Let's get Started</button>
                <button class="alreadyGotAccount" type="submit">I already have an account</button>
            </form>
        </div>
    `;
    }
}
  


