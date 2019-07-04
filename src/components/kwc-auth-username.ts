import { html, customElement, query, property, css } from 'lit-element/lit-element.js';
import { SingleInputElement } from './auth-single-form.js'
import { generateExultation, generateVerb, generateNoun } from './names.js';
import { _ } from '@kano/i18n/dist/index.js';

@customElement('kwc-auth-username')
export class UsernameInput extends SingleInputElement {
    constructor() {
        super();
        this.id = 'username';
        this.next = 'password';

        this.generateNames();
    }

    static get styles() {
        return [...super.styles, css`
            .generator {
                display: flex;
                flex-direction: column;
                background: #2c3d4e;
                padding: 8px;
                margin-bottom: 16px;
            }
            .names {
                display: flex;
                flex-direction: row;
            }
            .name {
                flex: 1;
                border-radius: 6px;
                background: var(--color-porcelain);
                padding: 18px 20px 16px;
                font-size: 16px;
                line-height: 20px;
                margin: 8px;
                text-align: center;
                user-select: none;
            }
            .generate {
                align-self: center;
                margin-top: 16px;
                margin-bottom: 8px;
            }
        `];
    }

    @property()
    private names : string[] = [];

    @query('#input')
    inputEl? : HTMLInputElement;

    updated(changed : Map<string, unknown>) {
        if (changed.has('names')) {
            this.updateGeneratedNames();
        }
    }

    inputTemplate() {
        super.inputTemplate()
        return html`
            <h3>${_('MAKE_UP_USERNAME', 'Make up a username. Don\'t use your real name or a name you used on other websites.')}</h3>
            <div class="input-wrapper">
                <label for="input">${_('USERNAME', 'Username')}</label>
                <input
                    ?disabled=${this.disabled}
                    @blur="${() => this.validateInput(this.id, this.value)}"
                    @keydown="${(e: KeyboardEvent) => this.handleKeydown(e)}"
                    type="text"
                    id="input"
                    placeholder=${_('YOU_USERNAME_HERE', 'Your username here')} />
                <div class="error">${this.error}</div>
            </div>
            ${this.renderNames()}
        `;
    }

    renderNames() {
        return html`
            <div class="generator">
                <div class="names">
                    <div class="name">${this.names[0]}</div>
                    <div class="name">${this.names[1]}</div>
                    <div class="name">${this.names[2]}</div>
                </div>
                <button class="btn generate" @click=${this.generateNames}>${_('GENERATE', 'Generate')}</button>
            </div>
        `;
    }

    generateNames() {
        this.names = [generateExultation(), generateVerb(), generateNoun()];
    }

    updateGeneratedNames() {
        const el = this.inputEl;
        if (!el) {
            return;
        }
        el.value = this.names.join('-');
    }

    onGenerateClick() {
        this.generateNames();
    }
}