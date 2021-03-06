import { IActions, IForm, ILoginForm } from '../actions.js';

const user = {
    id: 'sampleId',
};

export const Actions: IActions = {
    login(form: ILoginForm) {
        console.log(form);
        return new Promise((resolve) => resolve());
    },
    register(form: IForm) {
        console.log(form);
        return new Promise((resolve) => resolve());
    },
    getAuthenticatedUser() {
        return new Promise((resolve) => resolve(user));
    },
    checkUsernameAvailability(username: string) {
        console.log(username);
        return new Promise((resolve) => resolve());
    },
    forgotPassword(username: string) {
        console.log(username);
        return new Promise((resolve) => resolve());
    },
    forgotUsername(email: string) {
        console.log(email);
        return new Promise((resolve) => resolve());
    },
    forgotEmail(email: string) {
        console.log(email);
        return new Promise((resolve) => resolve());
    },
    updateUsername(password: string) {
        console.log(password);
        return new Promise((resolve) => resolve());
    },
    updateEmail(email: string) {
        console.log(email);
        return new Promise((resolve) => resolve());
    },
    resendEmail(userId: string) {
        console.log(userId);
        return new Promise((resolve) => resolve());
    },
    finish() {
        console.log('finish');
        return Promise.resolve();
    },
    exit() {
        console.log('exit');
        return Promise.resolve();
    }
};

export default Actions;
