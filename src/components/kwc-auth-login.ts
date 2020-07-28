import { LitElement, css, customElement, html, query, property } from 'lit-element/lit-element.js';

import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { _ } from '@kano/i18n/dist/index.js';

import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';
import * as icons from '../icons.js';

@customElement('kwc-auth-login')
export class Login extends LitElement {
    @property({ type: Boolean }) showPassword = false;
    static get styles() {
        return [
            styles,
            css`
                :host {
                    display: block;
                    padding: 0;
                    margin: 0;
                }
                .login__wrapper {
                    height: inherit;
                    display: flex;
                    flex-direction: column;
                }
                .header {
                    background-color: #E9EBEC;
                    min-height: 56px;
                    border-radius: 6px 6px 0 0;
                    padding: 0px 14px;
                    text-align: center;
                    box-sizing: border-box;
                    background-repeat: no-repeat;
                    background-position: calc(100% - 6px) 0px;
                    background-size: contain;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                }
                .world-logo {
                    width: 56px;
                    margin-right: 12px;
                }
                form {
                    position: relative;
                }
                .header h3 {
                    color: #434A50;
                    font-size: 24px;
                }
                .username,
                .password {
                    color: #6767EC;
                }
                label {
                    font-size: 14px;
                }
                button {
                    margin-top: 0;
                }
                .button-wrapper {
                    position: relative;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .error-message {
                    max-width: 190px;
                    font-size: 14px;
                    font-weight: bold;
                    color: var(--color-kano-orange);
                    text-align: center;
                }
                form {
                    padding: 15px 30px;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                }
                .footer {
                    margin-top: auto;
                    font-weight: bold;
                    font-size: 14px;
                    padding-top: 16px;
                }
                .footer * {
                    font-size: inherit;
                }
                .footer--ja {
                    font-size: 12px;
                }
                .footer p,
                .footer a {
                    margin-bottom: 0;
                }
                .eye-toggle {
                    width: 16px;
                    height: 16px;
                    padding: 8px 10px;
                    cursor: pointer;
                }
                .privacy {
                    color: var(--color-grey);
                }
                .footer--ja .sign-up * {
                    font-size: 11px;
                }
                .sign-up {
                    display: flex;
                    justify-content: space-between;
                }

                @media (max-width: 600px) {
                    .header {
                        border-radius: 0;
                    }
                    .header h3 {
                        text-align: center;
                    }
                }
            `,
            ];
        }

    @property({type: String}) error = '';
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) locale = '';
    @property({ type: String }) logo = '';
    @property({ type: String }) loginGlyph: string;
    
    @query('#username')
    private usernameInput? : HTMLInputElement;
    
     /**
      * Returns the current value of the username field or an empty string
      */
    get username() {
        return this.usernameInput ? this.usernameInput.value : '';
    }
    
    @query('#password')
    private passwordInput? : HTMLInputElement;
     
     /**
     * Returns the current value of the password field or an empty string
     */
    get password() {
        return this.passwordInput ? this.passwordInput.value : '';
    }

    @query('#eyeimage')
    private imageInput? : HTMLInputElement;

     /**
    * Returns the current value of the eye image field or an empty string
    */
    get eyeimage() {
        return this.imageInput ? this.imageInput.value : '';
    }

    constructor() {
        super();
        // TODO: Pending design decision tweaks
        this.loginGlyph = `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIxIiBoZWlnaHQ9IjU3IiB2aWV3Qm94PSIwIDAgMjIxIDU3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj4KPHBhdGggb3BhY2l0eT0iMC42IiBkPSJNMTMyIDEyLjlDMTMyIDcuMzAwMDEgMTM2LjYgMi43MDAwMSAxNDIuMiAyLjcwMDAxQzE0Ny44IDIuNzAwMDEgMTUyLjQgNy4zMDAwMSAxNTIuNCAxMi45QzE1Mi40IDE4LjUgMTQ3LjggMjMuMSAxNDIuMiAyMy4xQzEzNi42IDIzLjEgMTMyIDE4LjUgMTMyIDEyLjlaTTE0OS42IDEyLjlDMTQ5LjYgOC44MDAwMSAxNDYuMyA1LjUwMDAxIDE0Mi4yIDUuNTAwMDFDMTM4LjEgNS41MDAwMSAxMzQuOCA4LjgwMDAxIDEzNC44IDEyLjlDMTM0LjggMTcgMTM4LjEgMjAuMyAxNDIuMiAyMC4zQzE0Ni4zIDIwLjMgMTQ5LjYgMTcgMTQ5LjYgMTIuOVoiIGZpbGw9IiNGRjY5MDAiLz4KPHBhdGggb3BhY2l0eT0iMC42IiBkPSJNMTM4LjQgMTIuOUMxMzguNCAxMC44IDE0MC4xIDkgMTQyLjMgOUMxNDQuNCA5IDE0Ni4yIDEwLjcgMTQ2LjIgMTIuOUMxNDYuMiAxNS4xIDE0NC41IDE2LjggMTQyLjMgMTYuOEMxNDAuMSAxNi44IDEzOC40IDE1IDEzOC40IDEyLjlaTTE0My4zIDEyLjlDMTQzLjMgMTIuMyAxNDIuOCAxMS44IDE0Mi4yIDExLjhDMTQxLjYgMTEuOCAxNDEuMSAxMi4zIDE0MS4xIDEyLjlDMTQxLjEgMTMuNSAxNDEuNiAxNCAxNDIuMiAxNEMxNDIuOCAxNCAxNDMuMyAxMy41IDE0My4zIDEyLjlaIiBmaWxsPSIjRkY2OTAwIi8+CjxwYXRoIG9wYWNpdHk9IjAuNiIgZD0iTTE4OS4xIDI2LjJDMTg5LjEgMjMuMyAxOTEuNCAyMSAxOTQuMyAyMUMxOTcuMiAyMSAxOTkuNSAyMy4zIDE5OS41IDI2LjJDMTk5LjUgMjkuMSAxOTcuMiAzMS40IDE5NC4zIDMxLjRDMTkxLjQgMzEuNCAxODkuMSAyOS4xIDE4OS4xIDI2LjJaTTE5NS44IDI2LjJDMTk1LjggMjUuNCAxOTUuMiAyNC44IDE5NC40IDI0LjhDMTkzLjYgMjQuOCAxOTMgMjUuNCAxOTMgMjYuMkMxOTMgMjcgMTkzLjYgMjcuNiAxOTQuNCAyNy42QzE5NS4yIDI3LjYgMTk1LjggMjcgMTk1LjggMjYuMloiIGZpbGw9IiNGRjY5MDAiLz4KPHBhdGggb3BhY2l0eT0iMC42IiBkPSJNNjguNSAyNS40QzcwLjEgMjUuNCA3MS41IDI0LjEgNzEuNSAyMi40VjExLjVDNzEuNSA5LjkgNzAuMiA4LjUgNjguNSA4LjVDNjYuOSA4LjUgNjUuNSA5LjggNjUuNSAxMS41VjIyLjRDNjUuNSAyNC4xIDY2LjggMjUuNCA2OC41IDI1LjRaIiBmaWxsPSIjRkY2OTAwIi8+CjxnIG9wYWNpdHk9IjAuNiI+CjxwYXRoIG9wYWNpdHk9IjAuNiIgZD0iTTEyNS40IDE5LjdDMTI1LjQgMjEuNCAxMjQuMSAyMi43IDEyMi40IDIyLjdDMTIwLjcgMjIuNyAxMTkuNCAyMS40IDExOS40IDE5LjdDMTE5LjQgMTggMTIwLjcgMTYuNyAxMjIuNCAxNi43QzEyNC4xIDE2LjcgMTI1LjQgMTguMSAxMjUuNCAxOS43WiIgZmlsbD0iI0ZGNjkwMCIvPgo8L2c+CjxwYXRoIGQ9Ik0yMTQuMSAwVjQuNkMyMTQuMSA2LjIgMjE1LjQgNy42IDIxNy4xIDcuNkMyMTguOCA3LjYgMjIwLjEgNi4zIDIyMC4xIDQuNlYwSDIxNC4xWiIgZmlsbD0iIzY3NjdFQyIvPgo8cGF0aCBkPSJNMTMyIDEyLjlDMTMyIDcuMzAwMDEgMTM2LjYgMi43MDAwMSAxNDIuMiAyLjcwMDAxQzE0Ny44IDIuNzAwMDEgMTUyLjQgNy4zMDAwMSAxNTIuNCAxMi45QzE1Mi40IDE4LjUgMTQ3LjggMjMuMSAxNDIuMiAyMy4xQzEzNi42IDIzLjEgMTMyIDE4LjUgMTMyIDEyLjlaTTE0OS42IDEyLjlDMTQ5LjYgOC44MDAwMSAxNDYuMyA1LjUwMDAxIDE0Mi4yIDUuNTAwMDFDMTM4LjEgNS41MDAwMSAxMzQuOCA4LjgwMDAxIDEzNC44IDEyLjlDMTM0LjggMTcgMTM4LjEgMjAuMyAxNDIuMiAyMC4zQzE0Ni4zIDIwLjMgMTQ5LjYgMTcgMTQ5LjYgMTIuOVoiIGZpbGw9IiNGRjY5MDAiLz4KPHBhdGggZD0iTTEzOC40IDEyLjlDMTM4LjQgMTAuOCAxNDAuMSA5IDE0Mi4zIDlDMTQ0LjQgOSAxNDYuMiAxMC43IDE0Ni4yIDEyLjlDMTQ2LjIgMTUuMSAxNDQuNSAxNi44IDE0Mi4zIDE2LjhDMTQwLjEgMTYuOCAxMzguNCAxNSAxMzguNCAxMi45Wk0xNDMuMyAxMi45QzE0My4zIDEyLjMgMTQyLjggMTEuOCAxNDIuMiAxMS44QzE0MS42IDExLjggMTQxLjEgMTIuMyAxNDEuMSAxMi45QzE0MS4xIDEzLjUgMTQxLjYgMTQgMTQyLjIgMTRDMTQyLjggMTQgMTQzLjMgMTMuNSAxNDMuMyAxMi45WiIgZmlsbD0iI0ZGNjkwMCIvPgo8cGF0aCBkPSJNMTg5LjEgMjYuMkMxODkuMSAyMy4zIDE5MS40IDIxIDE5NC4zIDIxQzE5Ny4yIDIxIDE5OS41IDIzLjMgMTk5LjUgMjYuMkMxOTkuNSAyOS4xIDE5Ny4yIDMxLjQgMTk0LjMgMzEuNEMxOTEuNCAzMS40IDE4OS4xIDI5LjEgMTg5LjEgMjYuMlpNMTk1LjggMjYuMkMxOTUuOCAyNS40IDE5NS4yIDI0LjggMTk0LjQgMjQuOEMxOTMuNiAyNC44IDE5MyAyNS40IDE5MyAyNi4yQzE5MyAyNyAxOTMuNiAyNy42IDE5NC40IDI3LjZDMTk1LjIgMjcuNiAxOTUuOCAyNyAxOTUuOCAyNi4yWiIgZmlsbD0iI0ZGNjkwMCIvPgo8cGF0aCBkPSJNNjguNSAyNS40QzcwLjEgMjUuNCA3MS41IDI0LjEgNzEuNSAyMi40VjExLjVDNzEuNSA5LjkgNzAuMiA4LjUgNjguNSA4LjVDNjYuOSA4LjUgNjUuNSA5LjggNjUuNSAxMS41VjIyLjRDNjUuNSAyNC4xIDY2LjggMjUuNCA2OC41IDI1LjRaIiBmaWxsPSIjRkY2OTAwIi8+CjxwYXRoIGQ9Ik0xMjUuNCAxOS43QzEyNS40IDIxLjQgMTI0LjEgMjIuNyAxMjIuNCAyMi43QzEyMC43IDIyLjcgMTE5LjQgMjEuNCAxMTkuNCAxOS43QzExOS40IDE4IDEyMC43IDE2LjcgMTIyLjQgMTYuN0MxMjQuMSAxNi43IDEyNS40IDE4LjEgMTI1LjQgMTkuN1oiIGZpbGw9IiNGRjY5MDAiLz4KPHBhdGggZD0iTTAgMFY4LjRDMCAxMCAxLjMgMTEuNCAzIDExLjRDNC43IDExLjQgNiAxMC4xIDYgOC40VjBIMFoiIGZpbGw9IiNGRkIzMDAiLz4KPHBhdGggZD0iTTEzMiAxMi45QzEzMiA3LjMwMDAxIDEzNi42IDIuNzAwMDEgMTQyLjIgMi43MDAwMUMxNDcuOCAyLjcwMDAxIDE1Mi40IDcuMzAwMDEgMTUyLjQgMTIuOUMxNTIuNCAxOC41IDE0Ny44IDIzLjEgMTQyLjIgMjMuMUMxMzYuNiAyMy4xIDEzMiAxOC41IDEzMiAxMi45Wk0xNDkuNiAxMi45QzE0OS42IDguODAwMDEgMTQ2LjMgNS41MDAwMSAxNDIuMiA1LjUwMDAxQzEzOC4xIDUuNTAwMDEgMTM0LjggOC44MDAwMSAxMzQuOCAxMi45QzEzNC44IDE3IDEzOC4xIDIwLjMgMTQyLjIgMjAuM0MxNDYuMyAyMC4zIDE0OS42IDE3IDE0OS42IDEyLjlaIiBmaWxsPSIjRUY1Mjg1Ii8+CjxwYXRoIGQ9Ik0xMzguNCAxMi45QzEzOC40IDEwLjggMTQwLjEgOSAxNDIuMyA5QzE0NC40IDkgMTQ2LjIgMTAuNyAxNDYuMiAxMi45QzE0Ni4yIDE1LjEgMTQ0LjUgMTYuOCAxNDIuMyAxNi44QzE0MC4xIDE2LjggMTM4LjQgMTUgMTM4LjQgMTIuOVpNMTQzLjMgMTIuOUMxNDMuMyAxMi4zIDE0Mi44IDExLjggMTQyLjIgMTEuOEMxNDEuNiAxMS44IDE0MS4xIDEyLjMgMTQxLjEgMTIuOUMxNDEuMSAxMy41IDE0MS42IDE0IDE0Mi4yIDE0QzE0Mi44IDE0IDE0My4zIDEzLjUgMTQzLjMgMTIuOVoiIGZpbGw9IiNGRkIzMDAiLz4KPHBhdGggZD0iTTE4OS4xIDI2LjJDMTg5LjEgMjMuMyAxOTEuNCAyMSAxOTQuMyAyMUMxOTcuMiAyMSAxOTkuNSAyMy4zIDE5OS41IDI2LjJDMTk5LjUgMjkuMSAxOTcuMiAzMS40IDE5NC4zIDMxLjRDMTkxLjQgMzEuNCAxODkuMSAyOS4xIDE4OS4xIDI2LjJaTTE5NS44IDI2LjJDMTk1LjggMjUuNCAxOTUuMiAyNC44IDE5NC40IDI0LjhDMTkzLjYgMjQuOCAxOTMgMjUuNCAxOTMgMjYuMkMxOTMgMjcgMTkzLjYgMjcuNiAxOTQuNCAyNy42QzE5NS4yIDI3LjYgMTk1LjggMjcgMTk1LjggMjYuMloiIGZpbGw9IiNGRkIzMDAiLz4KPHBhdGggZD0iTTY4LjUgMjUuNEM3MC4xIDI1LjQgNzEuNSAyNC4xIDcxLjUgMjIuNFYxMS41QzcxLjUgOS45IDcwLjIgOC41IDY4LjUgOC41QzY2LjkgOC41IDY1LjUgOS44IDY1LjUgMTEuNVYyMi40QzY1LjUgMjQuMSA2Ni44IDI1LjQgNjguNSAyNS40WiIgZmlsbD0iI0ZGNjkwMCIvPgo8cGF0aCBkPSJNNzUuOTAwMiA0NS42QzcwLjMwMDIgNDUuNiA2NS43MDAyIDUwLjIgNjUuNzAwMiA1NS44SDY4LjUwMDJINzIuMDAwMkg3NC44MDAySDc2LjkwMDJINzkuNzAwMkg4My4yMDAySDg2LjAwMDJDODYuMTAwMiA1MC4yIDgxLjUwMDIgNDUuNiA3NS45MDAyIDQ1LjZaIiBmaWxsPSIjMDBDOUIyIi8+CjxwYXRoIGQ9Ik0yMTMuNiA1NlY1MS44QzIxMy42IDUwLjEgMjEyLjIgNDguNyAyMTAuNSA0OC43QzIwOC44IDQ4LjcgMjA3LjQgNTAuMSAyMDcuNCA1MS44VjU2SDIxMy42WiIgZmlsbD0iI0ZGNjkwMCIvPgo8cGF0aCBkPSJNMTI1LjQgMTkuN0MxMjUuNCAyMS40IDEyNC4xIDIyLjcgMTIyLjQgMjIuN0MxMjAuNyAyMi43IDExOS40IDIxLjQgMTE5LjQgMTkuN0MxMTkuNCAxOCAxMjAuNyAxNi43IDEyMi40IDE2LjdDMTI0LjEgMTYuNyAxMjUuNCAxOC4xIDEyNS40IDE5LjdaIiBmaWxsPSIjMDBDOUIyIi8+CjxwYXRoIGQ9Ik0xNzUuNSAwVjYuNUMxNzUuNSA4LjEgMTc2LjggOS41IDE3OC41IDkuNUMxODAuMSA5LjUgMTgxLjUgOC4yIDE4MS41IDYuNVYwSDE3NS41WiIgZmlsbD0iI0ZGNjkwMCIvPgo8cGF0aCBkPSJNNDMuNjAwNCAxMi45QzQ1LjIwMDQgMTEuMyA0Ni4xMDA0IDkuMSA0Ni4xMDA0IDYuOEM0Ni4xMDA0IDQuNSA0NS4yMDA0IDIuMyA0My42MDA0IDAuN0w0My4wMDA0IDBIMzguODAwNEMzOS4yMDA0IDAuOCAzOS43MDA0IDEuNSA0MC40MDA0IDIuMkw0MS4zMDA0IDMuMUM0Mi4zMDA0IDQuMSA0Mi44MDA0IDUuNCA0Mi44MDA0IDYuOEM0Mi44MDA0IDguMiA0Mi4zMDA0IDkuNSA0MS4zMDA0IDEwLjVMNDAuOTAwNCAxMC45QzM5LjMwMDQgMTIuNSAzOC40MDA0IDE0LjcgMzguNDAwNCAxN0MzOC40MDA0IDE5LjMgMzkuMzAwNCAyMS41IDQwLjkwMDQgMjMuMUM0MS42MDA0IDIzLjggNDIuNjAwNCAyMy44IDQzLjMwMDQgMjMuMUM0NC4wMDA0IDIyLjQgNDQuMDAwNCAyMS40IDQzLjMwMDQgMjAuN0M0Mi4zMDA0IDE5LjcgNDEuODAwNCAxOC40IDQxLjgwMDQgMTdDNDEuODAwNCAxNS42IDQyLjMwMDQgMTQuMyA0My4zMDA0IDEzLjNMNDMuNjAwNCAxMi45WiIgZmlsbD0iIzY3NjdFQyIvPgo8cGF0aCBkPSJNMTQ1LjIgNTZWNTAuOVY0MS40QzE0NS4yIDM5LjggMTQzLjkgMzguNSAxNDIuMyAzOC41QzE0MC43IDM4LjUgMTM5LjQgMzkuOCAxMzkuNCA0MS40VjUwLjlWNTZIMTQ1LjJaIiBmaWxsPSIjNjc2N0VDIi8+CjxwYXRoIGQ9Ik0xNzYuNSA1Mi4xQzE3Ni41IDUzLjUgMTc2IDU0LjggMTc1IDU1LjhMMTc0LjkgNTUuOUgxNzkuMUMxNzkuNyA1NC43IDE4MCA1My40IDE4MCA1Mi4xQzE4MCA0OS44IDE3OS4xIDQ3LjYgMTc3LjUgNDZDMTc2LjggNDUuMyAxNzUuOCA0NS4zIDE3NS4xIDQ2QzE3NC40IDQ2LjcgMTc0LjQgNDcuNyAxNzUuMSA0OC40QzE3NiA0OS40IDE3Ni41IDUwLjcgMTc2LjUgNTIuMVoiIGZpbGw9IiMwMEM5QjIiLz4KPHBhdGggZD0iTTExNy45IDU2VjM2LjVDMTE3LjkgMzQuOSAxMTYuNiAzMy41IDExNC45IDMzLjVDMTEzLjMgMzMuNSAxMTEuOSAzNC44IDExMS45IDM2LjVWNTZIMTE3LjlaIiBmaWxsPSIjRkY2OTAwIi8+CjxwYXRoIGQ9Ik0zNiA1Ni4xVjQ0LjNDMzYgNDIuNyAzNC43IDQxLjMgMzMgNDEuM0MzMS40IDQxLjMgMzAgNDIuNiAzMCA0NC4zVjU2LjFIMzZaIiBmaWxsPSIjRkY2OTAwIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iMjIwLjEiIGhlaWdodD0iNTYuMSIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K')`;
    }

    renderFooter() {
        if (this.locale === 'ja-jp') {
            return html`
                <div class="footer footer--ja">
                    <p class="color-grey">
                        <a @click=${(e: Event) => this._changeView(e, 'forgot-username')} href="">${_('USERNAME_LOWERCASE', 'username')}</a> ${_('OR', 'or')} 
                        <a @click=${(e: Event) => this._changeView(e, 'forgot-password')} href="">${_('PASSWORD_LOWERCASE', 'password')}</a>
                        ${_('FORGOT_YOUR', 'Forgot your')}${_('QUESTION_MARK', '?')}
                    </p>
                    <p class="color-grey sign-up">
                        <span>
                            <a @click=${(e: Event) => this._changeView(e, 'username')} href="">${_('SIGN_UP', 'Sign up')}</a>
                            ${_('NO_ACCOUNT', 'No account?')}
                        </span>
                        <a href="https://world.kano.me/privacy-policy" class="privacy" target="_blank">${_('PRIVACY_POLICY', 'Privacy Policy')}</a>
                    </p>
                </div>
        `
        } else {
            return html`
                <div class="footer">
                    <p class="color-grey">
                        ${_('FORGOT_YOUR', 'Forgot your')} 
                        <a @click=${(e: Event) => this._changeView(e, 'forgot-username')} href="">${_('USERNAME_LOWERCASE', 'username')}</a> ${_('OR', 'or')} 
                        <a @click=${(e: Event) => this._changeView(e, 'forgot-password')} href="">${_('PASSWORD_LOWERCASE', 'password')}</a>${_('QUESTION_MARK', '?')}
                    </p>
                    <p class="color-grey sign-up">
                        <span>
                            ${_('NO_ACCOUNT', 'No account?')} 
                            <a @click=${(e: Event) => this._changeView(e, 'username')} href="">${_('SIGN_UP', 'Sign up')}</a>!&nbsp;
                        </span>
                        <a href="https://world.kano.me/privacy-policy" class="privacy" target="_blank">${_('PRIVACY_POLICY', 'Privacy Policy')}</a>
                    </p>
                </div>
            `
        }
    }

    render() {
        return html`
         ${templateContent(button)}
        <div class="login__wrapper">
            <div class="header"
                style="background-image:${this.loginGlyph}">
                <img src=${icons.world} class="world-logo" />
                <h3>${_('LOGIN', 'Login')}</h3>
                ${this.renderClose()}
            </div>
            <form @submit=${this._submit}>
                <div class="input-wrapper">
                    <label class="username" for="username">${_('USERNAME', 'Username')}</label>
                    <input type="text" id="username" placeholder=${_('YOUR_KANO_USERNAME', 'Enter your Kano username')} ?disabled=${this.disabled} />
                    <label class="password" for="password">${_('PASSWORD', 'Password')}</label>
                    <div class="input-wrapper">
                        <input type=${this.showPassword ? 'text' : 'password'} id="password" placeholder=${_('YOUR_SUPER_SECRET_PASSWORD', 'Enter your secret password')} ?disabled=${this.disabled} />
                        <img src=${icons.eye} class="eye-toggle" id="eyeimage" style="opacity: ${this.showPassword ? '1' : '0.5'}" @click=${() => this.togglePassword()} />
                    </div>
                </div>
                <div class="button-wrapper">
                    <button class="btn l" type="submit" ?disabled=${this.disabled}>${_('LOGIN', 'Login')}</button>
                    <div class="error-message">${this.error}</div>
                </div>
                ${this.renderFooter()} 
            </form>
        </div>
    `;
    }

    renderClose() {
        // TODO: Add close icon that depending on the app will show or not
        return html``;
    }

    _submit(e: Event) {
        e.preventDefault();
        
        this.dispatchEvent(new CustomEvent('submit', {
            detail: {
                username: this.username,
                password: this.password,
            },
            bubbles: true,
            composed: true, 
        }))
    }

    _changeView(e:Event, view: string) {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent('changeView', {
            detail: {
                view,
            }
        }))
    }

    togglePassword() {
        this.showPassword = !this.showPassword;
    }
    
}