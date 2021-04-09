import { html, customElement, query, property, css } from 'lit-element/lit-element.js';

import { _ } from '@kano/i18n/dist/index.js';

import { SingleInputElement } from './auth-single-form.js'
import { generateVerb, generateNoun } from './names.js';
import { styles } from '../styles.js';

@customElement('kwc-auth-username')
export class UsernameInput extends SingleInputElement {
    constructor() {
        super();
        this.id = 'username';
        this.next = 'password';
        this.generateIcon = html`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.22 18.54"><defs><style>.cls-1{fill:#fff;}</style></defs><title>Refresh</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M1.62,14.14a8.11,8.11,0,0,1-.75-4.09A7.87,7.87,0,0,1,2.2,6.21c.41-.64,1-.75,1.86-.34a1.39,1.39,0,0,1,.56.84,1.08,1.08,0,0,1-.18,1,5.71,5.71,0,0,0-.85,2.41,5.27,5.27,0,0,0,.32,2.57.72.72,0,0,0,.42.42.7.7,0,0,0,.6-.05L6,12.38a.33.33,0,0,1,.39,0,.32.32,0,0,1,.16.35L5.91,17.7a.65.65,0,0,1-.35.47.68.68,0,0,1-.62,0L.24,16.39A.31.31,0,0,1,0,16.08a.37.37,0,0,1,.19-.34l1.17-.68a.56.56,0,0,0,.32-.4A.77.77,0,0,0,1.62,14.14ZM8.9,5.84V7.07a.32.32,0,0,1-.21.32.33.33,0,0,1-.38,0L4.22,4.28a.68.68,0,0,1-.28-.57.62.62,0,0,1,.28-.55L8.31.07a.37.37,0,0,1,.38,0A.35.35,0,0,1,8.9.38V1.71a.66.66,0,0,0,.2.48.75.75,0,0,0,.47.23,8,8,0,0,1,3.91,1.37,8.08,8.08,0,0,1,2.68,3.09,1.17,1.17,0,0,1,.06,1,1.36,1.36,0,0,1-.69.76h0a1.33,1.33,0,0,1-1,.07,1.26,1.26,0,0,1-.76-.63,5.49,5.49,0,0,0-4-3,.71.71,0,0,0-.58.16A.63.63,0,0,0,8.9,5.84Zm6.66,9.46a7.81,7.81,0,0,1-3.15,2.51,8.6,8.6,0,0,1-4,.72,1.33,1.33,0,0,1-.89-.43,1.14,1.14,0,0,1-.32-.87v0a1.2,1.2,0,0,1,.44-.82,1.22,1.22,0,0,1,.92-.31,5.75,5.75,0,0,0,2.52-.45,5.25,5.25,0,0,0,2-1.57.59.59,0,0,0,.16-.56.68.68,0,0,0-.35-.49l-1.07-.63a.36.36,0,0,1-.19-.34.33.33,0,0,1,.24-.32l4.72-2a.77.77,0,0,1,.63,0,.6.6,0,0,1,.32.5l.63,5.09a.35.35,0,0,1-.16.36.35.35,0,0,1-.39,0l-1.16-.68A.65.65,0,0,0,15.56,15.3Z"/></g></g></svg>
        `;

        this.generateNames();
    }

    static get styles() {
        return [
            styles,
            css`
                .instruction {
                    padding: 0 10px 0;
                    margin: 6px 0 16px;
                }
                .intro {
                    padding: 0 10px 2px;
                }
                p {
                    font-weight: bold;
                    font-size: 14px;
                    color: #6767EC;
                    padding: 0 10px 8px;
                }
                .username-generator {
                    padding: 0 10px 8px 2px;
                }
                input {
                    height: 48px;
                    margin-bottom: 4px;
                }
                .generator-wrapper {
                    padding: 11px 12px 6px;
                    border: 1px solid var(--color-porcelain);
                    border-radius: 9px;
                }
                .generator {
                    display: flex;
                    flex-direction: column;
                }
                svg {
                    width: 24px;
                    vertical-align: sub;
                }
                .names {
                    display: flex;
                    flex-direction: row;
                }
                .name {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    font-weight: 500;
                    flex: 1;
                    border-radius: 6px;
                    border: 1px solid var(--color-stone);
                    padding: 0px 20px;
                    font-size: 16px;
                    margin: 8px;
                    user-select: none;
                    height: 44px;
                    overflow: hidden;
                }
                div.name:last-of-type {
                    margin-right: 0;
                }
                .generate {
                    background-color: #6767EC;
                    align-self: center;
                    padding: 10px;
                    height: initial;
                    line-height: initial;
                    margin: 0 14px;
                    border-radius: 6px;
                    transition: 300ms ease;
                }
                .generate:focus {
                    background-color: #6767EC;
                }
                .generate:hover {
                    background-color: #3a3ae6;
                }
                .generate svg {
                    width: 20px;
                    height: 20px;
                }
                .name span {
                    display: block;
                    position: absolute;
                    color: #414A51;
                }
                .name:nth-child(3) span {
                    animation-delay: 60ms;
                }
                .name:nth-child(4) span {
                    animation-delay: 100ms;
                }
                .name span:not(:first-child) {
                    animation-name: rollOut;
                    animation-duration: 0.3s;
                    animation-fill-mode: forwards;
                }
                .name span:first-child {
                    animation-name: rollIn;
                    animation-duration: 0.3s;
                    animation-fill-mode: backwards;
                }
                #name__third {
                    max-width: 8px;
                }
                .input-wrapper {
                    padding: 0 10px;
                }
                .button-wrapper {
                    position: relative;
                    margin-top: 20px;
                    padding: 0 10px;
                }
                .button-wrapper button {
                    margin: 0;
                }

                @keyframes rollIn {
                    0% {
                        opacity: 0;
                        transform: translateY(-40px);
                    }
                    30% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0px);
                    }
                }
                @keyframes rollOut {
                    0% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    50% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                }
            `
        ];
    }

    @property({ type: HTMLElement }) generateIcon: any;

    @property()
    private names : string[] = [];
    @property()
    private newNames : string[] = [];
    @property()
    private number : number = 1;

    @query('#input')
    inputEl? : HTMLInputElement;
    @query('#name__first')
    nameFirst? : HTMLInputElement;
    @query('#name__second')
    nameSecond? : HTMLInputElement;
    @query('#name__third')
    nameThird? : HTMLInputElement;

    updated(changed : Map<string, unknown>) {
        if (changed.has('names')) {
            this.updateGeneratedNames();
        }
    }

    inputTemplate() {
        super.inputTemplate()
        return html`
            <p class="intro">${_('LETS_GET_STARTED', 'Let’s get started')}</p>
            <h3 class="instruction">${_('MAKE_UP_USERNAME', 'Pick a username from the list of generated names, or create your own. Don’t use your real name or a name you used on other websites.')}</h3>
            <div class="input-wrapper">
                <div class="generator-wrapper">
                    <p class="username-generator">${_('USERNAME_GENERATOR', 'Username generator')}</p>
                    <input
                        ?disabled=${this.disabled}
                        @blur="${() => this.validateInput(this.id, this.value)}"
                        @keydown="${(e: KeyboardEvent) => this.handleKeydown(e)}"
                        type="text"
                        id="input"
                        placeholder=${_('YOU_USERNAME_HERE', 'Your username here')} />
                    ${this.renderNames()}
                </div>
            </div>
        `;
    }

    renderNames() {
        return html`
            <div class="generator">
                <div class="names">
                    <button class="btn generate" @click=${this.generateNames}>
                        ${this.generateIcon}
                    </button>
                    <div id="name__first" class="name">
                        <span>${this.newNames[0]}</span>
                    </div>
                    <div id="name__second" class="name">
                        <span>${this.newNames[1]}</span>
                    </div>
                    <div id="name__third" class="name">
                        <span>${this.number}</span>
                    </div>
                </div>
            </div>
        `;
    }

    appendNameSpan() {
        const first = this.nameFirst;
        const second = this.nameSecond;
        const third = this.nameThird;
        if (!first || !second || !third) {
            return;
        }
        const newFirst = document.createElement('span');
        newFirst.innerHTML = this.names[0];
        first.insertBefore(newFirst, first.firstChild);
        const newSecond = document.createElement('span');
        newSecond.innerHTML = this.names[1];
        second.insertBefore(newSecond, second.firstChild);
        const newThird = document.createElement('span');
        newThird.innerHTML = `${this.number}`;
        third.insertBefore(newThird, third.firstChild);
    }

    renderForcedChange() {
        const text = html`
            <h3 class="">${_('PRIVACY_POLICY_UPDATED', "We've updated our privacy policy, please update your username.")}</h3>
        `;
        return text;
    }

    generateNames() {
        this.names = [generateVerb(), generateNoun()];
        this.names.forEach((name, i) => {
            this.names[i] = name.charAt(0).toUpperCase() + name.slice(1);
        });
        this.number = this.generateNumber();
        if (this.newNames.length > 0) {
            this.appendNameSpan();
        } else {
            this.newNames = this.names;
        }
    }

    generateNumber() {
        return Math.floor(Math.random() * 9) + 1;
    }

    updateGeneratedNames() {
        const el = this.inputEl;
        if (!el) {
            return;
        }
        el.value = `${this.names.join('')}${this.number}`;
    }

    onGenerateClick() {
        this.generateNames();
    }
}