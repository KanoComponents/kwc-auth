
export class AuthTestUtil {
    public el: any;
    constructor(el: any) {
        this.el = el;
    }
    
    _get(selector: string) {
        return this.el.querySelector(selector);
    }

    get createpassword() {
        const getter = this._get.bind(this);
        return {
            get password() {
                return getter('input#password');
            },
            get form() {
                return getter('form');
            },
        }
    }

    get createusername() {
        const getter = this._get.bind(this);
        return {
            get username() {
                return getter('input#username');
            },
            get form() {
                return getter('form');
            },
        }
    }

    get kidsignup() {
        const getter = this._get.bind(this);
        return {
            get username() {
                return getter('input#username');
            },
            get password() {
                return getter('input#password');
            },
            get form() {
                return getter('form');
            },
        };
    }

    get kidparentsemail() {
        const getter = this._get.bind(this);        
        return {
            get email() {
                return getter('input#email');
            },
            get form() {
                return getter('form');
            },
        };
    }
    
    
    type(input: HTMLInputElement, text: string) {        
        this.setInputValue(input, 'value', text);
    }
    check(input: HTMLInputElement, value: string) {
        this.setInputValue(input, 'checked', value);
    }

    blur(input: HTMLInputElement) {
        input.dispatchEvent(new CustomEvent('blur'));
    }

    setInputValue(input: HTMLInputElement, prop: string, value: string) {
        input.setAttribute(prop, value);
        input.dispatchEvent(new CustomEvent('keyup'));
        input.dispatchEvent(new CustomEvent('input'));
        input.dispatchEvent(new CustomEvent('change'));
    }
}

export default AuthTestUtil;
