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
                return getter('#signup input[type="text"]');
            },
            get password() {
                return getter('#signup input[type="password"]');
            },
            get form() {
                return getter('#signup .fields');
            },
        };
    }
    get parents() {
        const getter = this._get.bind(this);
        return {
            get firstName() {
                return getter('#signup-parents input[type="text"]');
            },
            get email() {
                return getter('#signup-parents input[type="email"]');
            },
            get form() {
                return getter('#signup-parents .fields');
            },
            get conditions() {
                return getter('#signup-parents #signup-terms');
            },
        };
    }
    get forgot() {
        const getter = this._get.bind(this);
        return {
            get email() {
                return getter('#username-reminder input[type="text"]');
            },
            get form() {
                return getter('#username-reminder form');
            },
        };
    }
    get reset() {
        const getter = this._get.bind(this);
        return {
            get username() {
                return getter('#password-reset input[type="text"]');
            },
            get form() {
                return getter('#password-reset form');
            },
        };
    }
    get done() {
        const getter = this._get.bind(this);
        return {
            get form() {
                return getter('#done form');
            },
        };
    }
    type(input, text) {
        this.setInputValue(input, 'value', text);
    }
    check(input, value) {
        this.setInputValue(input, 'checked', value);
    }
    setInputValue(input, prop, value) {
        input[prop] = value;
        input.dispatchEvent(new CustomEvent('input'));
        input.dispatchEvent(new CustomEvent('change'));
    }
}

export default AuthTestUtil;
