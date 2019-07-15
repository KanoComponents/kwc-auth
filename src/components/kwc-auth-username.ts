import { html, customElement, query, property, css } from 'lit-element/lit-element.js';
import { SingleInputElement } from './auth-single-form.js'
import { generateVerb, generateNoun } from './names.js';
import { styles } from '../styles.js';
import { _ } from '@kano/i18n/dist/index.js';

@customElement('kwc-auth-username')
export class UsernameInput extends SingleInputElement {
    constructor() {
        super();
        this.id = 'username';
        this.next = 'password';
        this.generateIcon = '';

        this.generateNames();
    }

    static get styles() {
        return [
            styles,
            css`
                .instruction {
                    padding: 0 10px 32px;
                }
                p {
                    font-weight: bold;
                    font-size: 14px;
                    padding: 0 10px 16px;
                }
                input {
                    height: 48px;
                    margin-bottom: 11px;
                }
                .generator-wrapper {
                    padding: 18px 20px 15px;
                    border: 1px solid var(--color-porcelain);
                    border-radius: 6px;
                }
                .generator {
                    display: flex;
                    flex-direction: column;
                }
                img {
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
                    position: relative;
                    font-weight: bold;
                    flex: 1;
                    border-radius: 6px;
                    border: 1px solid var(--color-stone);
                    padding: 12px 20px;
                    font-size: 16px;
                    margin: 8px;
                    user-select: none;
                    height: 24px;
                    overflow: hidden;
                }
                div.name:last-of-type {
                    margin-right: 0;
                }
                .generate {
                    background-color: var(--color-grey);
                    opacity: 0.8;
                    align-self: center;
                    padding: 10px;
                    height: initial;
                    line-height: initial;
                    margin: 0 14px;
                    border-radius: 6px;
                    20px 0 0 10px
                }
                .generate:hover {
                    background-color: var(--color-grey);
                    opacity: 1;
                }
                .name span {
                    display: block;
                    position: absolute;
                    color: #414A51;
                }
                .name span:not(:first-child) {
                    animation: rollOut 0.3s forwards;
                    
                }
                .name span:first-child {
                    animation: rollIn 0.3s forwards;
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

    @property({ type: String }) generateIcon: string;

    @property()
    private names : string[] = [];
    @property()
    private newNames : string[] = [];

    @query('#input')
    inputEl? : HTMLInputElement;
    @query('#name__first')
    nameFirst? : HTMLInputElement;
    @query('#name__second')
    nameSecond? : HTMLInputElement;

    updated(changed : Map<string, unknown>) {
        if (changed.has('names')) {
            this.updateGeneratedNames();
        }
    }

    inputTemplate() {
        super.inputTemplate()
        return html`
            <h3 class="instruction">${_('MAKE_UP_USERNAME', 'Pick a username from the list of generated names, or create your own. Don\'t use your real name or a name you used on other websites.')}</h3>
            <div class="input-wrapper">
                <p>${_('USERNAME_GENERATOR', 'Username generator')}</p>
                <div class="generator-wrapper">
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
            <div class="error">${this.error}</div>
        `;
    }

    renderNames() {
        return html`
            <div class="generator">
                <div class="names">
                    <button class="btn secondary generate" @click=${this.generateNames}>
                        <img src=${this.generateIcon} />
                    </button>
                    <div id="name__first" class="name">
                        <span>${this.newNames[0]}</span>
                    </div>
                    <div id="name__second" class="name">
                        <span>${this.newNames[1]}</span>
                    </div>
                </div>
            </div>
        `;
    }

    appendNameSpan() {
        const first = this.nameFirst;
        const second = this.nameSecond;
        if (!first || !second) {
            return;
        }
        const newFirst = document.createElement('span');
        newFirst.innerHTML = this.names[0];
        first.insertBefore(newFirst, first.firstChild);
        const newSecond = document.createElement('span');
        newSecond.innerHTML = this.names[1];
        second.insertBefore(newSecond, second.firstChild);
    }

    renderForcedChange() {
        const text = html`
            <h3 class="">We've updated our privacy policy, please update your username.</h3>
        `;
        return text;
    }

    generateNames() {
        this.names = [generateVerb(), generateNoun()];
        this.names.forEach((name, i) => {
            this.names[i] = name.charAt(0).toUpperCase() + name.slice(1);
        });
        if (this.newNames.length > 0) {
            this.appendNameSpan();
        } else {
            this.newNames = this.names;
        }
    }

    updateGeneratedNames() {
        const el = this.inputEl;
        if (!el) {
            return;
        }
        el.value = this.names.join('');
    }

    onGenerateClick() {
        this.generateNames();
    }
}