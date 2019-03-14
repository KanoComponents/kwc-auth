export class AuthTestUtil {
    public el: any;
    constructor(el: any) {
        this.el = el;
    }
    _get(selector: string) {
        return this.el.root.querySelector(selector);
    }

    // --- Example from old util ---

    // get login() {
    //     const getter = this._get.bind(this);
    //     return {
    //         get username() {
    //             return getter('#login input');
    //         },
    //         get password() {
    //             return getter('#login input[type="password"]');
    //         },
    //         get form() {
    //             return getter('#login .fields');
    //         },
    //     };
    // }
    
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
