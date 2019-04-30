// Sample set of actions for authentication. These are the necessary actions in order to make the Auth flow functional in your app.
interface Form {
    email: string;
    username: string;
    password: string;
    newsletter: Boolean;
}

const Actions = () => {
    const user = {
        id: 'sampleId',
    };

    return {
        login(username: string, password: string) {
            console.log(username, password);
            return new Promise((resolve) => resolve());
        },
        register(form: Form) {
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
    };
};

export { Actions, Form };

export default Actions;
