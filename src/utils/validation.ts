import { IError } from '../error.js';

export class Validation {
    public errors: IError;

    constructor(errors: IError) {
        this.errors = errors;
    }
    validateUsername(username: string) {
        if (!username || username.length === 0) {
            this.errors.username = 'Username is required.';
            return false;
        }

        if (username.length < 3) {
            this.errors.username = 'Must be at least 3 characters long.';
            return false;
        }

        if (!/^[a-zA-Z0-9_\-.]+$/.test(username)) {
            this.errors.username = 'Only letters, numbers, dashes, underscores and dots are allowed.';
            return false;
        }

        this.errors.username = '';
        return true;
    }
    validatePassword(password: string) {
        if (!password || password.length === 0) {
            this.errors.password = 'Password cannot be empty.';
            return false;
        }
        const trimmedPassword = password.trim();

        if (trimmedPassword.includes(' ')) {
            this.errors.password = 'Password cannot contain spaces.';
            return false;
        }

        if (trimmedPassword.length < 6) {
            this.errors.password = 'Password must be at least 6 characters long.';
            return false;
        }

        this.errors.password = '';
        return true;
    }
    validateEmail(email: string) {
        const emailRegex = /^[_a-z0-9-\+]+(\.[_a-z0-9-\+]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]+)$/i;

        if (!emailRegex.test(email)) {
            this.errors.email = 'Please enter a valid email address.';
            return false;
        }

        this.errors.email = '';
        return true;
    }
    /**
     * Set relevant error if the terms have not been agreed to.
     * @param terms
     */
    validateTerms(terms: boolean) {
        if (terms) {
            this.errors.terms = '';
        } else {
            this.errors.terms = 'Please agree to the terms and conditions';
        }
        return terms;
    }
}
