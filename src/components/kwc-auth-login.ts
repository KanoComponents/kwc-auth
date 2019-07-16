import '@kano/styles/typography.js';
import { button } from '@kano/styles/button.js';
import { LitElement, css, customElement, html, query, property } from 'lit-element/lit-element.js';
import { templateContent } from '../utils/template-content.js';
import { styles } from '../styles.js';
import { _ } from '@kano/i18n/dist/index.js';

@customElement('kwc-auth-login')
export class Login extends LitElement {
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
                    background-color: #FF6900;
                    min-height: 60px;
                    border-radius: 6px 6px 0 0;
                    padding: 20px;
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
        this.loginGlyph = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO4AAACICAMAAADXnSdXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzRFRkFERUY1ODU4MTFFOTgwNTE4QjA1NjYxRTQzODQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzRFRkFERjA1ODU4MTFFOTgwNTE4QjA1NjYxRTQzODQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNEVGQURFRDU4NTgxMUU5ODA1MThCMDU2NjFFNDM4NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNEVGQURFRTU4NTgxMUU5ODA1MThCMDU2NjFFNDM4NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrMSUOMAAABgUExURQH8AT1Ns/VBLAC71b3M1I8nkZacoOweedu2Dg+Qppwasf/aAP1VB1g2ctJAMkKhoQ7EGLNNMpx9XM5mCqu6w//BAOVsAGowsHmMhKHTttFTIcckce9aJL1wR3RzNAAAAOwcJ1YAAAAgdFJOU/////////////////////////////////////////8AXFwb7QAABSVJREFUeNrs3et2ojAQAOCwgrYoSqtC66Xz/m+5gAhBEnKdmKDzo1vFcvicDJnE9iyBOca/NkYHyEtp58JdVyGhnQf3Y72mvBPaWXBb7Zqjrb7fzoh71968LG3/iMxIuxZqw+cqaYPnUtr1n1AbOneg/RJqA+fSWsjE2hC4URTJaLvCndAGwI243ActiLX+czMu91ELYq333CjicUfaRjit9Z2rpKVjG+KKSFsLIa6ImNpmdhVpa29oK6KMpa1H6UWs5QQJLLdbudyGx8XQ+svlay/6Wm+5fC3NVb4bkOC0FFf1rElKgtP2tauu9ZM7rQU4amkh9ZPL7qWGq9m1xnn95HI6x4ndY2luSULRgrHWy4mIuyqwofWOm0X83QsLQV5K6xk3Qtb6xUXXesXF1/rEdaD1iOtC6w/XiRaNW1bhnxaLW2vLyDstEreyZirpdaVF5EbyXGdaPG41ltW44JqbVDH8Rv8+q6IFXS0x5iZZ+695fpVuVDrYKoy5SZbY4LIj17jCKS3hHpPmJnhcQuxxJ8/FPTR4OvNcS/204Fysg4c4jofP4mtzs0ogsu/c+HCtfeDevRkW11Sby9RtzvI22iUru2ec9LrR1i9keG/aYe3i3qmM6janiIKRzPI22vjxznxGTa8bLct708asiQgQ510z7e3qp2egnC6b+wtbbfwz5oKdrgpFW1/9dG77t4Ty3rVxfHis3W7+9W8kEwotMY47b68dTUQOYyH7wr87MRdqWd7f+Pncz0Udqs0YkejLyMN4brQHsM0t9sraEfdyucLpcuG2nlJdaD7wNiN5Vz20zS2UtQxuE+PuJEkVem7a23YXcPfa46prR9xTo/16vPpKm6YKK4ze+9trD1a5CsnttOPaZSQX0jKtI1NYT91f2dZtn1xbe1VF8WdBe2VkN21DafOCqttlrz3Y2JrbF3XYyC2rdjutWs9dvzcMrTlXhSrWXnfXAfeuLVUvK6frtuEewAK3UJqAJrWfu+vPYrH7Po21Gj0eXbfNuAYrXHva8SED7WGgZe9V4c4/2tpS47rYWqdch1qg6tYiV6eXcqGFtlafx1XUgn7dTk1QhnMumhYwtGbcvXxylbVgMJIRuE0vtcfTAkJutbmFWjOlocUJgn2H8kr7T5MbqFaPq5hcX7RbEXe1ssl9srb+BXA9rjXt7tudVshdWeHCRG73m50zrbB2OdxCh8t+flNzwVlsp7hnJnevqp14F743G5fa6Xl3xeAq9heT3F2l/dPXtltYtrgrXunaiU0dVzOtspdMYVdfuNjLzmAkp2mW2OCuujgjak+mp6i4mTn33GsxB7L5uLEymPGpN66Fk1i4VTmgNlx4Uoy5Z3gZrpvc+sSVLJvnl67y8qD+c1gZ7rIO6nGic5Og4mI+C2lwv7Zy3OXyB2huojUFDBoM8IXLTG795WG+0+XW2BOAL4MZRNktzbhPDiJxp6JrNw1aK8WlhnIStnbAPQvnodC1NPcsbDLS0LUUd/UC2htXbsmXhK8dckEquTAPLsxfq/AJIMqn6f5yIfzcqn2+G3xuZ/qffLy5Iu5i4fbTm6dyP2eJ5XLnieVx56r1jftxbOLDMfdJ2mMXr8A9HrG93nILd1xW6Sb4DfPxiJ5ewtR+jp4r01lym18K4miTuXF5nWPiZKnrmsvKa6ctYX5c5msyRwt751z+NoaThb3beXfB57rZxthjT7tSy3t3W1SdF6tp9m034wOzY35v3ry5b+6b++a+uW+uy/gvwADV5F1L0+QslwAAAABJRU5ErkJggg==')`;
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
                        <img src="https://imgplaceholder.com/42x32/transparent/757575/fa-eye-slash" class="eye-toggle" id="eyeimage" @click=${this.togglePassword} />
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
        let img1 = "https://imgplaceholder.com/42x32/transparent/757575/fa-eye";
        let img2 = "https://imgplaceholder.com/42x32/transparent/757575/fa-eye-slash";
        
        if (!this.passwordInput || !this.imageInput ){
            return
        }        
        if (this.passwordInput.type == 'password') {
            this.passwordInput.type = 'text';
            this.imageInput.src = img1;
        } else {
            this.passwordInput.type = 'password';
            this.imageInput.src = img2;
        }
    }
    
}