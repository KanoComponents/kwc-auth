/**
`<kwc-auth>` Front end for Kano's authentication flow.

Add this component somewhere in your html body and set some EventListeners
to interact with its many useful events.

```html
<kwc-auth></kwc-auth>
```

@demo demo/index.html
@demo demo/example.html
*/

import { LitElement, html, property, customElement, css, query } from 'lit-element/lit-element.js';

// TODO: figure out if this component is required
// import './components/kwc-auth-landing.js';
import './components/kwc-auth-username.js';
import './components/kwc-auth-password.js';
import './components/kwc-auth-email.js';
import './components/kwc-auth-forgot-username.js';
import './components/kwc-auth-forgot-email.js';
import './components/kwc-auth-forgot-password.js';
import './components/kwc-auth-successful-signup.js';
import './components/kwc-auth-login.js';
import { styles } from './styles.js';
import { UsernameInput } from './components/kwc-auth-username.js';
import { ForgotUsernameInput } from './components/kwc-auth-forgot-username.js';
import { EmailInput } from './components/kwc-auth-email.js';
import { ForgotPassword } from './components/kwc-auth-forgot-password.js';
import { Login } from './components/kwc-auth-login.js';

interface Form {
    username: string;
    password: string;
    email: string;
    region: 'row' | 'usa' | 'jpn' | 'eur' | '';
}

@customElement('kwc-auth')
export class KwcAuth extends LitElement {

    @property({ type: Boolean }) loading = false;
    @property({ type: Boolean }) hideLogin = true;
    @property({ type: String }) view = '';
    @property({ type: String }) logo = 'kano';
    @property({ type: String }) backgroundGlyph = 'shapesGlyph';
    @property({ type: Boolean }) allowExit = false;
    
    @property({ type: Object }) form: Form = {
        username: '',
        password: '',
        email: '',
        region: '',
    };

    static get styles() {
        return [
            styles,
            css`
                kwc-auth-login,
                kwc-auth-password,
                kwc-auth-username,
                kwc-auth-successful-signup,
                kwc-auth-forgot-password,
                kwc-auth-forgot-username,
                kwc-auth-email {
                    background-color: white;
                    border-radius: 9px;
                    width: 100%;
                    height: 100%;
                    margin: 0 auto;
                }

                @media (max-width: 600px) {
                    kwc-auth-login {
                        border-radius: 0;
                        height: 100vh;
                    }
                }
            `,
        ];
    }

    constructor() {
        super();

        this.handleLoginRequested = this.handleLoginRequested.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('login-requested', this.handleLoginRequested);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('login-requested', this.handleLoginRequested);
    }

    handleLoginRequested() {
        this.submit('login');
    }

    @query('kwc-auth-username') username? : UsernameInput;
    @query('kwc-auth-forgot-username') forgotUsername? : ForgotUsernameInput;
    @query('kwc-auth-email') email? : EmailInput;
    @query('kwc-auth-forgot-password') forgotPassword? : ForgotPassword;
    @query('kwc-auth-login') login? : Login;

    // Return template of the current form
    formTemplate(view: string) {
        switch (view) {
            case 'username':
                return html`
                    <kwc-auth-username
                        .disabled=${this.loading}
                        .allowExit=${this.allowExit}
                        @submit=${this.handleUsernameSubmit}
                        @exit=${this.handleExit}
                    ></kwc-auth-username>
            `;
            case 'update-username':
                return html`
                    <kwc-auth-username
                        .hideLogin=${this.hideLogin}
                        .disabled=${this.loading}
                        @submit=${this.handleUpdateUsername}
                    ></kwc-auth-username>
            `;
            case 'password':
                return html`
                    <kwc-auth-password
                        .username=${this.form.username}
                        .disabled=${this.loading}
                        @submit=${this.handlePasswordSubmit}
                    ></kwc-auth-password>
            `;
            case 'email':
                return html`
                    <kwc-auth-email
                        .disabled=${this.loading}
                        @submit=${this.handleRegister}
                    ></kwc-auth-email>
            `;
            case 'update-email':
                return html`
                    <kwc-auth-email
                        .hideLogin=${this.hideLogin}
                        .disabled=${this.loading}
                        @submit=${this.handleUpdateEmail}
                    ></kwc-auth-email>
            `;
            case 'forgot-email':
                return html`
                    <kwc-auth-forgot-email
                        .disabled=${this.loading}
                        @submit=${this.handleForgotEmail}
                    ></kwc-auth-forgot-email>                                                              
                    `; 
            case 'forgot-password':
                return html`
                    <kwc-auth-forgot-password
                        .disabled=${this.loading}
                        @submit=${this.handleForgotPassword}
                    ></kwc-auth-forgot-password>                                                              
                    `; 
            case 'forgot-username':
                return html`
                    <kwc-auth-forgot-username
                        .disabled=${this.loading}
                        @submit=${this.handleForgotUsername}
                    ></kwc-auth-forgot-username>                                                              
                    `; 
            case 'success':
                return html`
                    <kwc-auth-successful-signup
                        @submit=${this.handleFinishedFlow}
                        @resend-email=${this.handleResendEmail}
                    ></kwc-auth-successful-signup>                                                              
                    `;
            default:
                return html`
                    <kwc-auth-login
                        .disabled=${this.loading}
                        .logo=${this.logo}
                        @submit=${this.handleLogin}
                        @changeView=${this.changeView}
                    ></kwc-auth-login>
                `;
        }
    }

    changeView(e: CustomEvent) {
        this.submit(e.detail.view);
    }
    handleSubmit(e: CustomEvent) {
        this.submit(e.detail.next);
    }
    handleExit() {
        this.dispatchEvent(new CustomEvent('exit'));
    }

    render() {
        return this.formTemplate(this.view);
    }

    submit(view: string) {
        this.dispatchEvent(new CustomEvent('changeView', {
            detail: {
                nextView: view,
            }
        }));
    }
    handleUsernameSubmit(e: CustomEvent) {
        this.form.username = e.detail.payload.username;
        this.dispatchEvent(new CustomEvent('submit-username', {
            detail: e.detail.payload.username,
        }));
    }
    handlePasswordSubmit(e: CustomEvent) {
        this.form.password = e.detail.payload.password;
        this.dispatchEvent(new CustomEvent('submit-password'));
    }
    handleUpdateUsername(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('update-username', {
            detail: e.detail.payload.username,
        }));
    }
    handleRegister(e: CustomEvent) {
        this.form.email = e.detail.payload.email;
        this.form.region = e.detail.payload.region;
        this.dispatchEvent(new CustomEvent('register', {
            detail: {
                form: this.form,
            },
        }));
    }
    handleUpdateEmail(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('update-email', {
            detail: e.detail.payload.email,
        }));
    }
    handleLogin(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('login', {
            detail: e.detail,
        }));
    }
    handleForgotPassword(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('forgot-password', {
            detail: e.detail.payload['forgot-password'],
        }));
    }
    handleForgotUsername(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('forgot-username', {
            detail: e.detail.payload['forgot-username'],
        }));
    }
    handleForgotEmail(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('forgot-email', {
            detail: e.detail.payload['forgot-email'],
        }));
    }
    handleFinishedFlow() {
        this.dispatchEvent(new CustomEvent('finished-flow'));
    }
    handleResendEmail() {
        this.dispatchEvent(new Event('finished-flow'));
    }
}