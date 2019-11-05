import { LitElement, html, css, customElement, property, query } from 'lit-element/lit-element.js';
import { IForm, IActions } from './actions.js';
import { View } from './view-type.js';
import './kwc-auth.js';
import { KwcAuth } from './kwc-auth.js';
import { SingleInputElement } from './components/auth-single-form.js';
import { Login } from './components/kwc-auth-login.js';
import { _ } from '@kano/i18n/dist/index.js';

export interface HeaderDetails {
    text: string;
    image: string;
}

interface IBackButton {
    text: string;
    link: string;
}

export interface IViewDefinition {
    id : string;
    backButton? : IBackButton;
}

const headerImage = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQkAAAA4CAYAAADuOQ3YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGAGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMDctMTdUMTE6Mzk6NDIrMDE6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTktMDctMTdUMTE6Mzk6NDIrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTA3LTE3VDExOjM5OjQyKzAxOjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmQ5YmZlMmEyLWZkZDUtNDE3Ny05NjQxLWM1MTg1ODJiNzUyMyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjJmOGZiOGNlLWQyZGEtZGE0YS04YTU1LWQzODYzYjBhN2IwMiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmVhOWRmNGFhLWZkNTktNDI1NC04YjdmLWNmZDljMGJmMzNkYiIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZWE5ZGY0YWEtZmQ1OS00MjU0LThiN2YtY2ZkOWMwYmYzM2RiIiBzdEV2dDp3aGVuPSIyMDE5LTA3LTE3VDExOjM5OjQyKzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDliZmUyYTItZmRkNS00MTc3LTk2NDEtYzUxODU4MmI3NTIzIiBzdEV2dDp3aGVuPSIyMDE5LTA3LTE3VDExOjM5OjQyKzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7mJfEPAAAIkklEQVR42u2de4xVxR3HP8Mu7LISKlbQpFYEUh+NUDAGRAsqQdFqxbSxpmmoxBpl1qRKwBpqU2wV3RCjaf9wTFtKQ0NTUaOWlkpKKy1CfURRVFTUrosPisq6aJbH4jL948x255x7zy6PO+eeu+f3STY58zt77rn3d2a+Z+Y3L2WtJQjN6iVgQpkzG5RhOlXEahYD8z3TLmCWMryFUHis5ipgVZlTe5WhqcrfrQWYV+ZUC/fblhD3HBTw9zQcpj1LWoDX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')`;

@customElement('kwc-auth-example')
export class AuthView extends LitElement {
    
    @property ({type: Object})
    public view : View = { id: '' };
    
    public views : Map<string, View> = new Map<string, View>();
    
    @property ({type: String})
    public headerText : string = '';

    @property ({type: Boolean})
    public allowExit : boolean = false;

    public actions? : IActions;

    set flowDefinition(value : IViewDefinition[]) {
        if (this.flowDefinition) {
            throw new Error('Cant define twice');
        }
        value.forEach(el => {
            this.views.set(el.id, el);
        });
        this.view = this.views.get('login') || value[0];
    }

    @query('kwc-auth') authElement? : KwcAuth;

    static get styles() {
        return [
            css`
            :host {
                display: block;
            }
            kwc-auth {
                height: 100%;
            }
            h1,
            h2,
            h3,
            h4,
            p,
            a,
            input {
                font-family: 'Bariol', sans-serif;
                line-height: 1em;
            }

            h2, h3 {
                color: #414a51;
                text-align: left;
            }
            h2 {
                font-size: 24px;
            }

            h3 {
                font-size: 20px;
            }

            p {
                font-size: 20px;
                margin: 0;
            }

            p.color-grey {
                color: #9FA4A8;
            }

            a {
                color: #FF6900;
                text-decoration: none;
            }

            button {
                font-family: var(--font-body);
                text-align: center;
                margin-top: 20px;
            }
            .play {
                width: 100%;
                height: 100%;
                background-color: #2C3D4E;
            }
            .page-content,
            .login-page {
                display: flex;
                flex-flow: column;
                width: 100%;
                margin: 0 auto;
                max-width: 420px;
                align-items: stretch;
                flex-grow: 1;
                justify-content: space-between;
            }
            .page-content {
                height: calc(100vh - 56px);
                padding-top: 32px;
                box-sizing: border-box;
            }
            .login-page {
                background-color: var(--color-black);
                max-width: 100%;
                height: 100vh;
            }
            .login-page__container {
                display: flex;
                flex-flow: column;
                align-items: stretch;
                justify-content: center;
                height: 100%;
            }
            .login-page__container kwc-auth {
                height: auto;
                width: 100%;
                max-width: 360px;
            }
            .login-page footer {
                max-width: 420px;
                align-self: center;
            }
            .back-button {
                position: absolute;
                top: 20px;
                left: 24px;
                z-index: 1;
            }
            .back-button a {
                color: #FFFFFF;
                font-weight: bold;
                text-decoration: none;
            }
            .back-button:hover a {
                color: #FFFFFF;
                text-decoration: underline;
            }
            header {
                position: relative;
                height: 56px;
                width: 100%;
                background-color: #D95000;
                display: flex;
                flex-direction: column;
                justify-content: center;
                overflow: hidden;
                background-repeat: no-repeat;
                background-position: 100% 0;
                background-size: contain;
            }
            .header-content {
                display: inline-block;
                position: relative;
                max-width: 420px;
                width: 420px;
                padding: 0 10px;
                margin: 0 auto;
                box-sizing: border-box;
            }
            header h3,
            header img {
                display: inline-block;
                color: white;
                margin: 0;
            }
            header img + h3 {
                padding-left: 30px;
            }
            header img {
                max-width: 20px;
                max-height: 20px;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            }
            footer {
                width: 100%;
                border-top: 1px solid #E9EBEC;
                text-align: center;
                max-height: 60px;
                align-self: flex-end;
                flex-grow: 0;
                margin-top: 18px;
                box-sizing: border-box;
            }
            footer a {
                display: inline-block;
                color: darkgray;
                text-decoration: none;
                padding: 14px 10px 20px;
                font-weight: bold;
            }
            footer a:hover {
                text-decoration: underline;
            }
            .button-wrapper {
                text-align: center;
            }

            @media (max-width: 600px) {
                header {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
                .login-page__container {
                    height: 100vh;
                    box-sizing: border-box;
                }
                .login-page__container kwc-auth {
                    height: inherit;
                    width: 100%;
                    max-width: none;
                }
                .login-page footer {
                    max-width: none;
                    align-self: center;
                }
                .header-content {
                    text-align: center;
                }
            }
        `,
        ];
    }
    headerTemplate() {
        const { id } = this.view;
        const privacyHeader = _('UPDATED_PRIVACY_SETTINGS', 'We\'ve updated our privacy settings');
        const signupHeader = _('CREATE_KANO_ACCOUNT', 'Create a Kano World account');


        let header = html``;
        switch(id) {
            case 'username':
                header = this.headerContentTemplate(signupHeader);
                break;
            case 'update-username':
                header = this.headerContentTemplate(privacyHeader);
                break;
            case 'password':
                header = this.headerContentTemplate(signupHeader);
                break;
            case 'email':
                header = this.headerContentTemplate(signupHeader);
                break;
            case 'update-email':
                header = this.headerContentTemplate(privacyHeader);
                break;
            case 'success':
                header = this.headerContentTemplate(_('THANKS_SIGN_UP', 'Thanks for signing up!'));
                break;
            default:
                break;
        }
        return html`
            <header id="header" style="background-image:${headerImage}" >
                ${header}
            </header>
        `;
    }
    backButtonTemplate() {
        if (typeof this.view.backButton === 'undefined') {
            return;
        }
        const button = this.view.backButton;
        return html`
            <div class="back-button">
                <a @click=${() => this.changeTemplate(button.link)} >
                    ${button.text}
                </a>
            </div>
        `;
    }
    headerContentTemplate(text? : string) {
        return html`
            <div class="header-content">
                <slot name="header-icon"></slot>
                <h3>${text}</h3>
            </div>    
        `;
    }

    handleClick(id: string) {
        this.changeTemplate(id);
    }
    handleChangeView(e: CustomEvent) {
        this.changeTemplate(e.detail.nextView);
    }
    changeTemplate(id: string) {
        this.view = this.views.get(id) || { id: 'login'};
        this.dispatchEvent(new CustomEvent('view-changed', { detail: this.view, bubbles: true, composed: true }));
    }
    renderTemplate() {
        switch(this.view.id) {
            case 'play':
                return html`
                    <div class="play"></div>
                `;
            case 'login':
                return html`
                    <div class="login-page">
                        <div class="login-page__container">
                            <kwc-auth
                            .view='${this.view.id}'
                            .allowExit=${this.allowExit}
                            @changeView=${this.handleChangeView}
                            @login=${this.handleLogin}
                            @exit=${this.handleExit}
                            ></kwc-auth>
                        </div>
                    </div>
                `;
            default:
                return html`
                    ${this.backButtonTemplate()}
                    ${this.headerTemplate()}
                    <div class="page-content page-content--${this.view.id}">
                        <kwc-auth 
                            .view='${this.view.id}'
                            .allowExit=${this.allowExit}
                            @changeView=${this.handleChangeView}
                            @submit-username=${this.handleSubmitUsername}
                            @submit-password=${this.handleSubmitPassword}
                            @login=${this.handleLogin}
                            @register=${this.handleRegister}
                            @update-username=${this.handleUpdateUsername}
                            @update-email=${this.handleUpdateEmail}
                            @forgot-password=${this.handleForgotPassword}
                            @forgot-username=${this.handleForgotUsername}
                            @forgot-email=${this.handleForgotEmail}
                            @finished-flow=${this.handleFinishedFlow}
                            @exit=${this.handleExit}
                        ></kwc-auth>
                    </div>
                `;
        }
    }

    render() {
        return this.renderTemplate();
    }
    validateForm(form: IForm) {
        return form && form.username && form.password && form.email;
    }
    getActions() {
        if (!this.actions) {
            throw new Error('Could not configure auth: actions id not defined');
        }
        return this.actions;
    }

    setLoading(state : boolean) {
        const el = this.authElement;
        if (!el) {
            return;
        }
        el.loading = state;
    }

    displayError(message : string, getter : (el : KwcAuth) => SingleInputElement|Login|undefined) {
        const auth = this.authElement;
        if (!auth) {
            return;
        }
        const el = getter(auth);
        if (!el) {
            return;
        }
        el.error = message || _('SOMETHING_WENT_WRONG', 'Something went wrong, please try again later');
    }

    wrapTask(task : () => Promise<any>) {
        this.setLoading(true);
        return task()
            .then((v : any) => {
                this.setLoading(false);
                return v;
            })
            .catch((e) => {
                this.setLoading(false);
                throw e;
            });
    }

    handleSubmitUsername(e : CustomEvent) {
        return this.wrapTask(() => {
            return this.getActions().checkUsernameAvailability(e.detail)
                .then(() => this.changeTemplate('password'))
                .catch((e) => this.displayError(e.message, (el) => el.username));
        });        
    }

    handleSubmitPassword() {
        return this.wrapTask(() => {
            return new Promise((resolve) => setTimeout(resolve, 500))
                .then(() => this.changeTemplate('email'))
        });        
    }

    handleLogin(e: CustomEvent) {
        // Reset error initially
        this.displayError(' ', (el) => el.login)
        return this.wrapTask(() => {
            return this.getActions().login(e.detail)
                .then((user) => {
                    if (user.attributes && user.attributes.username && user.attributes.username === 'invalid') {
                        this.changeTemplate('update-username');
                    } else if (user.attributes && user.attributes.email && (user.attributes.email === 'invalid' || user.attributes.email === 'removed')) {
                        this.changeTemplate('update-email');
                    } else {
                        this.changeTemplate('play');
                    }
                })
                .catch((e) => {
                    this.displayError(e.message, (el) => el.login);
                });
        });
    }
    handleRegister(e: CustomEvent) {
        return this.wrapTask(() => {
            return this.getActions().register(e.detail.form)
                .then(() => this.changeTemplate('success'))
                .catch((e) => {
                    // TODO: Handle error codes here
                    this.displayError(e.message, (el) => el.forgotPassword);
                });
        });
    }
    handleUpdateUsername(e: CustomEvent) {
        return this.wrapTask(() => {
            return this.getActions().updateUsername(e.detail)
                .then(() => this.changeTemplate('update-email'))
                .catch((e) => this.displayError(e.message, (el) => el.username));
        });
    }
    handleUpdateEmail(e: CustomEvent) {
        return this.wrapTask(() => {
            return this.getActions().updateEmail(e.detail)
                .then(() => this.changeTemplate('play'))
                .catch((e) => this.displayError(e.message, (el) => el.email));
        });
    }
    handleForgotPassword(e: CustomEvent) {
        return this.wrapTask(() => {
            return this.getActions().forgotPassword(e.detail)
                .then(() => this.changeTemplate('login'))
                .catch((e) => this.displayError(e.message, (el) => el.forgotPassword));
        });
    }
    handleForgotUsername(e: CustomEvent) {
        return this.wrapTask(() => {
            return this.getActions().forgotUsername(e.detail)
                .then(() => this.changeTemplate('login'))
                .catch((e) => this.displayError(e.message, (el) => el.forgotUsername));
        });
    }
    handleForgotEmail(e: CustomEvent) {
        this.getActions().forgotEmail(e.detail)
            .then(() => this.changeTemplate('play'));
    }
    handleFinishedFlow() {
        this.getActions().finish()
            .then(() => this.changeTemplate('play'));
    }
    handleResendEmail() {
        this.getActions().resendEmail('userId')
            .then(() => this.changeTemplate('play'));
    }
    handleExit() {
        this.getActions().exit();
    }
}

export default AuthView;
