import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, customElement, html, query, property } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';
import { _ } from '@kano/i18n/dist/index.js';
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
                .header {
                    background-color: #D95000;
                    min-height: 60px;
                    border-radius: 6px 6px 0 0;
                    padding: 16px 20px;
                    text-align: center;
                    box-sizing: border-box;
                    background-repeat: no-repeat;
                    background-position: 100% 0;
                    background-size: contain;
                }
                form {
                    position: relative;
                }
                .header h3 {
                    color: #fff;
                }
                button {
                    margin-top: 0;
                }
                .button-wrapper {
                    position: relative;
                    margin: 0;
                }
                .error-message {
                    position: absolute;
                    max-width: 190px;
                    left: 95px;
                    bottom: 10px;
                    font-size: 14px;
                    color: red;
                    font-weight: bold;
                }
                form {
                    padding: 15px 30px;
                }
                .breaker {
                    height: 1px;
                    background-color: var(--color-porcelain);
                    margin: 16px 0;
                }
                .footer {
                    text-align: center;
                    font-weight: bold;
                }
                .footer p,
                .footer a {
                    font-size: 14px;
                }

                .eye-toggle {
                    width: 24px;
                    height: 24px;
                    padding: 8px;
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
        this.loginGlyph = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQkAAAA4CAYAAADuOQ3YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGAGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMDctMTdUMTE6Mzk6NDIrMDE6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTktMDctMTdUMTE6Mzk6NDIrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTA3LTE3VDExOjM5OjQyKzAxOjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmQ5YmZlMmEyLWZkZDUtNDE3Ny05NjQxLWM1MTg1ODJiNzUyMyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjJmOGZiOGNlLWQyZGEtZGE0YS04YTU1LWQzODYzYjBhN2IwMiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmVhOWRmNGFhLWZkNTktNDI1NC04YjdmLWNmZDljMGJmMzNkYiIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZWE5ZGY0YWEtZmQ1OS00MjU0LThiN2YtY2ZkOWMwYmYzM2RiIiBzdEV2dDp3aGVuPSIyMDE5LTA3LTE3VDExOjM5OjQyKzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDliZmUyYTItZmRkNS00MTc3LTk2NDEtYzUxODU4MmI3NTIzIiBzdEV2dDp3aGVuPSIyMDE5LTA3LTE3VDExOjM5OjQyKzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7mJfEPAAAIkklEQVR42u2de4xVxR3HP8Mu7LISKlbQpFYEUh+NUDAGRAsqQdFqxbSxpmmoxBpl1qRKwBpqU2wV3RCjaf9wTFtKQ0NTUaOWlkpKKy1CfURRVFTUrosPisq6aJbH4jL948x255x7zy6PO+eeu+f3STY58zt77rn3d2a+Z+Y3L2WtJQjN6iVgQpkzG5RhOlXEahYD8z3TLmCWMryFUHis5ipgVZlTe5WhqcrfrQWYV+ZUC/fblhD3HBTw9zQcpj1LWoDX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')`;
    }

    render() {
        return html`
         ${templateContent(button)}
        <div>
            <div class="header"
                style="background-image:${this.loginGlyph}">
                <h3>Login to your account</h3>
                ${this.renderClose()}
            </div>
            <form @submit=${this._submit}>
                <div class="input-wrapper">
                <label for="username">${_('USERNAME', 'Username')}</label>
                    <input type="text" id="username" placeholder=${_('YOUR_KANO_USERNAME', 'Enter your Kano username')} ?disabled=${this.disabled} />
                    <label for="password">${_('PASSWORD', 'Password')}</label>
                    <div class="input-wrapper">
                        <input type="password" id="password" placeholder=${_('YOUR_SUPER_SECRET_PASSWORD', 'Enter your secret password')} ?disabled=${this.disabled} />
                        <img src=${icons.eye} class="eye-toggle" id="eyeimage" style="opacity: ${this.showPassword ? '0.5' : '1'}" @click=${() => this.togglePassword()} />
                    </div>
                </div>
                <div class="button-wrapper">
                    <button class="btn l" type="submit" ?disabled=${this.disabled}>${_('LOGIN', 'Login')}</button>
                    <div class="error-message">${this.error}</div>
                </div>
                <div class="breaker"></div>
                <div class="footer">
                    <p class="color-grey">${_('FORGOT_YOUR', 'Forgot your')} 
                        <a @click=${(e: Event) => this._changeView(e, 'forgot-username')} href="">${_('USERNAME_LOWERCASE', 'username')}</a> ${_('OR', 'or')} 
                        <a @click=${(e: Event) => this._changeView(e, 'forgot-password')} href="">${_('PASSWORD_LOWERCASE', 'password')}</a>${_('QUESTION_MARK', '?')}
                    </p>
                    <p class="color-grey">${_('NO_ACCOUNT', 'No account?')} 
                        <a @click=${(e: Event) => this._changeView(e, 'username')} href="">${_('SIGN_UP', 'Sign up')}</a>!
                    </p>
                </div> 
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