// Outstanding:
// * Routing
// * Check Username availability

import { LitElement, html, css, customElement, property } from 'lit-element/lit-element.js';
import { button } from '@kano/styles/button.js';

import { Actions, Form } from './actions.js';

import { Link, View } from './view-type.js'
import { templateContent } from './utils/template-content.js';
import './kwc-auth.js';

export interface HeaderDetails {
    text: string;
    image: string;
}

@customElement('kwc-auth-example')
export class AuthView extends LitElement {
    
    @property ({type: Object})
    public view : View = { id: '' };
    
    @property ({type: Map})
    public views: Map<string, View> = new Map<string, View>();
    
    @property ({type: String})
    public headerText : string = '';

    @property ({type: Object})
    public actions : any;


    constructor() {
        super();
        this.actions = Actions();

        const backText = 'Back';
        this.headerText = 'Create a Kano account';
        const viewsArr = [
            {
                id: 'landing',
            },
            {
                id: 'play',
            },
            {
                id: 'username',
                backButton: {
                    text: backText,
                    link: '/landing',
                },
            },
            {
                id: 'password',
                backButton: {
                    text: backText,
                    link: 'username',
                },
            },
            {
                id: 'forgotUsername',
                backButton: {
                    text: backText,
                    link: 'login',
                },
            },
            {
                id: 'forgotPassword',
                backButton: {
                    text: backText,
                    link: 'login',
                },
            },
            {
                id: 'forgotEmail',
                backButton: {
                    text: backText,
                    link: '/',
                },
            },
            {
                id: 'email',
                backButton: {
                    text: backText,
                    link: 'password',
                },
            },
            {
                id: 'login',
                backButton: {
                    text: backText,
                    link: 'landing',
                },
            },
            {
                id: 'success',
            },
        ]
        this.views = new Map<string, View>();
        viewsArr.forEach(el => {
            this.views.set(el.id, el);
        });
        this.view = this.views.get('landing') || viewsArr[0];
    }

    static get styles() {
        return [
            css`
            :host {
                min-height: 100vh;
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
                margin-bottom: 20px;
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
            .landing-template {
                max-width: 100%;
                min-height: calc(100vh - 66px);
                background-color: #2C3D4E;
            }
            .landing-template img {
                max-width: 100%;
            }
            .button-wrapper {
                text-align: center;
            }
        `,
        ];
    }
    headerTemplate() {
        const { id } = this.view;
        const headerDetails : HeaderDetails = {
            text: 'Create a Kano account',
            image: '../assets/profile_icon.png',
        }
        
        const emptyHeader : HeaderDetails = {
            text: '',
            image: '',
        }

        let header = html``;
        switch(id) {
            case 'username':
            case 'password':
            case 'email':
                header = this.headerContentTemplate(headerDetails);
                break;
            case 'landing':
            case 'success':
                header = this.headerContentTemplate(emptyHeader);
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
                <a href=${button.link}>${button.text}</a>
            </div>
        `;
    }
    headerContentTemplate(details : HeaderDetails) {
        return html`
            <div class="header-content">
                ${details.image? html`<img src=${details.image}>`: html``}
                ${details.text? html`<h3>${details.text}</h3>`: html``}
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

    landingTemplate() {
        return html`
                ${templateContent(button)}
                <div class="landing-template">
                    <div class="button-wrapper">
                        <button @click=${() => this.handleClick('username')} class="btn l">Let's get Started</button>
                        <button @click=${() => this.handleClick('login')} class="btn l">I already have an account</button>
                    </div>
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
        this.view = this.views.get(id) || { id: 'landing'};
    }
    renderTemplate() {
        const footerLinks: Link[] = [
            {
                text: 'Privacy Policy',
                link: '/',
            },
        ];
        switch(this.view.id) {
            case 'landing':
                return html`
                    ${this.headerTemplate()}
                    ${this.landingTemplate()}
                `;
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
                            @login=${this.handleLogin}
                            @register=${this.handleRegister}
                            @forgotPassword=${this.handleForgotPassword}
                            @forgotUsername=${this.handleForgotUsername}
                            @forgotEmail=${this.handleForgotEmail}
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
    validateForm(form: Form) {
        return form && form.username && form.password && form.email;
    }

    handleLogin() {
        this.actions.login()
            .then(() => this.changeTemplate('play'));
    }
    handleRegister(e: CustomEvent) {
        this.actions.register(e.detail.form)
            .then(() => this.changeTemplate('play'));
    }
    handleForgotPassword() {
        this.actions.forgotPassword()
            .then(() => this.changeTemplate('login'));
    }
    handleForgotUsername() {
        this.actions.forgotUsername()
            .then(() => this.changeTemplate('login'));
    }
    handleForgotEmail() {
        this.actions.forgotEmail()
            .then(() => this.changeTemplate('play'));
    }
}

export default AuthView;
