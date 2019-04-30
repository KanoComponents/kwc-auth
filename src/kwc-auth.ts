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

import { LitElement, html, property, customElement, css } from 'lit-element/lit-element.js';

import './components/kwc-auth-landing.js';
import './components/kwc-auth-username.js';
import './components/kwc-auth-password.js';
import './components/kwc-auth-email.js';
import './components/kwc-auth-forgot-username.js';
import './components/kwc-auth-forgot-email.js';
import './components/kwc-auth-forgot-password.js';
import './components/kwc-auth-successful-signup.js';
import './components/kwc-auth-login.js';
import { styles } from './styles.js';

interface Form {
    username: string;
    password: string;
    email: string;
}

@customElement('kwc-auth')
export class KwcAuth extends LitElement {

    @property({ type: String }) view = '';
    @property({ type: String }) logo = 'kano';
    @property({ type: String }) backgroundGliph = 'shapesGliph';
    @property({ type: String }) loginGliph: string;
    @property({ type: Object }) form: Form = {
        username: '',
        password: '',
        email: '',
    };

    static get styles() {
        return [
            styles,
            css`
                kwc-auth-login {
                    background-color: white;
                    border-radius: 6px;
                    width: 100%;
                    margin: 0 auto;
                }
                kwc-auth-password,
                kwc-auth-username,
                kwc-auth-successful-signup,
                kwc-auth-email {
                    width: 100%;
                    max-width: 600px;
                }
            `,
        ];
    }

    constructor() {
        super();
        this.loginGliph = '';
    }

    // Return template of the current form
    formTemplate(view: string) {
        switch (view) {
            case 'username':            
                return html`
                    <kwc-auth-username
                        @submit=${this.handleUsernameSubmit}
                    ></kwc-auth-username>
            `; 
            case 'password':            
                return html`
                    <kwc-auth-password
                        @submit=${this.handlePasswordSubmit}
                    ></kwc-auth-password>
            `; 
            case 'email':
                return html`
                    <kwc-auth-email
                        @submit=${this.handleRegister}
                    ></kwc-auth-email>
            `; 
            case 'forgotEmail':
                return html`
                    <kwc-auth-forgot-email
                        @submit=${this.handleForgotEmail}
                    ></kwc-auth-forgot-email>                                                              
                    `; 
            case 'forgotPassword':
                return html`
                    <kwc-auth-forgot-password
                        @submit=${this.handleForgotPassword}
                    ></kwc-auth-forgot-password>                                                              
                    `; 
            case 'forgotUsername':
                return html`
                    <kwc-auth-forgot-username
                        @submit=${this.handleForgotUsername}
                    ></kwc-auth-forgot-username>                                                              
                    `; 
            case 'success':
                return html`
                    <kwc-auth-successful-signup
                        @submit=${this.handleSubmit}
                    ></kwc-auth-successful-signup>                                                              
                    `;
            default:
                return html`
                    <kwc-auth-login
                        .logo=${this.logo}
                        @submit=${this.handleLogin}
                        @changeView=${this.changeView}
                        loginGliph=${this.loginGliph}>
                    </kwc-auth-login>
                `;
        }
    }

    changeView(e: CustomEvent) {
        this.submit(e.detail.view);
    }
    handleSubmit(e: CustomEvent) {
        this.submit(e.detail.next);
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
        this.handleSubmit(e);
    }
    handlePasswordSubmit(e: CustomEvent) {
        this.form.password = e.detail.payload.password;
        this.handleSubmit(e);
    }
    handleRegister(e: CustomEvent) {
        this.form.email = e.detail.payload.email;
        this.dispatchEvent(new CustomEvent('register', {
            detail: {
                form: this.form,
            },
        }));
    }
    handleLogin(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('login', {
            detail: e.detail,
        }));
    }
    handleForgotPassword(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('forgotPassword', {
            detail: e.detail,

        }));
    }
    handleForgotUsername(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('forgotUsername', {
            detail: e.detail,
        }));
    }
    handleForgotEmail(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('forgotEmail', {
            detail: e.detail,
        }));
    }
}