export class AuthTestUtil {
    constructor(el) {
        this.el = el;
    }
    _get(selector) {
        return this.el.root.querySelector(selector);
    }
    get login() {
        const getter = this._get.bind(this);
        return {
            get username() {
                return getter('#login input');
            },
            get password() {
                return getter('#login input[type="password"]');
            },
            get form() {
                return getter('#login .fields');
            },
        };
    }
    get signup() {
        const getter = this._get.bind(this);
        return {
            get username() {
                return getter('#signup input');
            },
            get password() {
                return getter('#signup input[type="password"]');
            },
            get form() {
                return getter('#signup .fields');
            },
        };
    }
    type(input, text) {
        input.value = text;
        input.dispatchEvent(new CustomEvent('input'));
    }
}

export default AuthTestUtil;
