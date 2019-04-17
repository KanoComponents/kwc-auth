import { LitElement, html, css, customElement, property } from 'lit-element/lit-element.js';
import { button } from '@kano/styles/button.js';

import { Link, View } from './view-type.js'
import { templateContent } from './utils/template-content.js';
import './kwc-auth.js';

interface HeaderDetails {
    text: string;
    image: string;
}

@customElement('kwc-auth-example')
class AuthView extends LitElement {
    
    @property ({type: Object})
    public view : View = { id: '' };
    
    @property ({type: Map})
    public views: Map<string, View> = new Map<string, View>();
    
    @property ({type: String})
    public headerText : string = '';


    constructor() {
        super();
        const backText = 'Back';
        this.headerText = 'Create a Kano account';
        const viewsArr = [
            {
                id: 'landing',
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
                id: 'enterEmail',
                backButton: {
                    text: backText,
                    link: 'password',
                },
            },
        ]
        this.views = new Map<string, View>();
        viewsArr.forEach(el => {
            this.views.set(el.id, el);
        });
        this.view = this.views.get('username') || viewsArr[0];
    }

    static get styles() {
        return css`
            :host {
                min-height: 100vh;
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
                padding-left: 30px;
            }
            header h3,
            header img {
                display: inline-block;
                color: white;
                margin: 0;
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
                background-image: '../assets/header_splash.png';
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
            }
            .landing-template {
                max-width: 100%;
            }
            .landing-template img {
                max-width: 100%;
            }
            /* .fullscreen-page,
            .login-page {
                display: flex;
                width: 100vw;
                min-height: 100vh;
            }
            .login-page {
                flex-direction: column;
                justify-content: center;
                background-color: #2C3D4E;
            }
            .fullscreen-page {
                justify-content: row;
                background-color: #FFFFFF;
            } */
        `;
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
            return
        }
        const link = this.view.backButton;
        return html`
            <div class="back-button">
                <a href=${link.link}>${link.text}</a>
            </div>
        `;
    }
    headerContentTemplate(content : HeaderDetails) {
        const image = content.image.length > 0 ? html`<img src=${content.image}>` : html``;
        const text = content.text.length > 0 ? html`<h3>${content.text}</h3>` : html``;
        return html`
            <div class="header-content">
                ${image}
                ${text}
            </div>    
        `;
    }
    footerTemplate(links : Link[]) {
        links.map(el => {
            return html`
            <footer>
                <a href=${el.link}>${el.text}</a>
            </footer>
            `;
        })
    }

    landingTemplate() {
        return html`
                ${templateContent(button)}
                <div class="landing-template">
                    <div class="image">
                        <img src="../assets/landing_placeholder.jpg" />
                    </div>
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
        if (this.view.id === 'landing') {
            return html`
                ${this.headerTemplate()}
                ${this.landingTemplate()}
            `;
        }
        return html`
            ${this.backButtonTemplate()}
            ${this.headerTemplate()}
            <kwc-auth 
                .view='${this.view.id}'
                @changeView=${this.handleChangeView}
            ></kwc-auth>
            ${this.footerTemplate(footerLinks)}
        `;
    }

    render() {
        return this.renderTemplate();
    }
}

export default AuthView;
