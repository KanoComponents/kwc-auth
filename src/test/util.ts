
export class AuthTestUtil {
    public el: any;
    constructor(el: any) {
        this.el = el;
    }
    
    _get(selector: string) {
        // console.log(this.el.querySelector(selector));
        return this.el.querySelector(selector);
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
                console.log(getter('input#email'));
                // console.log(getter('#kwc-auth-kidparentsemail input[type="email"]'));
                
                return getter('input#email');
            },
            get form() {
                console.log(getter('form'));
                
                return getter('form');
            },
        };
    }
    
    
    type(input: HTMLInputElement, text: string) {
        // console.log(input, text);
        
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
