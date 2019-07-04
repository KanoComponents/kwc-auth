// Outstanding:
// * Routing
// * Check Username availability

import { LitElement, html, css, customElement, property, query } from 'lit-element/lit-element.js';
import { IForm, IActions } from './actions.js';
import { Link, View } from './view-type.js';
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

@customElement('kwc-auth-example')
export class AuthView extends LitElement {
    
    @property ({type: Object})
    public view : View = { id: '' };
    
    public views : Map<string, View> = new Map<string, View>();
    
    @property ({type: String})
    public headerText : string = '';

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
                font-size: 18px;
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
                height: calc(100vh - 66px);
                padding-top: 32px;
                box-sizing: border-box;
            }
            .login-page {
                background-color: #2C3D4E;
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
                top: 30px;
                left: 30px;
                z-index: 1;
            }
            .back-button a {
                color: #FFFFFF;
                text-decoration: none;
            }
            .back-button:hover a {
                color: #FFFFFF;
                text-decoration: underline;
            }
            header {
                position: relative;
                height: 66px;
                width: 100%;
                background-color: #2C3D4E;
                display: flex;
                flex-direction: column;
                justify-content: center;
                overflow: hidden;
            }
            .header-content {
                display: inline-block;
                margin: 0 auto;
                position: relative;
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
            header:after {
                content: '';
                width: 300px;
                height: 100%;
                background-image: '../assets/header_splash.png';
                position: absolute;
                top: 50%;
                right: 0;
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
            }
            footer a:hover {
                text-decoration: underline;
            }
            .button-wrapper {
                text-align: center;
            }
        `,
        ];
    }
    headerTemplate() {
        const { id } = this.view;

        let header = html``;
        switch(id) {
            case 'username':
            case 'password':
            case 'email':
                header = this.headerContentTemplate(_('CREATE_KANO_ACCOUNT', 'Create a Kano account'));
                break;
            case 'success':
                header = this.headerContentTemplate();
                break;
            default:
                break;
        }
        return html`
            <header>
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
    footerTemplate(links : Link[]) {
        return html`
            <footer>
                ${links.map(el => {
                    return html`
                        <a href=${el.link}>${el.text}</a>
                    `;
                })}
            </footer>
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
    }
    renderTemplate() {
        const footerLinks: Link[] = [
            {
                text: _('PRIVACY_POLICY', 'Privacy Policy'),
                link: 'https://world.kano.me/privacy-policy',
            },
        ];
        switch(this.view.id) {
            case 'play':
                return html`
                    <h1>PLAY</h1>
                `;
            case 'login':
                return html`
                    <div class="login-page">
                        <div class="login-page__container">
                            <kwc-auth
                            .view='${this.view.id}'
                            @changeView=${this.handleChangeView}
                            @login=${this.handleLogin}
                            loginGlyph="../assets/header_splash.png"
                            ></kwc-auth>
                        </div>
                        ${this.footerTemplate(footerLinks)}
                    </div>
                `;
            default:
                return html`
                    ${this.backButtonTemplate()}
                    ${this.headerTemplate()}
                    <div class="page-content page-content--${this.view.id}">
                        <kwc-auth 
                            .view='${this.view.id}'
                            @changeView=${this.handleChangeView}
                            @submit-username=${this.handleSubmitUsername}
                            @login=${this.handleLogin}
                            @register=${this.handleRegister}
                            @forgot-password=${this.handleForgotPassword}
                            @forgot-username=${this.handleForgotUsername}
                            @forgot-email=${this.handleForgotEmail}
                            @finished-flow=${this.handleFinishedFlow}
                            loginGlyph="../assets/header_splash.png"
                        ></kwc-auth>
                        
                        ${this.footerTemplate(footerLinks)}
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
        el.error = message || _('SOMETHINF_WENT_WRONG', 'Something went wrong, please try again later');
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

    handleLogin(e: CustomEvent) {
        // Reset error initially
        this.displayError('', (el) => el.login)
        return this.wrapTask(() => {
            return this.getActions().login(e.detail)
                .then(() => this.changeTemplate('play'))
                .catch(() => this.displayError(_('USERNAME_OR_PASSWORD_INCORRECT', 'Username or password incorrect'), (el) => el.login));
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
}

export default AuthView;
