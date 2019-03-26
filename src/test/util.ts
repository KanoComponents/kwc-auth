export class AuthTestUtil {
    public el: any;
    constructor(el: any) {
        this.el = el;
    }
    _get(selector: string) {
        return this.el.root.querySelector(selector);
    }

    get kidsignup() {
        const getter = this._get.bind(this);
        return {
            get username() {
                return getter('#kidsignup input[type="text"]');
            },
            get password() {
                return getter('#kidsignup input[type="password"]');
            },
            get form() {
                return getter('#kidsignup .fields');
            },
        };
    }

    get kidparentsemail() {
        const getter = this._get.bind(this);
        return {
            get email() {
                return getter('#kidsignup input[type="email"]');
            },
            get form() {
                return getter('#kidsignup .fields');
            },
        };
    }
    
    type(input: HTMLInputElement, text: string) {
        this.setInputValue(input, 'value', text);
    }
    check(input: HTMLInputElement, value: string) {
        this.setInputValue(input, 'checked', value);
    }
    setInputValue(input: HTMLInputElement, prop: string, value: string) {
        input.setAttribute(prop, value);
        input.dispatchEvent(new CustomEvent('input'));
        input.dispatchEvent(new CustomEvent('change'));
    }
}

export default AuthTestUtil;
