
export class AuthTestUtil {
    public el: any;
    constructor(el: any) {
        this.el = el;
    }
    
    _get(selector: string) {
        return this.el.querySelector(selector);
    }

    get password() {
        const getter = this._get.bind(this);
        return {
            get password() {
                return getter('input#input');
            },
            get button() {
                return getter('button#submit');
            },
        }
    }

    get username() {
        const getter = this._get.bind(this);
        return {
            get username() {
                return getter('input#input');
            },
            get button() {
                return getter('button#submit');
            },
        }
    }

    get email() {
        const getter = this._get.bind(this);        
        return {
            get email() {
                return getter('input#input');
            },
            get button() {
                return getter('button#submit');
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
