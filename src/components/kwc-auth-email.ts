import { html, css, customElement, property } from 'lit-element/lit-element.js';

import { _ } from '@kano/i18n/dist/index.js';
import '@kano/styles/typography.js';

import { styles } from '../styles.js';
import * as icons from '../icons';
import { SingleInputElement, SubmitDetails } from './auth-single-form.js';

@customElement('kwc-auth-email')
export class EmailInput extends SingleInputElement {
    @property({ type: String }) selectedRegion = '';
    @property({ type: Array }) regions = [{
            name: 'United States',
            value: 'usa'
        }, {
            name: 'Japan',
            value: 'jpn'
        }, {
            name: 'Europe',
            value: 'eur'
        }, {
            name: 'Other',
            value: 'row'
        }];

    static get styles() {
        return [
            styles,
            css`
                .email__regions {
                   display: flex;
                   justify-content: space-between;
                   margin-top: 14px;
                }
                .email__region {
                    display: flex;
                    align-items: center;
                }
                .email__region:hover {
                    cursor: pointer;
                }
                .email__region-selector {
                    width: 18px;
                    height: 18px;
                    background-color: #E9EBEC;
                    border-radius: 24px;
                    margin-right: 8px;
                }
                .email__region:hover .email__region-selector {
                    display: none;
                }
                .email__region-tick {
                    display: none;
                    margin-right: 8px;
                    width: 18px;
                    height: 18px;
                }
                .email__region:hover .email__region-tick {
                    display: block;
                }
                .email__region-selector.selected {
                    display: none;
                }
                .email__region-tick.selected {
                    display: block;
                }
                .email__region-name {
                    font-weight: bold;
                    font-size: 18px;
                    color: #414a51;
                }
            `
        ];
    }

    constructor() {
        super();
        this.id = 'email';
        this.next = 'success';
    }

    handleClick(e: Event) {
        e.preventDefault();
        if (!this.validateInput(this.id, this.value) || !this.validateInput('region', this.selectedRegion)) {
            return;
        }
        const event: SubmitDetails = {
            detail: {
                next: this.next,
                payload: {
                    email: this.value,
                    region: this.selectedRegion,
                },
            },
        };

        this.dispatchEvent(new CustomEvent('submit', event));
    }

    updateRegion(region: string) {
        this.selectedRegion = region;
        console.log(this.selectedRegion);
    }

    renderRegion(el: { name: string, value: string }) {
        return html `
            <div class="email__region" @click=${() => this.updateRegion(el.value)}>
                <div class=${`email__region-selector ${el.value === this.selectedRegion ? 'selected' : ''}`} ></div>
                <img class=${`email__region-tick ${el.value === this.selectedRegion ? 'selected' : ''}`} src=${icons.tick} />
                <div class="email__region-name">${el.name}</div>
            </div>
        `;
    }

    renderRegions() {
        return html`
            <div class="email__regions">
                ${this.regions.map(reg => this.renderRegion(reg))}
            </div>
        `;
    }

    inputTemplate() {
        console.log('value-in-email', this.value);
        return html`
            <p class="intro">${_('AUTH_WHAT_EMAIL', 'What’s your parent’s email address?')}</p>
            <h4 class="instruction">${_('AUTH_GIVE_VALID_EMAIL', 'All Kano accounts need a valid parent email address to share and view creations on Kano World.')}</h4>
            <div class="input-wrapper">
                <p class="input-title">${_('CREATE_A_PASSWORD', 'Parent’s email address')}</p>
                <input
                    ?disabled=${this.disabled}
                    @blur="${() => this.validateInput(this.id, this.value)}"
                    @keydown="${(e: KeyboardEvent) => this.handleKeydown(e)}"
                    id="input"
                    class="input"
                    type="email"
                    placeholder=${_('EXAMPLE_EMAIL', 'name@email.com')} />
                <p class="input-title">${_('CREATE_A_PASSWORD', 'What region are you in?')}</p>
                ${this.renderRegions()}
            </div>
            <div class="error">${this.error}</div>
        `;
    }
}
