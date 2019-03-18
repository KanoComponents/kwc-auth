import '@kano/styles/typography.js';
import button from '@kano/styles/button.js';
import { LitElement, css, customElement, html, property } from 'lit-element';

@customElement('kwc-auth-landing')
export class LandingPage extends LitElement {
    static get styles(){
        return css`
        /* :host {
            width: 100%;
            display: flex;
            flex-flow: column;
            align-items: center;
            border: 1px solid grey;
            border-radius: 10px;
        } */
        /* .auth-section {
        border: 1px solid grey;
        border-radius: 10px;

    } */
        button {
            font-family: var(--font-body);
            display: flex;
            width: 100%;
            min-width: 250px;
            justify-content: center;
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
        <link rel="stylesheet" href="./static/styles.css">
        ${button}
        <div class="auth-section">
            <div class="landing-image">
                <img src=""/>
            </div>
            <div class="form-container">
                <form class="button-wrapper" @submit=${this._submit}>
                    <button class="getStarted" type="submit">Let's get Started</button>
                    <button class="alreadyGotAccount" type="submit">I already have an account</button>
                </form>
            </div>
        </div>
    `;
    }
}
  


